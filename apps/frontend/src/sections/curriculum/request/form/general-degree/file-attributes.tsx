import { ActionIcon, Button, FileInput, Group, Stack, Table, Text, TextInput } from '@mantine/core';
import Iconify from '@src/components/iconify';
import { RouterLink } from '@src/routes/components';
import { extractFileNameFromGCSUrl } from '@src/utils/file';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export function FileAttributes() {
  const { getValues, setValue } = useFormContext();
  const formValues = getValues();
  const [uploadedFiles, setUploadedFiles] = useState<(string | File)[]>([]);
  useEffect(() => {
    if (formValues?.general?.attributes) {
      setUploadedFiles(formValues?.general?.attributes);
    }
  }, [formValues?.general?.attributes]);

  const [customName, setCustomName] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ customName?: string; file?: string }>({});

  const getFileExtension = (filename: string) => {
    return filename.slice(filename.lastIndexOf('.'));
  };

  const createNewFileName = (customName: string, originalFile: File) => {
    const extension = getFileExtension(originalFile.name);
    return `${customName}${extension}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { customName?: string; file?: string } = {};
    if (!customName) newErrors.customName = 'กรุณากรอกชื่อไฟล์';
    if (!file) newErrors.file = 'กรุณาเลือกไฟล์';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (file) {
      const newFileName = createNewFileName(customName, file);
      const renamedFile = new File([file], newFileName, { type: file.type });

      uploadedFiles.push(renamedFile);

      setValue('general.attributes', uploadedFiles);

      setCustomName('');
      setFile(null);
      setErrors({});
    }
  };

  const removeUploadedFile = (value: string) => {
    const attributes: (string | File)[] = [];

    for (const attribute of uploadedFiles) {
      if (attribute instanceof File) {
        if (value !== attribute.name) {
          attributes.push(attribute);
        }
      } else {
        if (value !== attribute) {
          attributes.push(attribute);
        }
      }
    }

    setValue('general.attributes', attributes);
    setUploadedFiles(attributes);
  };

  const rows = uploadedFiles.map((file, i) =>
    file instanceof File ? (
      <tr key={i}>
        <td>{file.name}</td>
        <td>{(file.size / 1024).toFixed(2)} KB</td>
        <td>
          <ActionIcon onClick={() => removeUploadedFile(file.name)}>
            <Iconify icon={'mynaui:trash-solid'} />
          </ActionIcon>
        </td>
      </tr>
    ) : (
      <tr key={file}>
        <td>
          <Text component={RouterLink} href={file} target="_blank" underline color="indigo">
            {extractFileNameFromGCSUrl(file)}
          </Text>
        </td>
        <td> - </td>
        <td>
          <ActionIcon onClick={() => removeUploadedFile(file)}>
            <Iconify icon={'mynaui:trash-solid'} />
          </ActionIcon>
        </td>
      </tr>
    ),
  );

  return (
    <Stack>
      <Stack spacing="md">
        <TextInput
          disabled={uploadedFiles.length >= 3}
          label="รายการ"
          placeholder="กรอกชื่อไฟล์"
          value={customName}
          onChange={(e) => setCustomName(e.currentTarget.value)}
          error={errors.customName}
        />

        <FileInput
          disabled={uploadedFiles.length >= 3}
          label="เลือกไฟล์"
          value={file}
          onChange={setFile}
          error={errors.file}
        />

        <Group>
          <Button disabled={uploadedFiles.length >= 3} type="button" color="blue" onClick={handleSubmit}>
            เพิ่มไฟล์
          </Button>
        </Group>
      </Stack>

      {uploadedFiles.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th>รายการ (สูงสุด 3)</th>
              <th>ขนาด</th>
              <th style={{ width: 20 }}></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      )}
    </Stack>
  );
}
