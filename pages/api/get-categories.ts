import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const getCategories = async () => {
  try {
    const response = await prisma.categories.findMany({});
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
  try {
    const products = await getCategories();
    res.status(200).json({ items: products, message: 'Success' });
  } catch (error) {
    res.status(400).json({ message: 'Failed' });
  }
};

export default handler;
