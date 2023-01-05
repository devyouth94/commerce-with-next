import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const updateProduct = async (id: number, contents: string) => {
  try {
    const response = await prisma.products.update({ where: { id }, data: { contents } });
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
  const { id, contents } = JSON.parse(req.body);

  if (!id || !contents) {
    res.status(400).json({ message: 'No ID or No Contents' });
    return;
  }

  try {
    const products = await updateProduct(Number(id), contents);
    res.status(200).json({ items: products, message: 'Success' });
  } catch (error) {
    res.status(400).json({ message: 'Failed' });
  }
};

export default handler;
