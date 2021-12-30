import type { NextPage } from 'next';
import Head from 'next/head';
import { ArticleForm } from './components/ArticleForm';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Spoof article</title>
        <meta
          name="description"
          content="Create a spoof article to be annoying"
        />
      </Head>

      <ArticleForm />
    </div>
  );
};

export default Home;
