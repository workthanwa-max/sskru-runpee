'use client';

import { Button, FileButton, Group, Text } from '@mantine/core';
import { RouterLink } from '@src/routes/components';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  name: string;
  label: string;
};

export default function RHFFilesUploadButton({ name, label, ...other }: Props) {
  const { control } = useFormContext();
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);

  useEffect(() => {
    return () => {
      // Cleanup URLs when component unmounts
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
      setPreviews([]);
    };
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Group spacing={'xs'}>
          <FileButton
            {...other}
            multiple
            onChange={(files) => {
              field.onChange(files);
              const newPreviews = files.map((file) => ({
                file,
                url: URL.createObjectURL(file),
              }));
              setPreviews(newPreviews);
            }}
          >
            {(props) => (
              <Button size="xs" w={120} color="blue" variant="outline" {...props}>
                {label}
              </Button>
            )}
          </FileButton>

          <Group spacing={'xs'}>
            {previews.map((preview) => (
              <Text
                key={preview.file.name}
                size="sm"
                underline
                component={RouterLink}
                href={preview.url}
                target="_blank"
              >
                {preview.file.name.slice(-10)}
              </Text>
            ))}
          </Group>
        </Group>
      )}
    />
  );
}
