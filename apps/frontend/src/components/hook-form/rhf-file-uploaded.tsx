'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { FileInput, FileInputProps } from '@mantine/core';
import { usePersonnelCallUpload } from '@src/hooks/use-gcs-upload';
import { RouterLink } from '@src/routes/components';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

type Props = FileInputProps & {
  name: string;
};

export default function RHFFileUploaded({ name, type, ...other }: Props) {
  const { control } = useFormContext();
  const { progress, handleUpload } = usePersonnelCallUpload();
  const [preview, setPreview] = useState<Record<string, string | null> | null>(null);

  useEffect(() => {
    //
    return () => {
      setPreview((prev) => ({ ...prev, [name]: null }));
    };
  }, [name]);

  console.log(preview?.[name]);

  return (
    <Controller
      disabled={progress.isUploading}
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FileInput
          inputWrapperOrder={['label', 'input', 'description', 'error']}
          description={
            preview?.[name] ? (
              <RouterLink href={preview?.[name]} target="_blank">
                {preview?.[name]}
              </RouterLink>
            ) : undefined
          }
          disabled={progress.isUploading}
          {...other}
          {...field}
          onChange={async (e) => {
            if (e) {
              const result = await handleUpload(e);
              if (result) {
                const url = URL.createObjectURL(e);
                setPreview((prev) => ({ ...prev, [name]: url }));
                field.onChange(result.gsPath);
                return;
              }
            }
            field.onChange(e);
          }}
          error={error?.message}
          styles={{ root: { flex: 1 } }}
        />
      )}
    />
  );
}
