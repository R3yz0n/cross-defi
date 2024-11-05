// src/constants/blockchain.ts

import { ethers } from "ethers"

export const multiTokenKeeperFactoryAddress = "0xAf55874F541c646a8Bf90A08400Ed758010DA6BB"
export const linkTokenAddress: string = "0xE4aB69C077896252FAFBD49EFD26B5D171A32410"
export const defaultTriggerPrice = 40000
export const defaultAmount = 1000
export const maxApproveAmount = ethers.parseUnits("10000000000000000000000000000000", 18)
