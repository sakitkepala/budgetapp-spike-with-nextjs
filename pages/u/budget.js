import * as React from "react";
import {
  Box,
  Center,
  chakra,
  Heading,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { LayoutHalaman } from "../../components/layout/layout-halaman";

const rows = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];

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
  return (
    <LayoutHalaman>
      <Box>
        <Center flexDirection="column">
          <DisplayBulan mt="12">November</DisplayBulan>
          <DisplayBajet>4.500.000</DisplayBajet>
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
              Info Bajet
            </Heading>
            <Text mt="1em">Deskripsi info bajet.</Text>

            <Table variant="simple" size="sm" colorScheme="gray" mt="1em">
              <Tbody>
                <Tr>
                  <Td>Dianggarkan</Td>
                  <Td isNumeric align="right">
                    Rp 500.000,00
                  </Td>
                </Tr>
                <Tr>
                  <Td>Dibelanjakan</Td>
                  <Td isNumeric align="right">
                    Rp 550.000,00
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

          <Box
            as="main"
            w="100%"
            p="4"
            borderRadius="md"
            shadow="base"
            bgColor="white"
          >
            <Table variant="simple" size="sm">
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th>Kategori Bajet</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Thead>
              <Tbody>
                {rows.map((rw) => (
                  <React.Fragment key="rw">
                    <Tr>
                      <Td>inches</Td>
                      <Td>millimetres (mm)</Td>
                      <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                      <Td>feet</Td>
                      <Td>centimetres (cm)</Td>
                      <Td isNumeric>30.48</Td>
                    </Tr>
                    <Tr>
                      <Td>yards</Td>
                      <Td>metres (m)</Td>
                      <Td isNumeric>0.91444</Td>
                    </Tr>
                  </React.Fragment>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>To convert</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Tfoot>
            </Table>
          </Box>
        </Box>
      </Box>
    </LayoutHalaman>
  );
}
