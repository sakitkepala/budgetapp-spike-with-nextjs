import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import { usePenyiarPerintah } from "./penyiar-perintah";

const listPerintah = ["masokk", "makan", "pergi"];

function prosesPerintah(input) {
  // Prosedur ideal:
  // 1. baca/terjemahkan input <- waktunya belajar regex wkwk
  // 2. cocokkan dengan perbendaharaan perintah yang dikenal
  // 3. eksekusi perintah
  // 4. outputkan hasil, bisa lempar error atau exception kalau gagal, pesan sukses kalau berhasil

  // Di bawah model proses yang disederhanakan:
  const output = listPerintah.includes(input)
    ? "✅ perintah berhasil dieksekusi"
    : "❌ gak ngerti perintahnya!";

  // Pilihan:
  // 1. side effect
  // 2. return pesan
  // 3. lempar error/exception
  console.info(`Perintah yang dikasih: "${input}" -> ${output}`);
  return output;
}

// TODO: refaktor ke komponen modalnya chakra
function PaletPerintah() {
  const { onOpen, onClose, isOpen: isTerbuka } = useDisclosure();
  const setIsTerbuka = () => onOpen();

  // Shortcut khusus komponen PaletPerintah
  useHotkeys("shift+p", () => setIsTerbuka(true));
  // legacy:
  // TODO: hapus ini karena sudah dihandle Modal chakra
  const tutupPaletnya = () => onClose();

  return (
    <Modal isOpen={isTerbuka} onClose={tutupPaletnya}>
      <ModalContent bg="transparent" shadow="search">
        <InputPerintah onTutup={tutupPaletnya} />
        <ModalBody>
          <Box role="listbox" h="300" bg="aquamarine" shadow="sm" mt="20">
            Ada list pilihan perintah nanti di sini...
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function InputPerintah(props) {
  const [inputPerintahnya, setInputPerintahnya] = React.useState("");
  const { onTutup: tutupPaletnya } = props;
  const { outputPerintah, setOutputPerintah } = usePenyiarPerintah();

  function onKetikPerintah(ev) {
    setInputPerintahnya(ev.target.value);

    // Side effect di komponen lain...
    // Mengosongkan teks & menutup diplay log pesan.
    // ! Logic ini baiknya di komponen itu sendiri, dan
    // komponen ini gak perlu aware dengan keadaan di sana.
    // Dispatcher yang di sini sudah tinggal eksekusi saja.
    // TODO: refaktor...
    if (outputPerintah) {
      setOutputPerintah("");
    }
  }

  function onSubmitPerintah(ev) {
    ev.preventDefault();
    if (!inputPerintahnya) {
      return;
    }

    const output = prosesPerintah(inputPerintahnya);
    setOutputPerintah(output);
    tutupPaletnya();
  }

  return (
    <div
      aria-label="Palet Perintah"
      className="kotak-palet-perintah"
      style={{
        position: "absolute",
        width: "300px",
        height: "50px",
        padding: "0.4em",
        backgroundColor: "gray",
        boxShadow: "2px 5px ",
      }}
    >
      <form onSubmit={onSubmitPerintah}>
        <label
          htmlFor="input-perintah"
          className="prompt"
          style={{ marginRight: 15 }}
        >
          Input Perintah
        </label>
        👉
        <input
          type="text"
          name="perintah"
          id="input-perintah"
          className="input-perintah"
          placeholder="ketik perintahnya..."
          value={inputPerintahnya}
          onChange={onKetikPerintah}
          style={{ padding: "0.6em" }}
        />
      </form>
    </div>
  );
}

export { PaletPerintah, InputPerintah };
