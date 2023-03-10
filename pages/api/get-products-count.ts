import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const getProductsCount = async (category: number) => {
  const where =
    category && category !== -1
      ? {
          where: {
            category_id: category,
          },
        }
      : undefined;

  try {
    const response = await prisma.products.count(where);
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
  const { category } = req.query;

  try {
    const products = await getProductsCount(Number(category));
    res.status(200).json({ items: products, message: 'Success' });
  } catch (error) {
    res.status(400).json({ message: 'Failed' });
  }
};

export default handler;
