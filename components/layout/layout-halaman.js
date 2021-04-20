import { Box, Center } from "@chakra-ui/layout";
import { NavBar, NavMenu } from "./nav";

function LayoutHalaman(props) {
  return (
    <Box className="screen" bgColor="gray.100" minH="100vh">
      <NavBar />

      {/* Page */}
      {props.children}

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

export { LayoutHalaman };
