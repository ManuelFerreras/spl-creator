import assert from 'assert';

import {
  jsonInfo2PoolKeys,
  Liquidity,
  LiquidityPoolKeys,
  TOKEN_PROGRAM_ID,
  TokenAmount
} from '@raydium-io/raydium-sdk';
import { Connection, Keypair, PublicKey, SendOptions } from '@solana/web3.js';

import {
  connection,
  DEFAULT_TOKEN,
  LP_TOKEN,
  makeTxVersion,
  RETRIES,
  TARGET_POOL,
  wallet
} from './config';
import { formatAmmKeysById } from './formatAmmKeysById';
import {
  buildAndSendTx,
  getWalletTokenAccount,
} from './util';

type WalletTokenAccounts = Awaited<ReturnType<typeof getWalletTokenAccount>>
type TestTxInputInfo = {
  removeLpTokenAmount: TokenAmount
  targetPool: string
  walletTokenAccounts: WalletTokenAccounts
  wallet: Keypair
}

async function ammRemoveLiquidity(input: TestTxInputInfo) {
  // -------- pre-action: fetch basic info --------
  const targetPoolInfo = await formatAmmKeysById(input.targetPool)
  assert(targetPoolInfo, 'cannot find the target pool')

  // -------- step 1: make instructions --------
  const poolKeys = jsonInfo2PoolKeys(targetPoolInfo) as LiquidityPoolKeys

  console.log(poolKeys.lpMint)
  console.log(input.removeLpTokenAmount.token.mint)

  const removeLiquidityInstructionResponse = await Liquidity.makeRemoveLiquidityInstructionSimple({
    connection,
    poolKeys,
    userKeys: {
      owner: input.wallet.publicKey,
      payer: input.wallet.publicKey,
      tokenAccounts: input.walletTokenAccounts,
    },
    amountIn: input.removeLpTokenAmount,
    makeTxVersion,
  })

  const options: SendOptions = {
    skipPreflight: true,
    preflightCommitment: 'confirmed',
    maxRetries: 5
  }

  const hashes = [];

  for (let i = 0; i < RETRIES; i++) {
    const hash = await buildAndSendTx(removeLiquidityInstructionResponse.innerTransactions, options)
    hashes.push(hash)
  }

  console.log(hashes)

  return { txids: await buildAndSendTx(removeLiquidityInstructionResponse.innerTransactions, options) }
}

async function getTokenBalance(connection: Connection, token: PublicKey) {
  const tokenAccounts = await connection.getTokenAccountsByOwner(
    wallet.publicKey,
    {
      programId: TOKEN_PROGRAM_ID,
      mint: token,
    }
  );

  const tokenAccount = await connection.getTokenAccountBalance(tokenAccounts.value[0].pubkey)
  return tokenAccount.value.amount
}

async function howToUse() {
  const lpToken = DEFAULT_TOKEN[LP_TOKEN] // LP
  const lpBalance = await getTokenBalance(connection, lpToken.mint)
  console.log('lpBalance', lpBalance)
  const removeLpTokenAmount = new TokenAmount(lpToken, lpBalance)
  const targetPool = TARGET_POOL
  const walletTokenAccounts = await getWalletTokenAccount(connection, wallet.publicKey)

  ammRemoveLiquidity({
    removeLpTokenAmount,
    targetPool,
    walletTokenAccounts,
    wallet: wallet,
  }).then(({ txids }) => {
    /** continue with txids */
    console.log('txids', txids)
  })
}

howToUse()