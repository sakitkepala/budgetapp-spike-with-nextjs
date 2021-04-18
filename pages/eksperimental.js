import * as React from "react";
import { Box, Kbd, Modal, ModalContent, useDisclosure } from "@chakra-ui/react";
import { PaletPerintah } from "../components/eksperimental/palet-perintah";
import { KotakInputPalet } from "../components/eksperimental/palet-input";

function PromptDialog({ prompt, sedangDialog, registerInput }) {
  const { onOpen, onClose, isOpen } = useDisclosure();

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
          onKeyDown={(ev) => {
            // ←↑→↓
            if (ev.key === "Enter") {
              // ...kasih tau parent ada inputan untuk prompt
              registerInput(ev.target.value);

              // close... tapi jangan clean up dulu kalau masih ada step selanjutnya
              // sementara sebelum atas jadi
              // prompt.cleanupPrompt(); // ! <-- BAHAYA! HAPUS KALAU SUDAH SELESAI!
              onClose();
            }
          }}
        />
      </ModalContent>
    </Modal>
  );
}

function PromptInteraktif() {
  const [perintah, setPerintah] = React.useState(null);
  const [situasi, setSituasi] = React.useState("query");
  const [indexStep, setIndexStep] = React.useState(0);
  const [stepSaatIni, setStepSaatIni] = React.useState(null);

  const sedangQuery = situasi === "query";
  const sedangDialog = situasi === "dialog";
  const sedangMemproses = situasi === "memproses";
  // const step = !perintah ? null : perintah.step[indexStep];

  console.log(situasi);
  React.useEffect(() => {
    if (!perintah) {
      console.log("idle: skip perintah");
      return;
    }

    if (!(indexStep < perintah.step.length)) {
      console.log("selesai: gak ada sisa step lagi.");
      return;
    }

    console.log("eksekusi perintah", `\`${perintah.perintah}\``);
    console.log("length", perintah.step.length);
    setSituasi("dialog");
  }, [perintah, indexStep]);

  React.useEffect(() => {
    if (!perintah || indexStep >= perintah.step.length) {
      return;
    }

    console.log("eksekusi step", `\`${perintah.step[indexStep].deskripsi}\``);
    // console.log(perintah.step[indexStep]);
    setSituasi("dialog");
  }, [indexStep]);

  const cleanupPrompt = () => {
    setPerintah(null);
    setSituasi("query");
    // setStep(null);
  };

  return (
    <div>
      <PaletPerintah
        prompt={{ cleanupPrompt }}
        sedangQuery={sedangQuery}
        registerPerintah={(perintah) => setPerintah(perintah)}
      />
      <PromptDialog
        prompt={{ cleanupPrompt }}
        sedangDialog={sedangDialog}
        stepSaatIni={stepSaatIni}
        registerInput={(input) => {
          console.log(input);
          // if (indexStep < perintah.step.length) {
          setIndexStep(indexStep + 1);
          // }
          setSituasi("memproses");
        }}
      />
    </div>
  );
}

export default function HalamanEksperimental({ data: { bajet } }) {
  return (
    <div className="depan">
      <PromptInteraktif />
      <main className="lembar">
        <Box w={150} h={40} bg="tomato" p={4} color="white">
          <h3>Bajet yang bisa disebar:</h3>
          <Box>Rp {bajet.nominal},00</Box>
        </Box>

        <h1 className="judul">
          Input anggaran pakai Palet Perintah, tekan &rarr;{" "}
          <span>
            <Kbd>shift</Kbd> + <Kbd>P</Kbd>
          </span>
        </h1>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      data: {
        bajet: { nominal: 0 },
      },
    },
  };
}
