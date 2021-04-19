import {
  Box,
  Center,
  chakra,
  Container,
  Flex,
  Heading,
  Link,
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
import * as React from "react";

const rows = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];

export default function HalamanBudget() {
  return (
    <Box className="screen" bgColor="gray.100" h="100%">
      <Center
        as="header"
        justifyContent="space-between"
        h="14"
        px="16"
        borderWidth="1px"
        borderColor="gray.200"
        color="gray.400"
      >
        <Box className="logo">
          <Link>WKWK</Link>
        </Box>
        <Box className="menu">
          <Link>pengaturan &darr;</Link>
        </Box>
      </Center>

      <Box pos="relative">
        <Flex
          pos="absolute"
          top="12"
          left="16"
          flexDir="column"
          // pr="6"
          fontSize="sm"
          textTransform="uppercase"
          color="gray.400"
          // borderRightWidth="1px"
          // borderRightColor="gray.200"
        >
          <Link>&rarr; Bajet</Link>
          <Link mt="1">&rarr; Pengeluaran</Link>
          <Link mt="1">&rarr; Biaya</Link>
          <Link mt="1">&rarr; Akun</Link>
        </Flex>
        <Center flexDirection="column">
          <Box
            className="display-bulan"
            mt="12"
            textTransform="uppercase"
            fontSize="2xl"
            color="gray.300"
          >
            &larr; November &rarr;
          </Box>

          <Box
            // mt="48px"
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
            4.500.000
            <chakra.span fontWeight="normal" color="gray.300">
              ,00
            </chakra.span>
          </Box>
        </Center>

        <Box
          as="main"
          display="flex"
          flexDirection="row-reverse"
          w="full"
          mt="72px"
          px="16"
        >
          <Box className="info" w="40%" px="40px" py="12px" color="gray.500">
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

          <Box w="100%" p="4" borderRadius="md" shadow="base" bgColor="white">
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

      {/* Footer */}
      <Box p="40px" color="gray.500">
        <Center>
          2021 &copy;&nbsp;
          <a href="https://dev.sakitkepala.dev">sakitkepala.dev</a>
        </Center>
      </Box>
    </Box>
  );
}
