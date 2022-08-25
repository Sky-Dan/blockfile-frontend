import { ethers } from 'hardhat';

async function main() {
  const Storage = await ethers.getContractFactory('Storage');
  const storage = await Storage.deploy();

  await storage.deployed();

  console.log(`Storage deployed to ${storage.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
//0x8c33645826a251358EaAE334Af3e6E3888feB996
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
