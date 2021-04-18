import * as React from "react";
import { Box, Kbd, Modal, ModalContent, useDisclosure } from "@chakra-ui/react";
import { PaletPerintah } from "../components/eksperimental/palet-perintah";
import { KotakInputPalet } from "../components/eksperimental/palet-input";

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

async function prompt(perintah, dispatch) {
  dispatch({ status: "memproses" });

  const dialog = perintah.dialog.find((dialog) =>
    !dialog.nilai ? true : false
  );

  if (dialog) {
    return Promise.resolve({
      dialog,
      pesan: "Perintah diproses. Menunggu prompt dialog...",
    });
  }

  // TODO: mengeksekusi perintah yang sebenarnya ketika semua dialog prompt sudah terpenuhi
  try {
    // contoh: bikin request request ke backend untuk update data bajet di database
    return Promise.resolve({
      data: "dummy data respon berhasil",
      pesan: "Perintah berhasil dijalankan.",
    });
  } catch (error) {
    return Promise.reject("GAGAL!!!");
  }
}

function PromptInteraktif() {
  const [sudahRegister, setRegister] = React.useState(false);
  const [perintahnya, setPerintah] = React.useState(null);

  const stateAwal = { status: "idle", step: null, error: null };
  const [state, dispatch] = React.useReducer(
    (state, action) => ({ ...state, ...action }),
    stateAwal
  );
  const { status, data, error } = state;

  const sedangDialog = status === "menunggu";

  React.useEffect(() => {
    console.log("useEffect");
    if (!sudahRegister) {
      return;
    }

    // ...run
    prompt(perintahnya, dispatch).then(
      // sukses
      (res) => {
        if (res.data) {
          // TODO: dispatch({ data: res.data, status: "berhasil" });
          dispatch({ data: "dummy data respon berhasil", status: "berhasil" });
        } else {
          dispatch({ data: res.dialog, status: "menunggu" });
        }
      }

      // TODO: ketika rejek
      // error
      // (error) => {
      //   dispatch({ error, status: "gagal" });
      // }
    );
  }, [sudahRegister, perintahnya]);

  function registerPerintah(perintah) {
    const dialogDenganIndex = perintah.dialog.map((step, index) => ({
      ...step,
      index,
    }));
    const perintahDiregister = { ...perintah, dialog: dialogDenganIndex };

    setPerintah(perintahDiregister);
    setRegister(true);
  }

  function registerDialog(value) {
    const { dialog: dialogSebelumnya } = perintahnya;
    console.log(value, typeof value);
    // TODO: konversi nilai input dari form yang defaultnya selalu string sesuai type fieldnya

    const dialog = dialogSebelumnya.map((step) => {
      // step yang diupdate nilainya
      if (step.index === data.index) {
        return { ...step, nilai: value };
      }
      // sisanya tetap
      return step;
    });

    setPerintah({ ...perintahnya, dialog });
  }

  const cleanupPrompt = () => {};

  console.log("status:", status);
  return (
    <div>
      <PaletPerintah sedangQuery={true} registerPerintah={registerPerintah} />
      <PromptDialog
        sedangDialog={sedangDialog}
        prompt={{ cleanupPrompt }}
        registerInput={registerDialog}
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
