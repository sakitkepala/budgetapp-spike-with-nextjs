import { Box } from "@chakra-ui/layout";
import { NavBar } from "./nav";

function LayoutHalaman(props) {
  return (
    <Box className="screen" bgColor="gray.100" h="100%">
      <NavBar />

      {props.children}
    </Box>
  );
}

export { LayoutHalaman };
