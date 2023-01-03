// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: 'secret_7696QDHfPpMzn2vW6sMgUybWiEZDqGsHwV4SgVo4KWW' });
const databaseId = '0e3a6e938c5e4aeab71b25ee0b67696c';

const addItem = async (name: string) => {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: [{ text: { content: name } }],
      },
    });
    console.log(response);
  } catch (error) {
    console.error(JSON.stringify(error));
  }
};

type Data = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { name } = req.query;

  if (name === null) {
    return res.status(400).json({ message: 'No Name!' });
  }

  try {
    await addItem(String(name));
    res.status(200).json({ message: `Success ${name} Added` });
  } catch (error) {
    res.status(400).json({ message: `Fail ${name} Added` });
  }
}
