import { percentAmount, generateSigner, signerIdentity, createSignerFromKeypair } from '@metaplex-foundation/umi'
import { TokenStandard, createAndMint } from '@metaplex-foundation/mpl-token-metadata'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import "@solana/web3.js";
import secret from './guideSecret.json';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
    const umiURL = process.env.QUICKNODE_URL ?? "";
    console.log("Using UMI URL: ", umiURL);
    const umi = createUmi(umiURL); //Replace with your QuickNode RPC Endpoint

    const userWallet = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secret));
    const userWalletSigner = createSignerFromKeypair(umi, userWallet);

    const metadata = {
        name: "Best Token Ever",
        symbol: "BTE",
        uri: "https://ipfs.io/ipfs/QmPE9gFFsS1nCUHAz2htyRj8sz1EjL3dhHDeGSsTPgcwho",
    };

    const mint = generateSigner(umi);
    umi.use(signerIdentity(userWalletSigner));
    umi.use(mplCandyMachine())

    createAndMint(umi, {
        mint,
        authority: umi.identity,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        sellerFeeBasisPoints: percentAmount(0),
        decimals: 8,
        amount: 1000000_00000000,
        tokenOwner: userWallet.publicKey,
        tokenStandard: TokenStandard.Fungible,
    }).sendAndConfirm(umi).then(() => {
        console.log("Successfully minted 1 million tokens (", mint.publicKey, ")");
    });
})();