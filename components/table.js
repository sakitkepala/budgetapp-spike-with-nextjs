import * as React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { useTable, useGroupBy, useExpanded } from "react-table";
import { ChevronDownIcon, ChevronRightIcon, SunIcon } from "@chakra-ui/icons";

function TablePakaiGrup({ data }) {
  const { kategori, pengeluaran } = data;

  const columns = React.useMemo(
    () => [
      {
        id: "expander",
        Header: ({ getToggleAllRowsExpandedProps }) => (
          <chakra.span
            {...getToggleAllRowsExpandedProps({ style: { width: "10px" } })}
          >
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
        Header: "Biaya",
        accessor: "biaya",
        isNumeric: true,
      },
    ],
    []
  );

  const dataTabel = React.useMemo(() => {
    return kategori.data.map((kateg) => ({
      pengeluaran: kateg.nama,
      dianggarkan: kateg.nominal,
      subRows: pengeluaran.data.map((exp) => ({
        pengeluaran: exp.nama,
        biaya: exp.biaya,
      })),
    }));
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ data: dataTabel, columns }, useGroupBy, useExpanded);

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps()} isNumeric={column.isNumeric}>
                {column.render("Header")}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                  {cell.render("Cell")}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

export { TablePakaiGrup };
