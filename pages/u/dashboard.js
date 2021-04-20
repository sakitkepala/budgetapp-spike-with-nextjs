import { Box } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { LayoutHalaman } from "../../components/layout/layout-halaman";

export default function HalamanDasbor() {
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
            <chakra.h1>Dasbor</chakra.h1>
          </Box>
        </Box>
      </Box>
    </LayoutHalaman>
  );
}
