// src/constants/blockchain.ts

import { ethers } from "ethers"

export const multiTokenKeeperFactoryAddress = "0x2fCF821e39FBD22151648756E2a7522759b5a3C2"
export const linkTokenAddress: string = "0xE4aB69C077896252FAFBD49EFD26B5D171A32410"
export const defaultTriggerPrice = 40000
export const defaultAmount = 1000
export const maxApproveAmount = ethers.parseUnits("10000000000000000000000000000000", 18)
