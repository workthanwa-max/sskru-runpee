import { ActionIcon } from '@mantine/core';
import { omit } from 'lodash';
import * as XLSX from 'xlsx';
import Iconify from '../iconify';

interface ExportButtonProps {
  data: any[];
  fileName: string;
}

export default function ExportButton({ data, fileName }: ExportButtonProps) {
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.map((d) => omit(d, '__typename')));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <ActionIcon onClick={handleExport}>
      <Iconify icon={'material-symbols:download'} width={24} />
    </ActionIcon>
  );
}
