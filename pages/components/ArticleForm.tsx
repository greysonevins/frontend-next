import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { Data } from '../api/articles/[id]';
import { UploadImage } from './UploadImage';
const API = process.env.API || '';

const theme = createTheme();
export const ArticleForm = () => {
  const [newArticle, setNewArticle] = useState<Partial<Data>>({
    title: '',
    description: '',
    imagePage: '',
    imageHeadline: '',
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    const title = String(data.get('title')) || '';
    const description = String(data.get('description')) || '';
    setNewArticle((article) => ({
      ...article,
      description: description,
      title: title,
    }));
    setSubmitted(true);
    if (isValidForm && description && title) {
      console.log({ newArticle }, 'valid');
    }
  };

  const isValidForm = useMemo(
    () => Boolean(newArticle?.imagePage && newArticle?.imageHeadline),
    [newArticle?.imagePage, newArticle?.imageHeadline]
  );
  console.log({ newArticle, isValidForm });
  return (
    <React.Fragment>
      {API}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Create Spoof Article
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="given-name"
                    name="title"
                    error={submitted && !newArticle?.title}
                    required
                    fullWidth
                    id="title"
                    label="Article Title"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    error={submitted && !newArticle?.description}
                    fullWidth
                    id="description"
                    label="Article Description"
                    name="description"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography
                    component="p"
                    variant="subtitle1"
                    color={
                      submitted && !newArticle?.imageHeadline
                        ? 'error'
                        : 'default'
                    }
                  >
                    Set Article Link Image
                  </Typography>
                  <UploadImage
                    setData={setNewArticle}
                    dataKey={'imageHeadline'}
                    formError={submitted && !newArticle?.imageHeadline}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography
                    component="p"
                    variant="subtitle1"
                    color={
                      submitted && !newArticle?.imagePage ? 'error' : 'default'
                    }
                  >
                    Set Article Image when opened
                  </Typography>
                  <UploadImage
                    setData={setNewArticle}
                    dataKey={'imagePage'}
                    formError={submitted && !newArticle?.imagePage}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Article
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item></Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};
