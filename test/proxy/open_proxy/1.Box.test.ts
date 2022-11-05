import { expect } from "chai";
import { ethers } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("Box", function () {
  console.log("https://github.com/blockchainGuide");
  let box: Contract;

  beforeEach(async function () {
    const Box = await ethers.getContractFactory("Box")
    box = await Box.deploy()
    await box.deployed()
  })

  it("should retrieve value previously stored", async function () {
    await box.store(42)
    expect(await box.retrieve()).to.equal(BigNumber.from('42'))

    await box.store(100)
    expect(await box.retrieve()).to.equal(BigNumber.from('100'))
  })
})
