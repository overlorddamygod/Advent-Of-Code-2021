const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  console.log(`Part 1: ${versionNumber(data)}`);
  // console.log(`Part 2: ${eval(data)}`);
});

// Part 1
const versionNumber = (data) => {
  const binary = BinaryData.fromHex(data);

  return decodePackets(binary);
}

const decodePackets = (binary) => {
  let versionSum = 0;
  const decodePacket = (binary, decodeMore = true) => {
    console.log("-------")
    const packetVersion = binary.getNBitsDec(3);
    if (packetVersion) {
      versionSum += packetVersion;
    }
    const packetTypeId = binary.getNBitsDec(3);
    console.log(`Packet Version: ${packetVersion}`);
    console.log(`Packet Type Id: ${packetTypeId}`);
  
    if ( packetTypeId == 4 ) {
      // Literal Packet
      const literalVal = binary.getLiteralValues()
      console.log(`Literal Value Sum ${literalVal}`)
      if ( !decodeMore ) return
      decodePacket(binary)
    } else {
      // Operator Packet
      const lengthTypeId = binary.getNBitsDec(1);
      console.log(`Length Type Id: ${lengthTypeId}`);
      
      if ( lengthTypeId == 0 ) {
        const subPacketLength = binary.getNBitsDec(15);
        const bits = binary.getNBits(subPacketLength)
        console.log(`Sub packets length ${subPacketLength} bits ${bits}`);
        decodePacket(new BinaryData(bits));
        decodePacket(binary)
      } else if ( lengthTypeId == 1 )  {
        const subPacketNumber = binary.getNBitsDec(11);
        console.log(`Sub packets Number ${subPacketNumber}`);
        for ( let i = 0; i < subPacketNumber; i ++ ) {
          decodePacket(binary);
        }
      }
    }
  }
  decodePacket(binary);
  return versionSum;
}

// Reference: https://stackoverflow.com/questions/45053624/convert-hex-to-binary-in-javascript
const hex2bin = data => data.split('').map(i => 
  parseInt(i, 16).toString(2).padStart(4, '0')).join('');

const toDec = (data) => parseInt(data, 2);

class BinaryData {
  constructor(binary) {
    this.binary = binary;
    // console.log(this.binary)
    this.binaryArray = this.binary.split("");
  }

  getNBits(n = 1, skip = 0) {
    let bits = ''
    for ( let i = 0; i < n; i++ ) {
      const bit = this.binaryArray.shift()
      if ( i > skip - 1 ) {
        bits += bit;
      }
    }
    // console.log("BITS", bits)
    return bits;
  }

  getNBitsDec(n = 1, skip = 0) {
    return toDec(this.getNBits(n, skip));
  }

  getNBitsWithFirst(n = 1) {
    const firstBitAndOthers = [ this.binaryArray.shift() ];
    let bits = '';
    for ( let i = 1; i < n; i++ ) {
      const bit = this.binaryArray.shift()
      bits += bit;
    }
    firstBitAndOthers.push(bits);
    return firstBitAndOthers;
  }

  peek(index = 0) {
    return this.binaryArray[index];
  }

  static fromHex(data) {
    return new BinaryData(hex2bin(data));
  }

  getLiteralValues() {
    const literalVals = [];
    let [ first, value] = [0,0];

    do {
      [ first, value ] = this.getNBitsWithFirst(5)
      console.log(first, value)
      literalVals.push(value);
    } while(first == "1")

    return toDec(literalVals.join(""));
  }
}