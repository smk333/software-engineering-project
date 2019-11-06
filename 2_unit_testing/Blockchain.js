/* 
    Sources: 
	1. https://www.youtube.com/watch?v=zVqczFZr124
	2. https://medium.com/@spenserhuang/learn-build-a-javascript-blockchain-part-1-ca61c285821e
	3. https://en.bitcoin.it/wiki/Nonce
*/

const SHA256 = require('crypto-js/sha256');

class Block{
	constructor(timestamp, data, previousHash = ''){
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.generateHash();
		this.nonce = 0;		// noise value used in the mining process
	}

	generateHash(){
		return SHA256(this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
	}

	mineBlock(difficulty){
		while(this.hash.substring(0, difficulty) !== '0'.repeat(difficulty)){
			this.nonce = Math.random();
			this.hash = this.generateHash();
		}
		console.log("Block mined: " + this.hash);
	}
}

class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 5;	// the hash starts with this many zeros
	}

	createGenesisBlock(){
		return new Block(Date.now(), "Genesis Block", null);
	}

	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.mineBlock(this.difficulty);		// proof of work algorithm
		this.chain.push(newBlock);
	}

	checkValidity(){
		for(let i = 1; i < this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			// make sure the hash hasn't been altered
			if(currentBlock.hash !== currentBlock.generateHash()){
				return false;
			}

			// make sure the current block is pointing to the correct previous block
			if(currentBlock.previousHash !== previousBlock.hash){
				return false;
			}
		}

		return true;
	}
}

// Test Bed: Try to create a few blocks, then check the validity.
let fitnessChain = new Blockchain();
console.log('Mining block 1...');
fitnessChain.addBlock(new Block(Date.now(), 100));
console.log('Mining block 2...');
fitnessChain.addBlock(new Block(Date.now(), 800));
console.log(JSON.stringify(fitnessChain, null, 4));

// Then, try to alter the block and see what happens.
console.log("The blockchain is valid: " + fitnessChain.checkValidity());
console.log("Now I will try altering the data.");
fitnessChain.chain[1].data = 90000000;
console.log(JSON.stringify(fitnessChain, null, 4));
console.log("The blockchain is valid: " + fitnessChain.checkValidity());

/* 
	Future plans after finalizing the webpages:
  	1. Link users to each piece of data.
  	2. Determine what kind of data it is.
  	3. Allow a rollback feature in the blockchain.
  	4. Have a pending logs array so the user doesn't have to wait so long between entries.
*/