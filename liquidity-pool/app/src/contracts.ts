import { Contract as USDC, networks as networksUSDC } from 'usdc'
import { Contract as BTC, networks as networksBTC } from 'btc'
import { Contract as ShareToken, networks as networksShareToken } from 'lp-token'
import { Contract as LiquidityPool, networks as networksLiquidityPool } from 'pool'

const rpcUrl = 'https://rpc-futurenet.stellar.org	'

export { Address } from 'usdc'
export const usdc = new USDC({ ...networksUSDC.futurenet, rpcUrl })
export const btc = new BTC({ ...networksBTC.futurenet, rpcUrl })
export const shareToken = new ShareToken({ ...networksShareToken.futurenet, rpcUrl })
export const liquidityPool = new LiquidityPool({ ...networksLiquidityPool.futurenet, rpcUrl })
