import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import {
  Backdrop,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Grid,
} from '@mui/material';
import { useGetImage } from '../hooks/useGetImages';
import { Data } from '../pages/api/articles/[id]';

export const UploadImage = ({
  setData,
  dataKey,
  formError,
}: {
  setData: React.Dispatch<React.SetStateAction<Partial<Data>>>;
  dataKey: string;
  formError: boolean;
}) => {
  const {
    onDrop,
    loading,
    error: imgLoadError,
    imgData,
    setError,
    file,
  } = useGetImage();

  useEffect(() => {
    if (imgData) {
      console.log({ dataKey, imgData });
      setData((d) => ({ ...d, [dataKey]: imgData }));
    }
  }, [setData, imgData, dataKey]);
  console.log({ imgData });
  return (
    <React.Fragment key={dataKey}>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id={`raised-button-file-${dataKey}`}
            type="file"
            onChange={onDrop}
          />
          <label htmlFor={`raised-button-file-${dataKey}`}>
            <Button
              disabled={loading}
              variant="contained"
              color={imgData ? 'success' : formError ? 'error' : 'primary'}
              component="span"
            >
              Upload
              {imgData && <CheckIcon fontSize="small" />}
            </Button>
          </label>
        </Grid>
        <Grid item xs={12} sm={6}>
          {file && imgData && <img width="40" height="40" src={file} />}
        </Grid>
      </Grid>
      <Backdrop style={{ zIndex: 1, color: '#fff' }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={imgLoadError}
        autoHideDuration={6000}
        onClose={() => setError(false)}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setError(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert onClose={() => setError(false)} severity="error">
          Error Uploading Selected Image
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};
