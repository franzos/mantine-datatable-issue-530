import { useEffect, useState } from 'react';
import { Form } from '@/lib/models';
import { DataTable } from 'mantine-datatable';

export interface FormsTableProps {
  pagination: {
    total: number;
    initial: number;
    perPage: number;
  };
  onChange: (from: number, to: number) => Promise<Form[]>;
}

export function FormsTable(props: FormsTableProps) {
  const [isBusy, setIsBusy] = useState(false);
  const [records, setRecords] = useState<Form[] | []>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const doIt = async () => {
      setIsBusy(true);
      const from = (page - 1) * props.pagination.perPage;
      const to = from + props.pagination.perPage;
      try {
        const records = await props.onChange(from, to);
        setRecords(records);
      } catch (e) {
        console.error(e);
      } finally {
        setIsBusy(false);
      }
    };
    doIt();
  }, [page]);

  const columns = [
    {
      accessor: 'title',
      title: 'Form Name',
    },
    {
      accessor: 'created_at',
      title: 'Created At',
      render: (row: Form) => row.created_at.toLocaleDateString(),
    },
    {
      accessor: 'updated_at',
      title: 'Updated At',
      render: (row: Form) => row.updated_at.toLocaleDateString(),
    },
  ];

  return (
    <>
      <DataTable
        height={300}
        withTableBorder
        records={records}
        columns={columns}
        totalRecords={props.pagination.total}
        recordsPerPage={props.pagination.perPage}
        page={page}
        onPageChange={(p) => setPage(p)}
        fetching={isBusy}
        loadingText="Loading..."
      />
    </>
  );
}
