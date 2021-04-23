import * as React from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { LayoutHalaman } from "../../components/layout/layout-halaman";
import { ManajemenBudget } from "../../components/screens/budget-management";

export default function HalamanBudget() {
  const [listAkun] = React.useState(null);

  return (
    <LayoutHalaman>
      {listAkun ? (
        <ManajemenBudget />
      ) : (
        <Flex flexDirection="column" alignItems="center" pt="24">
          <Text w="600px" color="gray.500">
            Hai! Kamu butuh akun dulu, nih, yang menyediakan dana sebelum bisa
            budgeting. Akun bisa kamu tambahkan lewat form di bawah.
          </Text>

          <Box
            w="600px"
            mt="12"
            p="12"
            pt="8"
            rounded="md"
            shadow="base"
            bgColor="white"
          >
            Jenis akun: "Bank" | "Tunai"
          </Box>
        </Flex>
      )}
    </LayoutHalaman>
  );
}
