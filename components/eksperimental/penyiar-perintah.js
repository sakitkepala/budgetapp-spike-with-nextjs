import * as React from "react";
import { PaletPerintah } from "../components/palet-perintah";

const listPerintah = [
  {
    perintah: "bajet tambah",
    deskripsi: `Bajet: Menambahkan dana ke Bajet [bajet tambah]`,
  },
  { perintah: "masokk", deskripsi: "Suatu perintah untuk... masokk!" },
  { perintah: "makan", deskripsi: "Suatu perintah untuk... makan" },
  { perintah: "pergi", deskripsi: "Suatu perintah untuk... pergi" },
];

const PenyiarPerintahContext = React.createContext();

function PenyiarPerintahProvider({ children, ...props }) {
  const [outputPerintah, setOutputPerintah] = React.useState("");
  const output = { outputPerintah, setOutputPerintah };

  return (
    <PenyiarPerintahContext.Provider value={{ output }} {...props}>
      <PaletPerintah />
      {children}
    </PenyiarPerintahContext.Provider>
  );
}

function usePenyiarPerintah() {
  const context = React.useContext(PenyiarPerintahContext);
  if (!context) {
    throw new Error("PenyiarPerintahProvider dipake!!!");
  }
  return context;
}

export { PenyiarPerintahProvider, usePenyiarPerintah };
