import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export const Field = ({ limit = 60, label = '', err = false }) => {
  const [error, setError] = useState<boolean>(err);
  const [fieldValue, setFieldValue] = useState<string>('');

  useEffect(() => {
    setError(fieldValue.length > limit);
  }, [setError, fieldValue, limit]);

  return (
    <TextField
      id="filled-basic"
      label={label}
      error={error}
      variant="filled"
      value={fieldValue}
      onChange={(e) => setFieldValue(e.target.value)}
    />
  );
};
