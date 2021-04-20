import { Box } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { LayoutHalaman } from "../../components/layout/layout-halaman";

export default function HalamanPengeluaran() {
  return (
    <LayoutHalaman>
      <Box>
        <Box
          //   display="flex"
          //   flexDirection="row-reverse"
          w="full"
          mt="72px"
          px="16"
        >
          <Box as="main">
            <chakra.h1>Akun</chakra.h1>
            <Box as="ul">
              <Box as="li">Jenius</Box>
              <Box as="li">BCA</Box>
              <Box as="li">Tunai</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </LayoutHalaman>
  );
}
