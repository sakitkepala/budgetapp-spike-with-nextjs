import NextLink from "next/link";
import { Box, Center, Flex, Link as ChakraLink } from "@chakra-ui/layout";

function Link({ href, children, ...props }) {
  if (!href) {
    return <ChakraLink {...props}>{children}</ChakraLink>;
  }
  return (
    <NextLink href={href}>
      <ChakraLink {...props}>{children}</ChakraLink>
    </NextLink>
  );
}

function NavBar(props) {
  const borderBawah = !props.borderBawah
    ? {}
    : {
        borderWidth: "1px",
        borderColor: "gray.200",
      };

  return (
    <Center
      as="header"
      justifyContent="space-between"
      h="14"
      px="16"
      color="gray.400"
      {...borderBawah}
    >
      <Box className="logo">
        <Link href="/u/dashboard">WKWK</Link>
      </Box>
      <Box className="menu">
        <Link>pengaturan &darr;</Link>
      </Box>
    </Center>
  );
}

const linkNavigasi = [
  {
    href: "/u/budget",
    teks: "Bajet",
  },
  {
    href: "/u/dlsb",
    teks: "Dan lain sebagainya...",
  },
];

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
      {...props}
    >
      {linkNavigasi.map(({ href, teks }, i) => {
        const mt = i > 0 ? { mt: 1 } : {};
        return (
          <Link {...mt} href={href}>
            &rarr; {teks}
          </Link>
        );
      })}
    </Flex>
  );
}

export { NavBar, NavMenu };
