import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Article: NextPage = () => {
  const { query } = useRouter();
  console.log({ query });
  console.log();
  return (
    <div>
      <Head>
        <meta property="og:site_name" content="CNN News" />
        <meta
          property="og:url"
          content="https://media-exp1.licdn.com/dms/image/C4E03AQGUaQaWDznMPQ/profile-displayphoto-shrink_800_800/0/1569602062184?e=1645056000&v=beta&t=YTWnI08eeSQBNETY-BFgBjQjAoBYZvK_aE2zKVqBID4"
        />
        <meta
          property="og:title"
          content="Upward Farms Co-Founder, Matt Larosa, fish 1"
        />
        <meta
          property="og:description"
          content="Upward Farms Co-Founder, Matt Larosa, fish 2"
        />
        <meta property="og:type" content="video.other" />
        <link
          rel="apple-touch-icon"
          href="https://media-exp1.licdn.com/dms/image/C4E03AQGUaQaWDznMPQ/profile-displayphoto-shrink_800_800/0/1569602062184?e=1645056000&v=beta&t=YTWnI08eeSQBNETY-BFgBjQjAoBYZvK_aE2zKVqBID4"
        />
        <meta
          property="og:image"
          content="https://media-exp1.licdn.com/dms/image/C4E03AQGUaQaWDznMPQ/profile-displayphoto-shrink_800_800/0/1569602062184?e=1645056000&v=beta&t=YTWnI08eeSQBNETY-BFgBjQjAoBYZvK_aE2zKVqBID4"
        />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="400" />
        <title>Upward Farms Co-Founder, Matt Larosa, fish 3</title>
        <meta
          name="description"
          content="Upward Farms Co-Founder, Matt Larosa, fish"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>This is article test2 again {query.id}</h1>

        <p>
          Get started by editing <code>pages/index.tsx</code>
        </p>

        <div>
          <a href="https://nextjs.org/docs">
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn">
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a href="https://github.com/vercel/next.js/tree/master/examples">
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Article;
