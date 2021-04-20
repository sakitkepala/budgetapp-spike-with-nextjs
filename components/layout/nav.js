import { Box, Center, Flex, Link } from "@chakra-ui/layout";

function NavBar() {
  return (
    <Center
      as="header"
      justifyContent="space-between"
      h="14"
      px="16"
      // borderWidth="1px"
      // borderColor="gray.200"
      color="gray.400"
    >
      <Box className="logo">
        <Link>WKWK</Link>
      </Box>
      <Box className="menu">
        <Link>pengaturan &darr;</Link>
      </Box>
    </Center>
  );
}

function NavMenu(props) {
  return (
    <Flex
      className="nav-menu-list"
      top="12"
      left="16"
      flexDir="column"
      // pr="6"
      fontSize="sm"
      textTransform="uppercase"
      color="gray.400"
      // borderRightWidth="1px"
      // borderRightColor="gray.200"
      {...props}
    >
      <Link>&rarr; Bajet</Link>
      <Link mt="1">&rarr; Pengeluaran</Link>
      <Link mt="1">&rarr; Biaya</Link>
      <Link mt="1">&rarr; Akun</Link>
    </Flex>
  );
}

export { NavBar, NavMenu };
