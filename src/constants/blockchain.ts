import { ethers } from "ethers"

export type LinkToken = {
   address: string
   decimal: string
}

export const multiTokenKeeperFactoryAddress = import.meta.env.VITE_MULTITOKENKEEPER_FACTORY_ADDRESS
export const maxApproveAmount = ethers.parseUnits("10000000000000000000000000000000", 18)
export const defaultApproveAmount = ethers.parseUnits("10000000000000000000000000000000", 18)

export const nullMultiTokenKeeperAddress = import.meta.env.VITE_NULL_MULTITOKENKEEPER_ADDRESS

export const stringifiedJsonToken = import.meta.env.VITE_LINK_TOKEN

export const linkToken: LinkToken = JSON.parse(stringifiedJsonToken)

export const linkTokenAddress: string = linkToken.address
