interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}
export interface GenericTableProps<T> {
  data: T[];
  columns: Column<T>[];
  download?: boolean;
  actions?: (row: T) => React.ReactNode;
  pagination?: {
    activePage: number;
    total: number;
    onPageChange: (page: number) => void;
  };
}
