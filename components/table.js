import * as React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, chakra, Box } from "@chakra-ui/react";
import { useTable, useGroupBy, useExpanded, useRowSelect } from "react-table";
import { ChevronDownIcon, ChevronRightIcon, SunIcon } from "@chakra-ui/icons";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

function KomponenTable({ data }) {
  const { kategori, pengeluaran } = data;

  const columns = React.useMemo(
    () => [
      {
        id: "expander",
        // Pakai ini buat kasih tombol "expand all":
        Header: ({ getToggleAllRowsExpandedProps }) => (
          <chakra.span {...getToggleAllRowsExpandedProps()}>
            <SunIcon />
          </chakra.span>
        ),
        Cell: ({ row }) =>
          row.canExpand && (
            <chakra.span {...row.getToggleRowExpandedProps()}>
              {row.isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </chakra.span>
          ),
      },
      {
        Header: "Kategori",
        accessor: "pengeluaran",
      },
      {
        Header: "Dianggarkan",
        accessor: "dianggarkan",
        isNumeric: true,
      },
      {
        Header: "Aktivitas",
        accessor: "aktivitas",
        isNumeric: true,
      },
      {
        Header: "Dana Siap",
        accessor: "available",
        isNumeric: true,
      },
    ],
    []
  );

  const dataTabel = React.useMemo(
    () => [
      {
        pengeluaran: "Makan",
        dianggarkan: 500000,
        aktivitas: 50000,
        available: 450000,
        subRows: [
          {
            pengeluaran: "Matengan di warung",
            dianggarkan: 300000,
            aktivitas: 50000,
            available: 250000,
          },
          {
            pengeluaran: "Stok makanan",
            dianggarkan: 200000,
            aktivitas: 0,
            available: 0,
          },
        ],
      },
      {
        pengeluaran: "Transport",
        dianggarkan: 100000,
        aktivitas: 22000,
        available: 78000,
        subRows: [
          {
            pengeluaran: "Bensin Pertalite",
            dianggarkan: 100000,
            aktivitas: 22000,
            available: 78000,
          },
        ],
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { data: dataTabel, columns },
    useGroupBy,
    useExpanded,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "seleksi",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((th) => (
              <Th {...th.getHeaderProps()} isNumeric={th.isNumeric}>
                {th.render("Header")}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>

      <Tbody {...getTableBodyProps()}>
        {rows.map((tr) => {
          prepareRow(tr);
          return (
            <Tr {...tr.getRowProps()}>
              {tr.cells.map((td) => (
                <Td {...td.getCellProps()} isNumeric={td.column.isNumeric}>
                  {td.render("Cell")}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

function TabelBudget({ data }) {
  return (
    <Box
      as="main"
      w="100%"
      pt="4"
      pb="12"
      borderRadius="md"
      shadow="base"
      bgColor="white"
    >
      <KomponenTable data={data} />
    </Box>
  );
}

export { TabelBudget };
