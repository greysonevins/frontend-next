import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export type NewArticleData = {
  imageHeadline: string;
  title: string;
  imagePage: string;
  description: string;
};
const API = process.env.REACT_APP_API || '';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { body } = req;
  if (req.method === 'PUT') {
    return new Promise<void>((resolve, reject) => {
      //   res.status(200).json({ name: 'John Doe' });
      //   resolve();
      // });
      const data: NewArticleData = { ...body };
      axios
        .put(`${API}articles`, data)
        .then((results) => {
          res.status(results.status).json(results.data);
          resolve();
        })
        .catch((error) => {
          res.status(error.status).json(error.response.data);
          reject();
        });
    });
  }
}

export const config = {
  api: {
    sizeLimit: '4mb',
  },
};
