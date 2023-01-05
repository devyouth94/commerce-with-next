import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const getProducts = async () => {
  try {
    const response = await prisma.products.findMany();
    return response;
  } catch (error) {
    console.error(error);
  }
};

type Data = {
  items?: any;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const products = await getProducts();
    res.status(200).json({ items: products, message: 'Success' });
  } catch (error) {
    res.status(400).json({ message: 'Failed' });
  }
};

export default handler;
