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
  console.log(`Perintah yang dikasih: "${input}" -> ${output}`);
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

function PaletPerintah({ children, ...props }) {
  const [isTerbuka, setIsTerbuka] = React.useState(false);

  // Shortcut khusus komponen PaletPerintah
  useHotkeys("shift+p", () => setIsTerbuka(true));

  const tutupPaletnya = () => setIsTerbuka(false);
  useHotkeys("esc", () => tutupPaletnya());

  return (
    <PaletContext.Provider value={{ isTerbuka, tutupPaletnya }} {...props}>
      {!isTerbuka ? null : (
        <div style={{ position: "relative" }}>{children}</div>
      )}
    </PaletContext.Provider>
  );
}

function InputPerintah() {
  const { tutupPaletnya } = usePaletPerintah();
  const { outputPerintah, setOutputPerintah } = usePenyiarPerintah();

  const [inputPerintahnya, setInputPerintahnya] = React.useState("");

  const refInputPerintah = React.useRef(null);
  React.useEffect(() => {
    // current property is refered to input element
    refInputPerintah.current.focus();
  }, []);

  return (
    <div
      className="kotak-palet-perintah"
      style={{
        position: "absolute",
        width: "200px",
        height: "50px",
        backgroundColor: "gray",
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!inputPerintahnya) {
            return;
          }
          const output = prosesPerintah(inputPerintahnya);
          setOutputPerintah(output);
          tutupPaletnya();
        }}
      >
        <label for="input-perintah" className="prompt">
          &gt;
        </label>
        <input
          id="input-perintah"
          className="input-perintah"
          ref={refInputPerintah}
          name="perintah"
          type="text"
          placeholder="ketik perintahnya..."
          value={inputPerintahnya}
          onChange={(ev) => {
            if (outputPerintah) {
              setOutputPerintah("");
            }
            setInputPerintahnya(ev.target.value);
          }}
          onBlur={() => tutupPaletnya()}
        />
      </form>
    </div>
  );
}

export { PaletPerintah, InputPerintah };
