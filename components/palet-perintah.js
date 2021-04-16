import * as React from "react";
import {
  Box,
  Center,
  chakra,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
  useEventListener,
} from "@chakra-ui/react";
// import { usePenyiarPerintah } from "./penyiar-perintah";

const listPerintah = [
  { nama: "masokk", deskripsi: "Suatu perintah untuk... masokk!" },
  { nama: "makan", deskripsi: "Suatu perintah untuk... makan" },
  { nama: "pergi", deskripsi: "Suatu perintah untuk... pergi" },
];

function prosesPerintah(input) {
  // Prosedur ideal:
  // 1. baca/terjemahkan input <- waktunya belajar regex wkwk
  // 2. cocokkan dengan perbendaharaan perintah yang dikenal
  // 3. eksekusi perintah
  // 4. outputkan hasil, bisa lempar error atau exception kalau gagal, pesan sukses kalau berhasil

  // Di bawah model proses yang disederhanakan:
  const output = listPerintah.map((item) => item.nama).includes(input)
    ? "✅ perintah berhasil dieksekusi"
    : "❌ gak ngerti perintahnya!";

  // Pilihan:
  // 1. side effect
  // 2. return pesan
  // 3. lempar error/exception
  console.info(`Perintah yang dikasih: "${input}" -> ${output}`);
  return output;
}

function InputPerintah({ onDitutup, isTerbuka, queryPerintahnya }) {
  const [querynya, setQuerynya] = queryPerintahnya;

  // React.useEffect(() => {
  //   // Waktu awal buka Palet, input suka sudah ada teksnya
  //   // terutama teks dari eksekusi shortcut malah ikut terketik
  //   // sekaligus untuk antisipasi teks query dari sesi sebelumnya.
  //   if (isTerbuka && querynya.length > 0) {
  //     setQuerynya("");
  //   }
  // }, [isTerbuka]);

  return (
    <Flex
      aria-label="Palet Perintah"
      className="kotak-palet-perintah"
      flexDir="column"
      w="100%"
      bg="gray"
      p="1.5"
      justifyContent="space-between"
      boxShadow="lg"
      sx={{ boxShadow: "4px 5px " }}
    >
      <chakra.label htmlFor="input-perintah" color="white">
        Input Perintah
      </chakra.label>
      <Flex bg="darkgray" pos="relative" flexDir="row-reverse">
        <chakra.input
          type="text"
          name="perintah"
          id="input-perintah"
          className="input-perintah"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          placeholder="ketik perintahnya..."
          value={querynya}
          onChange={(ev) => {
            setQuerynya(ev.target.value);
          }}
          color="aquamarine"
          outline="0"
          w="92%"
          p="2.5"
          bg="transparent"
        />
        <Center className="prompt" pos="absolute" left="0" w="50px" h="50px">
          👉
        </Center>
      </Flex>
    </Flex>
  );
}

function PaletPerintah() {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const stateQuerynya = React.useState("");
  const [querynya] = stateQuerynya;

  // Shortcut khusus komponen PaletPerintah
  useEventListener("keydown", (ev) => {
    if (ev?.key?.toLowerCase() === "p" && ev["shiftKey"]) {
      ev.preventDefault();
      onOpen();
    }
  });

  const bukaDaftarnya = querynya.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalContent bg="transparent" shadow="search">
        <InputPerintah
          onDitutup={onClose}
          isTerbuka={isOpen}
          queryPerintahnya={stateQuerynya}
        />
        <ModalBody>
          {bukaDaftarnya && (
            <Box role="listbox" h="300" bg="aquamarine" shadow="sm" mt="20">
              Ada list pilihan perintah nanti di sini...
              <Box as="ul">
                {listPerintah.map((perintah) => (
                  <Box as="li" key={perintah.nama}>
                    {perintah.deskripsi}
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export { PaletPerintah };
