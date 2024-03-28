import {
  ENDPOINT as _ENDPOINT,

  Currency,

  LOOKUP_TABLE_CACHE,
  MAINNET_PROGRAM_ID,
  RAYDIUM_MAINNET,
  Token,
  TOKEN_PROGRAM_ID,
  TxVersion,
} from '@raydium-io/raydium-sdk';
import {
  Connection,
  Keypair,
  PublicKey,
} from '@solana/web3.js';
import secret from './guideSecret.json';

export const wallet = Keypair.fromSecretKey(Buffer.from(secret))

export const connection = new Connection("https://wider-palpable-vineyard.solana-mainnet.quiknode.pro/3cd5bebc5d7a04a067ec65e85fa58465e934e00b/");

export const PROGRAMIDS = MAINNET_PROGRAM_ID;

export const ENDPOINT = _ENDPOINT;

export const RAYDIUM_MAINNET_API = RAYDIUM_MAINNET;

export const makeTxVersion = TxVersion.V0; // LEGACY

export const addLookupTableInfo = LOOKUP_TABLE_CACHE // only mainnet. other = undefined

export const DEFAULT_TOKEN = {
  'SOL': new Currency(9, 'USDC', 'USDC'),
  'WSOL': new Token(TOKEN_PROGRAM_ID, new PublicKey('So11111111111111111111111111111111111111112'), 9, 'WSOL', 'WSOL'),
  'SCAT': new Token(TOKEN_PROGRAM_ID, new PublicKey('R2eUcPKojesLAj3ySiV1MRpvvtY69UdFbaGMi7x3vXe'), 8, 'SCAT', 'SCAT')
}

export const RETRIES = 200;

export const TARGET_POOL = "DTEs6PNcG5s8GAHxNgjzben2MT4xGRwehYtpwH63EJmj"; // PAIR POOL ID
export const LP_TOKEN = "SCAT"; // PROP IN THE TOKEN ARRAY. SHOULD BE THE LP ID