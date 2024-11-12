// src/constants/blockchain.ts

import { ethers } from "ethers"

// Define LinkToken type
export type LinkToken = {
   address: string
   decimal: string
}

export const multiTokenKeeperFactoryAddress = "0x3f999C7A087F9c45cac76732dAc6aCd95E15759F"
export const linkTokenAddress: string = "0xE4aB69C077896252FAFBD49EFD26B5D171A32410"
export const maxApproveAmount = ethers.parseUnits("10000000000000000000000000000000", 18)
export const defaultApproveAmount = ethers.parseUnits("10000000000000000000000000000000", 18)

export const linkToken: LinkToken = {
   address: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410",
   decimal: "18",
}
