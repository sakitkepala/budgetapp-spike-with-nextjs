import * as React from "react";
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
  const [budget, setBudget] = React.useState(null);
  console.log("budget", budget);

  React.useEffect(() => {
    if (Boolean(budget)) {
      return;
    }

    try {
      // `fetch` returns Promise
      const resBudget = fetch("/budget").then(async (respon) => {
        const data = await respon.json();
        if (respon.ok) {
          return data;
        } else {
          return Promise.reject({ message: "tidak ok" });
        }
      });
      resBudget.then((res) => {
        setBudget(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <LayoutHalaman>
      <Box>
        <Center flexDirection="column">
          <DisplayBulan mt="12">November</DisplayBulan>
          <DisplayBajet>{!budget ? null : budget.dianggarkan}</DisplayBajet>
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
              {!budget ? "" : budget[0].kategori}
            </Heading>
            <Text mt="1em">{!budget ? "" : budget[0].kategori}</Text>

            <Table variant="simple" size="sm" colorScheme="gray" mt="1em">
              <Tbody>
                <Tr>
                  <Td>Dianggarkan</Td>
                  <Td isNumeric align="right">
                    Rp {!budget ? 0 : budget[0].dianggarkan},00
                  </Td>
                </Tr>
                <Tr>
                  <Td>Dibelanjakan</Td>
                  <Td isNumeric align="right">
                    Rp {!budget ? 0 : budget[0].terpakai},00
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

          {!budget ? "Loading..." : <TabelBudget data={budget} />}
        </Box>
      </Box>
    </LayoutHalaman>
  );
}
