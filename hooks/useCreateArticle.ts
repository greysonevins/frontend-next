import axios, { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { NewArticleData } from '../pages/api/articles';

const API = process.env.REACT_APP_API || '';
export const useCreateArticle = (data: NewArticleData) => {
  const [res, setRes] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const createArticleCallback = useCallback(
    (data: NewArticleData) => {
      const createArticle = async (data: NewArticleData) => {
        try {
          setError('');
          setLoading(true);

          const res = await axios.put(`${API}articles`, data);
          setRes(res?.data?.articleId);
        } catch (e) {
          const error = e as AxiosError;
          setError(error?.message);
        } finally {
          setLoading(false);
        }
      };
      if (
        data?.description &&
        data?.imageHeadline &&
        data?.imagePage &&
        data?.title
      ) {
        createArticle(data);
      }
    },
    [setRes, setLoading, setError]
  );

  return {
    res,
    loading,
    error,
    createArticleCallback,
    setError,
  };
};
