import { ChangeEvent, useState, useCallback } from 'react';
import EXIF from 'exif-js';
import { getBase64Strings } from 'exif-rotate-js/lib';

function readFileDataAsBase64(e: ChangeEvent<HTMLInputElement>) {
  return new Promise((resolve, reject) => {
    if (e.target?.files?.length) {
      const file = e.target?.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event?.target?.result);
      };

      reader.onerror = (err) => {
        reject(err);
      };

      reader.readAsDataURL(file);
    } else {
      resolve('');
    }
  });
}

export const useGetImage = () => {
  const [imgData, setImageData] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<string | null>();

  const onDrop = useCallback(
    (picture: ChangeEvent<HTMLInputElement>) => {
      let exifFile = true;
      setLoading(true);
      setError(false);
      setFile(null);

      // @ts-ignore
      EXIF.getData(picture?.target?.files[0], function () {
        // @ts-ignore
        let exifData = EXIF.pretty(this);
        if (exifData) {
          exifFile = true;
        } else {
          exifFile = false;
        }
      });

      if (!exifFile) {
        // @ts-ignore
        readFileDataAsBase64(picture)
          .then((res) => {
            const resString = res as string;
            setImageData(resString);
            setLoading(false);
            if (picture?.target?.files?.length) {
              setFile(URL.createObjectURL(picture.target.files[0]));
            }
          })
          .catch((e) => {
            setError(true);
            setLoading(false);
          });
      } else {
        // @ts-ignore
        getBase64Strings(picture.target.files, { maxSize: 2000 })
          .then((res) => {
            setImageData(res[0]);
            setLoading(false);
            if (picture?.target?.files?.length) {
              setFile(URL.createObjectURL(picture.target.files[0]));
            }
          })
          .catch((e: any) => {
            setError(true);
            setLoading(false);
          });
      }
    },
    [setLoading, setImageData, setError]
  );
  return {
    onDrop,
    loading,
    error,
    imgData,
    setError,
    file,
  };
};
