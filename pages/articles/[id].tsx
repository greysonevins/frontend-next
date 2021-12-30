import axios, { AxiosError } from 'axios';
import Error from 'next/error';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Data } from '../api/articles/[id]';

type ArticleProps = {
  article?: Data;
  errorCode?: number;
};
const Article: React.FC<ArticleProps> = ({ article, errorCode }) => {
  const { query } = useRouter();
  console.log({ art: article, errorCode });
  // console.log({ query });
  // const req = `/api/articles/${query?.id || ''}`;
  // console.log({ req });
  // axios.get(req).then((res) => console.log({ data: res?.data }));
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }
  return (
    <div>
      <Head>
        <meta property="og:site_name" content="CNN News" />
        <meta
          property="og:url"
          content="https://media-exp1.licdn.com/dms/image/C4E03AQGUaQaWDznMPQ/profile-displayphoto-shrink_800_800/0/1569602062184?e=1645056000&v=beta&t=YTWnI08eeSQBNETY-BFgBjQjAoBYZvK_aE2zKVqBID4"
        />
        <meta property="og:title" content={article?.title} />
        <meta property="og:description" content={article?.description} />
        <meta property="og:type" content="video.other" />
        <link rel="apple-touch-icon" href={article?.imageHeadline} />
        <meta property="og:image" content={article?.imageHeadline} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="400" />
        <title>{article?.title}</title>
        <meta name="description" content={article?.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img src={article?.imagePage || ''} />
    </div>
  );
};

const API = process.env.REACT_APP_API || '';

export const getStaticProps: GetStaticProps<ArticleProps> = async (context) => {
  console.log({ context });
  const req = `${API}/articles/${context?.params?.id || ''}`;
  console.log({ req });
  try {
    const res = await axios.get(req);
    const article = res?.data;
    console.log({ article });
    return {
      props: {
        article,
      },
    };
  } catch (e) {
    const error = e as AxiosError;
    console.log({ e });
    return {
      props: {
        errorCode: error.response?.status,
      },
    };
  }
};

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export default Article;
