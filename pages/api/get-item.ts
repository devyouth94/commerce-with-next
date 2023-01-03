// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: 'secret_7696QDHfPpMzn2vW6sMgUybWiEZDqGsHwV4SgVo4KWW' });
const databaseId = '0e3a6e938c5e4aeab71b25ee0b67696c';

const getItem = async () => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'price',
          direction: 'ascending',
        },
      ],
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
};

type Data = {
  items?: any;
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const response = await getItem();
    res.status(200).json({ items: response?.results, message: 'Success' });
  } catch (error) {
    res.status(400).json({ message: 'Fail' });
  }
}
