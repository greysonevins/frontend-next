import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useCreateArticle } from '../hooks/useCreateArticle';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { NewArticleData } from '../pages/api/articles';
import { UploadImage } from './UploadImage';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const ArticleForm = () => {
  const [newArticle, setNewArticle] = useState<NewArticleData>({
    title: '',
    description: '',
    imagePage: '',
    imageHeadline: '',
  });
  const [articles, setSavedArticles] = useLocalStorage<string[]>(
    'articlesCreated',
    []
  );
  const [successCreatingArticle, setSuccess] = useState<string>();

  const [submitted, setSubmitted] = useState<boolean>(false);
  const {
    createArticleCallback,
    loading: loadingSave,
    res: newArticleSaved,
    error: errorSavedArticle,
    setError: setErrorNewArticle,
  } = useCreateArticle(newArticle);
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
      createArticleCallback({ ...newArticle, title, description });
    }
  };

  useEffect(() => {
    if (!loadingSave && newArticleSaved) {
      setSavedArticles((articles) =>
        Array.from(new Set([...articles, newArticleSaved]))
      );
      setSuccess('Successfully created spoof article!');
    }
  }, [loadingSave, newArticleSaved]);

  const articleLink = useMemo(() => {
    const link =
      !loadingSave && newArticleSaved && !errorSavedArticle
        ? `${window.location.href}articles/${newArticleSaved}`
        : '';
    return link;
  }, [loadingSave, newArticleSaved, errorSavedArticle]);

  const isValidForm = useMemo(
    () => Boolean(newArticle?.imagePage && newArticle?.imageHeadline),
    [newArticle?.imagePage, newArticle?.imageHeadline]
  );
  return newArticleSaved ? (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h5">
          New Article Created!
        </Typography>
        <Button aria-label="share">
          Copy Article Link
          <ContentCopyIcon
            onClick={() => navigator.clipboard.writeText(articleLink)}
          />
        </Button>
        <Typography variant="body2" color="#2196f3">
          <Link href={`/articles/${newArticleSaved}`}>{articleLink}</Link>
        </Typography>
      </Box>
    </Container>
  ) : (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
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
      <Backdrop style={{ zIndex: 1, color: '#fff' }} open={loadingSave}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(successCreatingArticle)}
        autoHideDuration={10000}
        onClose={() => setSuccess('')}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setSuccess('')}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert onClose={() => setSuccess('')} sx={{ width: '100%' }}>
          {successCreatingArticle}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(errorSavedArticle)}
        autoHideDuration={10000}
        onClose={() => setErrorNewArticle('')}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setErrorNewArticle('')}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert
          onClose={() => setErrorNewArticle('')}
          severity="error"
          sx={{ width: '100%' }}
        >
          Error creating new article
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};
