import * as React from "react";
import { Modal, ModalContent, useDisclosure } from "@chakra-ui/react";
import { KotakInputPalet } from "./palet-input";

function PromptDialog({ prompt, sedangDialog, registerInput }) {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const [inputan, setInputan] = React.useState("");

  React.useEffect(() => {
    if (sedangDialog) {
      onOpen();
    }
  }, [sedangDialog]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        prompt.cleanupPrompt();
        onClose();
      }}
      onEsc={() => prompt.cleanupPrompt()}
      size="xl"
    >
      <ModalContent bg="transparent" shadow="search">
        <KotakInputPalet
          label="Step... (contoh: masukkan bajet yang ingin dipakai...)"
          value={inputan}
          onChange={(ev) => setInputan(ev.target.value)}
          onKeyDown={(ev) => {
            // ←↑→↓
            if (ev.key === "Enter") {
              // ...kasih tau parent ada inputan untuk prompt
              registerInput(ev.target.value);

              // ...selesaikan sesi prompt
              setInputan("");
              onClose();
            }
          }}
        />
      </ModalContent>
    </Modal>
  );
}

export { PromptDialog };
