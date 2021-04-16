import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
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

const PaletContext = React.createContext();

function usePaletPerintah() {
  const context = React.useContext(PaletContext);
  if (!context) {
    throw new Error("PaletPerintah dipake!!!");
  }
  return context;
}

// TODO: refaktor ke komponen modalnya chakra
function PaletPerintah({ children, ...props }) {
  const [isTerbuka, setIsTerbuka] = React.useState(false);

  // Shortcut khusus komponen PaletPerintah
  const tutupPaletnya = () => setIsTerbuka(false);
  useHotkeys("esc", tutupPaletnya, { enableOnTags: ["INPUT"] });
  useHotkeys("shift+p", () => setIsTerbuka(true));

  return (
    <PaletContext.Provider value={tutupPaletnya} {...props}>
      {!isTerbuka ? null : <>{children}</>}
    </PaletContext.Provider>
  );
}

function InputPerintah() {
  const tutupPaletnya = usePaletPerintah();
  const { outputPerintah, setOutputPerintah } = usePenyiarPerintah();

  const [inputPerintahnya, setInputPerintahnya] = React.useState("");

  const refInputPerintah = React.useRef(null);
  React.useEffect(() => {
    refInputPerintah.current.focus();
  }, []);

  function onKetikPerintah(ev) {
    if (outputPerintah) {
      setOutputPerintah("");
    }
    setInputPerintahnya(ev.target.value);
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
          ref={refInputPerintah}
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
