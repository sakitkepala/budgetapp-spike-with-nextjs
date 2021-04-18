import * as React from "react";
import { Center, chakra, Flex } from "@chakra-ui/react";

function KotakInputPalet({
  label = "Step... (contoh: masukkan bajet yang ingin dipakai...)",
  inputName = "perintah",
  placeholder = "...",
  ...props
}) {
  return (
    <Flex
      aria-label="Kotak Input Palet Perintah"
      className="kotak-input-palet-perintah"
      flexDir="column"
      justifyContent="space-between"
      w="100%"
      p="1.5"
      bg="gray"
      boxShadow="4px 5px"
    >
      <chakra.label htmlFor="input-palet-perintah" color="white">
        {label}
      </chakra.label>
      <Flex bg="darkgray" pos="relative" flexDir="row-reverse">
        <chakra.input
          type="text"
          name={inputName}
          id="input-palet-perintah"
          className="input-palet-perintah"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          placeholder={placeholder}
          color="aquamarine"
          outline="0"
          w="92%"
          p="2.5"
          bg="transparent"
          {...props}
        />
        <Center className="prompt" pos="absolute" left="0" w="50px" h="50px">
          👉
        </Center>
      </Flex>
    </Flex>
  );
}

export { KotakInputPalet };
