import axios from 'axios';
import useSWR from 'swr';

const fetcher = () => axios.get('http://localhost:4000/api/articles').then((res) => res.data);

export const useGetArticle = () => {
  const { data, error, isValidating } = useSWR('articles', fetcher);

  return {
    articlesResult: data,
    isLoading: isValidating,
    error
  };
};
