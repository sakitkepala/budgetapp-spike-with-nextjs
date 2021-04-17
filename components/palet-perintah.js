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
import { usePenyiarPerintah } from "./penyiar-perintah";

// TODO: dibuat modul sendiri, idealnya dari API... atau seakan-akan dari API
const listPerintah = [
  {
    nama: "bajet tambah",
    deskripsi: `Bajet: Menambahkan dana ke Bajet [bajet tambah]`,
  },
  { nama: "masokk", deskripsi: "Suatu perintah untuk... masokk!" },
  { nama: "makan", deskripsi: "Suatu perintah untuk... makan" },
  { nama: "pergi", deskripsi: "Suatu perintah untuk... pergi" },
];

function InputPerintah({
  modal,
  queryPerintahnya,
  indexPilihan,
  onChange,
  onEksekusi,
}) {
  const { indexAktif, setIndexAktif, indexTerakhir } = indexPilihan;
  const [querynya, setQuerynya] = queryPerintahnya;

  React.useEffect(() => {
    // Paksa teks input dikosongkan ketika modal Palet Perintah dibuka,
    // sekaligus mereset teks query dari sesi sebelumnya.
    if (modal.isOpen && querynya.length > 0) {
      setQuerynya("");
    }
    // Index awal direset ketika Palet dibuka.
    if (modal.isOpen) {
      setIndexAktif(0);
    }
  }, [modal.isOpen]);

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
            onChange?.();
            setQuerynya(ev.target.value);
          }}
          onKeyDown={(ev) => {
            // ←↑→↓
            if (ev.key === "ArrowDown") {
              const indexTerbaru =
                indexAktif < indexTerakhir ? indexAktif + 1 : indexTerakhir;
              setIndexAktif(indexTerbaru);
            } else if (ev.key === "ArrowUp") {
              const indexTerbaru = indexAktif > 0 ? indexAktif - 1 : 0;
              setIndexAktif(indexTerbaru);
            } else if (ev.key === "Enter") {
              onEksekusi();
              modal.onClose();
            }
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
  const { setOutputPerintah } = usePenyiarPerintah();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [querynya, setQuerynya] = React.useState("");
  const [indexAktif, setIndexAktif] = React.useState(0);

  // Shortcut khusus komponen PaletPerintah
  useEventListener("keydown", (ev) => {
    if (ev?.key?.toLowerCase() === "p" && ev["shiftKey"]) {
      ev.preventDefault();
      onOpen();
    }
  });

  const indexTerakhir = listPerintah.length - 1;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalContent bg="transparent" shadow="search">
        <InputPerintah
          modal={{ onClose, isOpen }}
          queryPerintahnya={[querynya, setQuerynya]}
          indexPilihan={{ indexAktif, setIndexAktif, indexTerakhir }}
          onChange={() => setOutputPerintah("")}
          onEksekusi={() => {
            setOutputPerintah(listPerintah[indexAktif].deskripsi);
          }}
        />
        <ModalBody>
          <Box role="listbox" h="300" bg="aquamarine" shadow="sm" mt="20">
            Ada list pilihan perintah nanti di sini:
            {listPerintah.map((perintah, index) => {
              const isSelected = index === indexAktif ? true : undefined;
              return (
                <Box
                  aria-selected={isSelected}
                  _selected={{ bgColor: "whiteAlpha.600" }}
                  key={perintah.nama}
                >
                  {perintah.deskripsi}
                </Box>
              );
            })}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export { PaletPerintah };
