import { useState, useRef, useEffect, createContext, useContext } from "react";
import { useHotkeys } from "react-hotkeys-hook";

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

const PaletContext = createContext();

function usePaletPerintah() {
  const context = useContext(PaletContext);
  if (!context) {
    throw new Error("PaletPerintah dipake!!!");
  }
  return context;
}

function PaletPerintah({ children, ...props }) {
  const [isTerbuka, setIsTerbuka] = useState(false);

  // Shortcut khusus komponen PaletPerintah
  useHotkeys("shift+p", () => setIsTerbuka(true));
  useHotkeys("esc", () => setIsTerbuka(false));

  return (
    <PaletContext.Provider value={{ isTerbuka, setIsTerbuka }} {...props}>
      {!isTerbuka ? null : (
        <div style={{ position: "relative" }}>{children}</div>
      )}
    </PaletContext.Provider>
  );
}

function InputPerintah() {
  const { setIsTerbuka } = usePaletPerintah();
  const { outputPerintah, setOutputPerintah } = usePenyiarPerintah();

  const [inputPerintahnya, setInputPerintahnya] = useState("");

  const refInputPerintah = useRef(null);
  useEffect(() => {
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
      &gt;{" "}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!inputPerintahnya) {
            return;
          }
          const output = prosesPerintah(inputPerintahnya);
          setOutputPerintah(output);
          setIsTerbuka(false);
        }}
      >
        <input
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
          onBlur={() => setIsTerbuka(false)}
        />
      </form>
    </div>
  );
}

const PendengarPerintahContext = createContext();

function usePenyiarPerintah() {
  const context = useContext(PendengarPerintahContext);
  if (!context) {
    throw new Error("PenyiarPerintahProvider dipake!!!");
  }
  return context;
}

function PenyiarPerintahProvider(props) {
  const [outputPerintah, setOutputPerintah] = useState("");
  const value = { outputPerintah, setOutputPerintah };

  return <PendengarPerintahContext.Provider value={value} {...props} />;
}

function TayanganStatus() {
  const { outputPerintah } = usePenyiarPerintah();
  return !outputPerintah ? null : <div>{outputPerintah}</div>;
}

export default function Home() {
  // TODO: tutup floating UI dengan keyboard `esc`
  /* 
  useHotkeys("esc", () => {
    // tutup floating UI teraktas
  });
   */

  return (
    <PenyiarPerintahProvider>
      <div className="depan">
        <main className="lembar">
          <PaletPerintah>
            <InputPerintah />
          </PaletPerintah>

          <h1 className="judul">Pake shortcut dong jaman now</h1>
          <TayanganStatus />
        </main>
      </div>
    </PenyiarPerintahProvider>
  );
}
