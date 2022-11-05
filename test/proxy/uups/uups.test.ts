const { expect } = require('chai');
const { ethers, upgrades } = require('hardhat');


let logicV1: { address: any; SetLogic: (arg0: string, arg1: number) => any; GetLogic: (arg0: string) => any; };
let logicV2: { address: any; GetLogic: (arg0: string) => any; };

describe('uups mode upgrade', function () {
  it('deploys', async function () {
    const LogicV1 = await ethers.getContractFactory('LogicV1');
    logicV1 = (await upgrades.deployProxy(LogicV1, { kind: 'uups' }));
    console.log(logicV1.address);
  })
  it('LogicV1 set', async function () {
    await logicV1.SetLogic("https://github.com/blockchainGuide", 1);
    expect((await logicV1.GetLogic("https://github.com/blockchainGuide")).toString()).to.equal('1');
  })
  it('upgrades', async function () {
    const LogicV2 = await ethers.getContractFactory('LogicV2');
    logicV2 = (await upgrades.upgradeProxy(logicV1, LogicV2));
    console.log(logicV2.address);
  })
  it('LogicV2 get', async function () {
    expect((await logicV2.GetLogic("https://github.com/blockchainGuide")).toString()).to.equal('101');
  })
})