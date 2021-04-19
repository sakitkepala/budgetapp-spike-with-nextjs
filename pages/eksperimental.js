import * as React from "react";
import bajet from "../lib/api/bajet";
import { prompt } from "../components/eksperimental/prompt";
import { Box, Kbd } from "@chakra-ui/react";
import { PaletPerintah } from "../components/eksperimental/palet-perintah";
import { PromptDialog } from "../components/eksperimental/prompt-dialog";

function PromptInteraktif({ page }) {
  const [perintahnya, setPerintah] = React.useState(null);

  const stateAwal = { status: "idle", step: null, error: null };
  const [state, dispatch] = React.useReducer(
    (state, action) => ({ ...state, ...action }),
    stateAwal
  );
  const { status, data, error } = state;

  const sedangDialog = status === "menunggu";
  const sedangBerhasil = status === "berhasil";

  React.useEffect(() => {
    console.log("useEffect: prompt");
    if (!perintahnya) {
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
      },
      // error
      (error) => {
        dispatch({ error, status: "gagal" });
      }
    );
  }, [perintahnya]);

  React.useEffect(() => {
    console.log("useEffect: update UI bajet");
    if (!sedangBerhasil) {
      return;
    }
    page.aksi.setBajet(data);
    setPerintah(null);
  }, [sedangBerhasil]);

  function registerPerintah(perintah) {
    const dialogDenganIndex = perintah.dialog.map((step, index) => ({
      ...step,
      index,
    }));
    const perintahDiregister = { ...perintah, dialog: dialogDenganIndex };

    setPerintah(perintahDiregister);
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

  // TODO:
  const cleanupPrompt = () => {};

  console.log("status:", status);
  return (
    <div>
      <PaletPerintah paletTerbuka={true} registerPerintah={registerPerintah} />
      <PromptDialog
        sedangDialog={sedangDialog}
        prompt={{ data, cleanupPrompt }}
        registerInput={registerDialog}
      />
    </div>
  );
}

export default function HalamanEksperimental({ data }) {
  console.log("render page: HalamanEksperimental");
  const { bajet: bajetFromProps } = data;

  const [bajet, setBajet] = React.useState(bajetFromProps);

  return (
    <div className="depan">
      <PromptInteraktif page={{ data, aksi: { setBajet } }} />
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
        bajet: bajet.read(),
      },
    },
  };
}
