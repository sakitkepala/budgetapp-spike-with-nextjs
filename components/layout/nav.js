import NextLink from "next/link";
import { Box, Center, Flex, Link as ChakraLink } from "@chakra-ui/layout";
import {
  SettingsIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";

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

function NavBar() {
  return (
    <Center
      as="header"
      justifyContent="space-between"
      h="14"
      px="16"
      color="gray.400"
    >
      <Flex className="logo">
        <Link href="/u/dashboard">
          <TriangleDownIcon />
          <TriangleUpIcon />
        </Link>
      </Flex>
      <NavMenu />

      <Box className="menu">
        <Link>
          <SettingsIcon /> &darr;
        </Link>
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
      fontSize="sm"
      textTransform="uppercase"
      color="gray.400"
      {...props}
    >
      {linkNavigasi.map(({ href, teks }, i) => (
        <Link key={href} href={href} mx="4">
          {teks} &rarr;
        </Link>
      ))}
    </Flex>
  );
}

export { NavBar, NavMenu };
