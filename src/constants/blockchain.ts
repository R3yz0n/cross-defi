// src/constants/blockchain.ts

import { ethers } from "ethers"

// Define LinkToken type
export type LinkToken = {
   address: string
   decimal: string
}

export const multiTokenKeeperFactoryAddress = "0xC98b425B1681009b703d8766B0DE022Ce2D6b6cb"
export const linkTokenAddress: string = "0xE4aB69C077896252FAFBD49EFD26B5D171A32410"
export const maxApproveAmount = ethers.parseUnits("10000000000000000000000000000000", 18)
export const defaultApproveAmount = ethers.parseUnits("10000000000000000000000000000000", 18)

export const linkToken: LinkToken = {
   address: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410",
   decimal: "18",
}
