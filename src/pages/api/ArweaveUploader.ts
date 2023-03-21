import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import Bundlr from '@bundlr-network/client';

const privateKey = process.env.PRIVATE_KEY;
const bundlr = new Bundlr("https://devnet.bundlr.network","matic", privateKey, { providerUrl: "https://polygon-rpc.com" });


async function ArweaveUploader(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json({ walletAddress: bundlr.address });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

export default ArweaveUploader;
