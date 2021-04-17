import * as React from "react";

const PenyiarPerintahContext = React.createContext();

function reducerPerintah(state) {
  switch (typeof state) {
    case "string":
      console.log("string");
      break;

    case "number":
      console.log("number");
      break;

    default:
      break;
  }

  return state;
}

function PenyiarPerintahProvider(props) {
  const [outputPerintah, setOutputPerintah] = React.useState("");
  // const [outputPerintah, setOutputPerintah] = React.useReducer(
  //   reducerPerintah,
  //   "default"
  // );
  const value = { outputPerintah, setOutputPerintah };

  return <PenyiarPerintahContext.Provider value={value} {...props} />;
}

function usePenyiarPerintah() {
  const context = React.useContext(PenyiarPerintahContext);
  if (!context) {
    throw new Error("PenyiarPerintahProvider dipake!!!");
  }
  return context;
}

// ARSIP:
function prosesPerintah(input) {
  // Prosedur ideal:
  // 1. baca/terjemahkan input <- waktunya belajar regex wkwk
  // 2. cocokkan dengan perbendaharaan perintah yang dikenal
  // 3. eksekusi perintah
  // 4. outputkan hasil, bisa lempar error atau exception kalau gagal, pesan sukses kalau berhasil

  // Di bawah model proses yang disederhanakan:
  const output = listPerintah.map((item) => item.nama).includes(input)
    ? "✅ perintah berhasil dieksekusi"
    : "❌ gak ngerti perintahnya!";

  // Pilihan:
  // 1. side effect
  // 2. return pesan
  // 3. lempar error/exception
  console.info(`Perintah yang dikasih: "${input}" -> ${output}`);
  return output;
}

export { PenyiarPerintahProvider, usePenyiarPerintah };
