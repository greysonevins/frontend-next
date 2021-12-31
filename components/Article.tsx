import React, { useState, useEffect, useMemo } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { ArticleData } from '../pages/api/articles/[id]';
import { CardActionArea, Skeleton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const useGetArticle = (id: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [articleData, setArticleData] = useState<ArticleData>();
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    const getArticle = async (id: string) => {
      setLoading(true);
      setError(false);
      try {
        const res = await axios.get(`/api/articles/${id}`);
        setArticleData(res?.data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      getArticle(id);
    }
  }, [id, setLoading, setArticleData]);
  return {
    loading,
    articleData,
    error,
  };
};
export default function Article({ id }: { id: string }) {
  const router = useRouter();

  const { loading, articleData, error } = useGetArticle(id);
  const articleLink = useMemo(() => {
    const link =
      id && !loading && !error ? `${window.location.href}articles/${id}` : '';
    return link;
  }, [id, loading, error]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            articleData?.title
          )
        }
      />
      <CardActionArea onClick={() => router.push(`/articles/${id}`)}>
        {loading ? (
          <Skeleton
            sx={{ height: 190 }}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <CardMedia
            component="img"
            height="194"
            image={articleData?.imageHeadline}
            alt="Paella dish"
          />
        )}
        <CardContent>
          {loading ? (
            <React.Fragment>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="80%" />
            </React.Fragment>
          ) : (
            <Typography variant="body2" color="text.secondary">
              {articleData?.description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        {!loading && articleData && (
          <React.Fragment>
            <Typography variant="body2" color="text.secondary">
              <Link href={`/articles/${id}`}>{articleLink}</Link>
            </Typography>
            <IconButton aria-label="share">
              <ContentCopyIcon
                onClick={() => navigator.clipboard.writeText(articleLink)}
              />
            </IconButton>
          </React.Fragment>
        )}
      </CardActions>
    </Card>
  );
}
