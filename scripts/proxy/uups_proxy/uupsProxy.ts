import { ethers, upgrades } from 'hardhat'

// yarn hardhat run scripts/deploy_openProxy.ts --network localhost
async function main() {
    const LogicV1 = await ethers.getContractFactory('LogicV1')

    // 部署合约, 并调用初始化方法
    const myLogicV1 = await upgrades.deployProxy(LogicV1, {
        initializer: 'initialize',
        kind: 'uups'
    })

    await myLogicV1.deployed();
    // 代理合约地址
    const proxyAddress = myLogicV1.address
    // 实现合约地址
    const implementationAddress = await upgrades.erc1967.getImplementationAddress(myLogicV1.address)
    // proxyAdmin 合约地址
    const adminAddress = await upgrades.erc1967.getAdminAddress(myLogicV1.address)

    console.log(`proxyAddress: ${proxyAddress}`)
    console.log(`implementationAddress: ${implementationAddress}`)
    console.log(`adminAddress: ${adminAddress}`)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})