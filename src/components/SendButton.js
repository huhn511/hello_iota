import React, { Component } from 'react';

class SendButton extends Component {

  constructor(props){
       super(props);
       console.log("iota from SendButton Component", this.props.iota);
   }

  send() {
    const seed = this.generateSeed();
    const depth = 4
    const minWeightMagnitude = 14

    const transaction =
    {
        // This is my test address
        // you can find all transactions here:
        // https://devnet.thetangle.org/address/XZRCWIPKMX9BBTEVIFEEHOQWBAYCQLRQOYTIIIR9LDYVTPBRLXOFSWZAOYMQDJDNPRNNRWIXLTWZKMK9Y
        address: 'XZRCWIPKMX9BBTEVIFEEHOQWBAYCQLRQOYTIIIR9LDYVTPBRLXOFSWZAOYMQDJDNPRNNRWIXLTWZKMK9YJDEZJYOGZ',
        // Value sent to recipient
        value: 0,
        message: 'HELLO9WORLD9FROM9REACT9AND9IOTA',
        tag: 'HELLOWORLD'
    }

    const transfers = [transaction]

    this.props.iota.api.sendTransfer(seed, depth, minWeightMagnitude, transfers, (error, success) => {
        if (error) {
            console.error("sendTransfer: error", error);
        } else {
            console.log("sendTransfer: success", success);
        }
    });
  }


  generateSeed() {

    var length       = 81;                            // The length of the seed and int array.
    var chars        = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9"; // The allowed characters in the seed.
    var randomValues = new Uint32Array(length);       // An empty array to store the random values.
    var result       = new Array(length);             // An empty array to store the seed characters.

    window.crypto.getRandomValues(randomValues);      // Generate random values and store them to array.

    var cursor = 0;                                   // A cursor is introduced to remove modulus bias.
    for (var i = 0; i < randomValues.length; i++) {   // Loop through each of the 81 random values.
        cursor += randomValues[i];                    // Add them to the cursor.
        result[i] = chars[cursor % chars.length];     // Assign a new character to the seed based on cursor mod 81.
    }

    return result.join('');                           // Merge the array into a single string and return it.

  };

  render() {
    return (
      <button onClick={this.send.bind(this)}>Send Transaction</button>
    );
  }
}

export default SendButton;
