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

const listPerintah = [
  {
    nama: "bajet tambah",
    deskripsi: `Bajet: Menambahkan dana ke Bajet [bajet tambah]`,
  },
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

function InputPerintah({
  onDitutup,
  isTerbuka,
  queryPerintahnya,
  indexPilihan,
  onEksekusi,
}) {
  const { indexAktif, setIndexAktif, indexTerakhir } = indexPilihan;
  const [querynya, setQuerynya] = queryPerintahnya;

  React.useEffect(() => {
    // Waktu awal buka Palet, input suka sudah ada teksnya
    // terutama teks dari eksekusi shortcut malah ikut terketik
    // sekaligus untuk antisipasi teks query dari sesi sebelumnya.
    if (isTerbuka && querynya.length > 0) {
      setQuerynya("");
    }
    if (isTerbuka) {
      setIndexAktif(0);
    }
  }, [isTerbuka]);

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
  // const [querynya] = stateQuerynya;

  // Shortcut khusus komponen PaletPerintah
  useEventListener("keydown", (ev) => {
    if (ev?.key?.toLowerCase() === "p" && ev["shiftKey"]) {
      ev.preventDefault();
      onOpen();
    }
  });

  // const bukaDaftarnya = querynya.length > 0;
  const indexTerakhir = listPerintah.length - 1;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalContent bg="transparent" shadow="search">
        <InputPerintah
          onDitutup={onClose}
          isTerbuka={isOpen}
          queryPerintahnya={[querynya, setQuerynya]}
          indexPilihan={{ indexAktif, setIndexAktif, indexTerakhir }}
          onEksekusi={() => {
            setOutputPerintah(listPerintah[indexAktif].deskripsi);
          }}
        />
        <ModalBody>
          <Box role="listbox" h="300" bg="aquamarine" shadow="sm" mt="20">
            Ada list pilihan perintah nanti di sini:
            {listPerintah.map((perintah, index) => (
              <Box
                aria-selected={index === indexAktif ? true : undefined}
                _selected={{ bgColor: "whiteAlpha.600" }}
                key={perintah.nama}
              >
                {perintah.deskripsi}
              </Box>
            ))}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export { PaletPerintah };
