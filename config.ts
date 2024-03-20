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
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
} from '@solana/web3.js';
import secret from './guideSecret.json';

export const rpcUrl: string = 'https://xxx.xxx.xxx/'
export const rpcToken: string | undefined = undefined

export const wallet = Keypair.fromSecretKey(Buffer.from(secret))

export const connection = new Connection("https://dark-spring-sheet.solana-mainnet.quiknode.pro/29e3cb6d25a5590c773942232e727afd9065f382/");

export const PROGRAMIDS = MAINNET_PROGRAM_ID;

export const ENDPOINT = _ENDPOINT;

export const RAYDIUM_MAINNET_API = RAYDIUM_MAINNET;

export const makeTxVersion = TxVersion.V0; // LEGACY

export const addLookupTableInfo = LOOKUP_TABLE_CACHE // only mainnet. other = undefined

export const DEFAULT_TOKEN = {
  'TRUMP': new Token(TOKEN_PROGRAM_ID, new PublicKey('GpbfGcR5nfsbXkxNAFopCLSSXnrVZskEFEp1nEv8pLQB'), 8, 'TRUMP', 'TRUMP'),
  'TRUMP_V2': new Token(TOKEN_PROGRAM_ID, new PublicKey('9y3a8Da6fu39ELQfRhYKPDNTSvRF6Qwbn4jhcscdnHMx'), 8, 'TRUMP', 'TRUMP'),
  'TRUMP_V3': new Token(TOKEN_PROGRAM_ID, new PublicKey('3RyzrwvCFyFeo1MiZFzLQM8puyqN74WKrdWGGEJeLG3E'), 8, 'TRUMP', 'TRUMP'),
  'TRUMP_V4': new Token(TOKEN_PROGRAM_ID, new PublicKey('ACWJD6rt4bQakKsyVaG1mxEJxsxc622H8P2MT5HcvZgc'), 8, 'TRUMP', 'TRUMP'),
  'TRUMP_V5': new Token(TOKEN_PROGRAM_ID, new PublicKey('3vZEFfEnZP13iHaTGUX3E92y9714yFYsn92YHGduqYwt'), 8, 'TRUMP', 'TRUMP'),
}

export const RETRIES = 50;

export const TARGET_POOL = "3UdSS1a28vFaPpu9NHYZab7KVwJxhhuzBDoK5atEit9g"; // PAIR POOL ID
export const LP_TOKEN = "TRUMP_V5"; // PROP IN THE TOKEN ARRAY. SHOULD BE THE LP ID