import * as React from "react";
import listPerintah from "./list-perintah";
import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
  useEventListener,
} from "@chakra-ui/react";
import { KotakInputPalet } from "./palet-input";

function PaletPerintah({ prompt, sedangQuery, registerPerintah }) {
  const { onOpen, onClose, isOpen } = useDisclosure();

  // ... TODO: state Query cari perintah // const [querynya, setQuerynya] = React.useState("");
  const [indexDipilih, setIndexDipilih] = React.useState(0);

  const indexMax = listPerintah.length - 1;

  useEventListener("keydown", (ev) => {
    if (ev?.key?.toLowerCase() === "p" && ev["shiftKey"]) {
      // TODO: refaktor?
      if (sedangQuery) {
        ev.preventDefault();
        onOpen();
      }
    }
  });

  React.useEffect(() => {
    if (isOpen && indexDipilih !== 0) {
      setIndexDipilih(0);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onEsc={() => prompt.cleanupPrompt()}
      size="xl"
    >
      <ModalContent bg="transparent" shadow="search">
        <KotakInputPalet
          label="Jalankan perintah..."
          onKeyDown={(ev) => {
            // ←↑→↓
            if (ev.key === "ArrowDown") {
              // ↑
              const indexNaik =
                indexDipilih < indexMax ? indexDipilih + 1 : indexMax;
              setIndexDipilih(indexNaik);
            } else if (ev.key === "ArrowUp") {
              // ↓
              const indexTurun = indexDipilih > 0 ? indexDipilih - 1 : 0;
              setIndexDipilih(indexTurun);
            } else if (ev.key === "Enter") {
              // Kasitau komponen parent, perintah ini yang dipilih/akan dieksekusi
              registerPerintah(listPerintah[indexDipilih]);
              onClose();
            }
          }}
        />
        <ModalBody>
          <Box role="listbox" h="300" bg="aquamarine" shadow="sm" mt="20">
            Ada list pilihan perintah nanti di sini:
            {listPerintah.map((item, index) => {
              const isSelected = index === indexDipilih ? true : undefined;
              return (
                <Box
                  aria-selected={isSelected}
                  _selected={{ bgColor: "whiteAlpha.600" }}
                  key={item.perintah.toString()}
                >
                  {item.deskripsi}
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
