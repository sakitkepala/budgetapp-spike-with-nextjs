import * as React from "react";
import { Box, Kbd } from "@chakra-ui/react";
import { PaletPerintah } from "../components/eksperimental/palet-perintah";
import { PromptDialog } from "../components/eksperimental/prompt-dialog";

async function prompt(perintah) {
  /**
   * Step:
   * 1. memproses multi step prompt
   * 2. membuat request yang sebenarnya (misal, ke back end) pakai data
   *    yang sudah dilengkapi user lewat prompt sebelumnya
   *
   * Pemrosesan perintah prompt dimulai dengan membaca array dialog
   * lalu mencari item data pertama yang akan dipakai untuk menampilkan
   * dialog prompt untuk dijawab user.
   *
   * Item pertama yang diambil itu nilainya pasti masih null.
   *
   * Tapi sebagai perhatian, ada kondisi dimana field-nya boleh dikosingi,
   * atau tidak mandatory. Bagaimana caranya membedakan item yang field-nya
   * tidak required/boleh dikosongi ini dengan item yang ingin kita cari
   * sebenarnya?
   */

  const dialog = perintah.dialog.find(({ nilai }) => nilai === null);
  if (dialog) {
    return Promise.resolve({
      dialog,
      pesan: "Perintah diproses. Menunggu prompt dialog...",
    });
  }

  // TODO: mengeksekusi perintah yang sebenarnya ketika semua dialog prompt sudah terpenuhi
  try {
    // contoh: bikin request request ke backend untuk update data bajet di database
    // const data = await fetch(...).then(res => res, error => throw new Error(error))
    // return data
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
    dispatch({ status: "memproses" });
    prompt(perintahnya).then(
      // sukses
      (res) => {
        if (!res.data) {
          dispatch({ data: res.dialog, status: "menunggu" });
        } else {
          dispatch({ data: res.data, status: "berhasil" });
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
        prompt={{ data, cleanupPrompt }}
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
