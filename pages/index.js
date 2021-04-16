/**
 * Fitur-fitur kunci yang dibutuhkan:
 * 1. Memanggil UI dengan shortcut (hotkey), terutama Palet Perintah. Kebanyakan tindakan
 *    di aplikasi ini pakai keyboard & shortcut & perintah dari Palet, contoh:
 *    > Menambahkan dana ke anggaran: dimulai dengan panggil Palet, ketikkan perintah,
 *      UI sekuensial untuk isi nominal anggaran, dsb.  UI-nya ada di Palet, atau gak jauh-
 *      jauh dari Palet.
 *    >
 * 2. Mengelola fokus komponen atau elemen yang aktif dengan keyboard juga: tab, tombol
 *    panah, access key, dsb.
 *    > Pindah-pindah cell di tabel anggaran, misalnya, juga bisa dilakukan pakai keyboard,
 *      tanda panah terutama, dan di cell yang fokus, nilainya bisa langsung diedit.
 */

import * as React from "react";
import {
  PenyiarPerintahProvider,
  usePenyiarPerintah,
} from "../components/penyiar-perintah";
import { Box, Kbd } from "@chakra-ui/react";
import { PaletPerintah } from "../components/palet-perintah";

function TayanganStatus() {
  const { outputPerintah } = usePenyiarPerintah();
  return !outputPerintah ? null : <div>{outputPerintah}</div>;
}

export default function HalamanBeranda() {
  const [bajet, setBajet] = React.useState(0);

  return (
    <PenyiarPerintahProvider>
      <PaletPerintah />
      <div className="depan">
        <main className="lembar">
          <Box w={150} h={40} bg="tomato" p={4} color="white">
            <h3>Bajet yang bisa disebar:</h3>
            <Box>Rp {bajet},00</Box>
          </Box>

          <h1 className="judul">
            Input anggaran pakai Palet Perintah, tekan &rarr;{" "}
            <span>
              <Kbd>shift</Kbd> + <Kbd>P</Kbd>
            </span>
          </h1>

          <TayanganStatus />
        </main>
      </div>
    </PenyiarPerintahProvider>
  );
}
