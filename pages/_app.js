import { ChakraProvider } from "@chakra-ui/react";
// TODO: custom theme basis chakra ui
// ref: https://chakra-ui.com/docs/getting-started#add-custom-theme-optional

// TODO: styling komponen individual, yang dipakai aja
// ref: https://chakra-ui.com/docs/theming/component-style

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />;
    </ChakraProvider>
  );
}

export default MyApp;
