import * as React from "react";
import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { LayoutHalaman } from "../../components/layout/layout-halaman";
import { ManajemenBudget } from "../../components/screens/budget-management";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";

export default function HalamanBudget() {
  const [listAkun] = React.useState(null);

  const [jenisAkun, setJenisAkun] = React.useState(null);
  const [namaAkun, setNamaAkun] = React.useState("");
  const [namaBankTerakhir, setBankTerakhir] = React.useState("");

  return (
    <LayoutHalaman>
      {listAkun ? (
        <ManajemenBudget />
      ) : (
        <Flex flexDirection="column" alignItems="center" pt="24">
          <Text w="600px" color="gray.500">
            Hai! Kamu butuh akun dulu, nih, yang menyediakan dana sebelum bisa
            budgeting. Kamu bisa tambahkan akun lewat form di bawah.
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
            <form>
              <FormControl as="fieldset" isRequired>
                <RadioGroup
                  id="akun-jenis"
                  name="akun-jenis"
                  value={jenisAkun}
                  onChange={(val) => {
                    setJenisAkun(val);
                    if (val === "tunai") {
                      setNamaAkun("Tunai");
                    } else {
                      setNamaAkun(namaBankTerakhir);
                    }
                  }}
                >
                  <Stack direction="row">
                    <Radio value="bank">Bank</Radio>
                    <Radio value="tunai">Tunai</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl as="fieldset">
                <Input
                  id="akun-nama"
                  name="akun-nama"
                  isDisabled={jenisAkun === "tunai"}
                  variant={jenisAkun === "tunai" ? "filled" : "outline"}
                  value={namaAkun}
                  onChange={(ev) => {
                    setNamaAkun(ev.target.value);
                    if (jenisAkun === "bank") {
                      setBankTerakhir(ev.target.value);
                    }
                  }}
                  placeholder="misal... Jenius"
                />
              </FormControl>

              <FormControl as="fieldset">
                <Input id="akun-dana" name="akun-dana" placeholder="Rp ..." />
              </FormControl>
            </form>
          </Box>
        </Flex>
      )}
    </LayoutHalaman>
  );
}
