import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import Bundlr from '@bundlr-network/client';

const privateKey = process.env.PRIVATE_KEY;
const bundlr = new Bundlr("https://devnet.bundlr.network","matic", privateKey, { providerUrl: "https://polygon-rpc.com" });


async function ArweaveUploader(req: NextApiRequest, res: NextApiResponse) {
  try {
    
    res.status(200).json({ walletAddress: bundlr.address });
    const stats = fs.statSync(file);
    const fileSize = stats.size;
    const price = await bundlr.getPrice(fileSize);

    const response = await bundlr.fund(price);
    console.log(`Funding successful txID=${response.id} amount funded=${response.quantity}`);
    
    const fileData = fs.readFileSync(file);
    const fileBuffer = Buffer.from(fileData);
    const fileTransactionId = await bundlr.upload(fileBuffer);

    const metadata = {
        name: name,
        description: description,
        file: `https://arweave.net/${fileTransactionId}`
    };
    
    const jsonData = JSON.stringify(metadata);
    const jsonBuffer = Buffer.from(jsonData);
    const jsonTransactionId = await bundlr.upload(jsonBuffer);


    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

export default ArweaveUploader;
