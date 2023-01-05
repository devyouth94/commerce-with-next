import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const getProducts = async (skip: number, take: number) => {
  try {
    const response = await prisma.products.findMany({
      skip,
      take,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

type Data = {
  items?: any;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { skip, take } = req.query;

  if (!skip || !take) {
    res.status(400).json({ message: 'No skip or No take' });
    return;
  }

  try {
    const products = await getProducts(Number(skip), Number(take));
    res.status(200).json({ items: products, message: 'Success' });
  } catch (error) {
    res.status(400).json({ message: 'Failed' });
  }
};

export default handler;
