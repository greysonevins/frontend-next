import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export type Data = {
  id: string;
  imageHeadline: string;
  title: string;
  imagePage?: string;
  description?: string;
};

const API = process.env.REACT_APP_API || '';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    query: { id },
  } = req;
  return new Promise<void>((resolve, reject) => {
    axios
      .get(`${API}/articles/${id}`)
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
