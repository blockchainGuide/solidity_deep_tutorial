import { ethers } from "hardhat";
import { upgrades } from "hardhat";

const proxyAddress = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853'

async function main() {
    console.log(proxyAddress, " original proxy address")
    const LogicV2 = await ethers.getContractFactory("LogicV2")
    console.log("upgrade to LogicV2...")
    const myLogicV2 = await upgrades.upgradeProxy(proxyAddress, LogicV2)

    console.log(await upgrades.erc1967.getImplementationAddress(myLogicV2.address), " getImplementationAddress")
    console.log(await upgrades.erc1967.getAdminAddress(myLogicV2.address), " getAdminAddress")
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
