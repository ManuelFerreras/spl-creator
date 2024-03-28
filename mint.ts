import { percentAmount, generateSigner, signerIdentity, createSignerFromKeypair, Umi, KeypairSigner, PublicKey } from '@metaplex-foundation/umi'
import { TokenStandard, createAndMint } from '@metaplex-foundation/mpl-token-metadata'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import "@solana/web3.js";
import secret from './guideSecret.json';
import dotenv from 'dotenv';
import { clusterApiUrl } from '@solana/web3.js';
dotenv.config();

type MetadataType = {
    name: string,
    symbol: string,
    uri: string,
}

const mintFallback = async (umi: Umi, mint: KeypairSigner, metadata: MetadataType, owner: PublicKey) => {
    createAndMint(umi, {
        mint,
        authority: undefined,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        sellerFeeBasisPoints: percentAmount(0),
        decimals: 8,
        amount: 1000000_00000000,
        tokenOwner: owner,
        tokenStandard: TokenStandard.Fungible,
    }).sendAndConfirm(umi).then(() => {
        console.log("Successfully minted 1 million tokens (", mint.publicKey, ")");
    })
    // retry on catch.
    .catch(() => {
        console.log("Failed to mint tokens");
        mintFallback(umi, mint, metadata, owner);
    });
}

(async () => {
    // const umiURL = process.env.QUICKNODE_URL ?? "";
    const umiURL = clusterApiUrl('mainnet-beta');
    console.log("Using UMI URL: ", umiURL);
    const umi = createUmi(umiURL); //Replace with your QuickNode RPC Endpoint

    const userWallet = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secret));
    const userWalletSigner = createSignerFromKeypair(umi, userWallet);

    const metadata = {
        name: "Solana CAT",
        symbol: "SCAT",
        uri: "https://ipfs.io/ipfs/QmWemtDp8HkvFLB5APsGwXiwaMH3C4sPCuuJccaP97454c",
    };

    const mint = generateSigner(umi);
    umi.use(signerIdentity(userWalletSigner));
    umi.use(mplCandyMachine())

    mintFallback(
        umi,
        mint,
        metadata,
        userWallet.publicKey
    )
})();