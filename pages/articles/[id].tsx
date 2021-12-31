import axios, { AxiosError } from 'axios';
import Error from 'next/error';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { ArticleData } from '../api/articles/[id]';
import Fab from '@mui/material/Fab';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRouter } from 'next/router';

const API = process.env.REACT_APP_API || '';

type ArticleProps = {
  article?: ArticleData;
  errorCode?: number;
};
const Article: React.FC<ArticleProps> = ({ article, errorCode }) => {
  const router = useRouter();
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
      <Fab
        onClick={() => router.push('/')}
        variant="extended"
        color="primary"
        aria-label="create your own"
        sx={{ position: 'fixed', bottom: 100, right: 16 }}
      >
        <AddCircleOutlineIcon sx={{ mr: 1 }} />
        Create Your Own
      </Fab>
    </div>
  );
};

export const getStaticProps: GetStaticProps<ArticleProps> = async (context) => {
  const req = `${API}articles/${context?.params?.id || ''}`;
  try {
    const res = await axios.get(req);
    const article: ArticleData = res?.data;
    return {
      props: {
        article,
      },
    };
  } catch (e) {
    const error = e as AxiosError;
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
