import * as React from "react";
import data from "../../lib/mock-data";
import {
  Box,
  Center,
  chakra,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { LayoutHalaman } from "../../components/layout/layout-halaman";
import { TabelBudget } from "../../components/table";

function DisplayBulan(props) {
  return (
    <Box
      className="display-bulan"
      textTransform="uppercase"
      fontSize="2xl"
      color="gray.300"
      {...props}
    >
      &larr; {props.children} &rarr;
    </Box>
  );
}

function DisplayBajet(props) {
  return (
    <Box
      p="12"
      mt="12"
      // bgColor="whiteAlpha.500"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="sm"
      // shadow="base"
      fontSize="4xl"
      fontWeight="bold"
      color="gray.500"
    >
      <chakra.span fontWeight="normal" color="gray.300">
        Rp
      </chakra.span>{" "}
      {props.children}
      <chakra.span fontWeight="normal" color="gray.300">
        ,00
      </chakra.span>
    </Box>
  );
}

export default function HalamanBudget() {
  const [budget] = React.useState(data.budget);
  const [kategori] = React.useState(data.kategoriPengeluaran);
  const [pengeluaran] = React.useState(data.pengeluaran);

  return (
    <LayoutHalaman>
      <Box>
        <Center flexDirection="column">
          <DisplayBulan mt="12">November</DisplayBulan>
          <DisplayBajet>{budget.data.nominal}</DisplayBajet>
        </Center>

        <Box
          display="flex"
          flexDirection="row-reverse"
          w="full"
          mt="72px"
          px="16"
        >
          <Box
            as="aside"
            className="info"
            w="40%"
            px="40px"
            py="12px"
            color="gray.500"
          >
            <Heading as="h2" size="md">
              {kategori.data[0].nama}
            </Heading>
            <Text mt="1em">{kategori.data[0].nama}</Text>

            <Table variant="simple" size="sm" colorScheme="gray" mt="1em">
              <Tbody>
                <Tr>
                  <Td>Dianggarkan</Td>
                  <Td isNumeric align="right">
                    Rp {kategori.data[0].nominal},00
                  </Td>
                </Tr>
                <Tr>
                  <Td>Dibelanjakan</Td>
                  <Td isNumeric align="right">
                    Rp {pengeluaran.data[0].biaya},00
                  </Td>
                </Tr>
                <Tr>
                  <Td>Tersisa</Td>
                  <Td isNumeric align="right">
                    Rp -50.000,00
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>

          <TabelBudget data={{ kategori, pengeluaran }} />
        </Box>
      </Box>
    </LayoutHalaman>
  );
}
