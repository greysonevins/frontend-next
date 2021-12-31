import type { NextPage } from 'next';
import Head from 'next/head';
import { ArticleForm } from '../components/ArticleForm';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Box,
  createTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
} from '@mui/material';
import { useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Article from '../components/Article';

const Home: NextPage = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [articles] = useLocalStorage<string[]>('articlesCreated', []);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  return (
    <div>
      <Head>
        <title>Create Spoof article</title>
        <meta
          name="description"
          content="Create a spoof article to be annoying"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ArticleForm />
        <Box
          sx={{
            display: 'flex',
            marginLeft: 10,
            marginRight: 10,
            marginTop: 20,
            marginBottom: 30,
          }}
        >
          <Grid
            container
            spacing={12}
            direction="row"
            justifyContent="center"
            alignContent="center"
          >
            {articles.map((articleId, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Article id={articleId} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Home;
