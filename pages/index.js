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

import {
  PenyiarPerintahProvider,
  usePenyiarPerintah,
} from "../components/penyiar-perintah";
import { Box } from "@chakra-ui/react";
import { PaletPerintah, InputPerintah } from "../components/palet-perintah";

function TayanganStatus() {
  const { outputPerintah } = usePenyiarPerintah();
  return !outputPerintah ? null : <div>{outputPerintah}</div>;
}

export default function HalamanBeranda() {
  return (
    <PenyiarPerintahProvider>
      <div className="depan">
        <main className="lembar">
          <PaletPerintah>
            <InputPerintah />
          </PaletPerintah>

          <h1 className="judul">Pake shortcut dong jaman now</h1>

          <Box bg="tomato" w="100%" p={4} color="white">
            Rp {"{Tempat nampilin duit bajet hoho}"},00
          </Box>

          {/* TODO: hapus button setelah commit test */}
          <Box
            as="button"
            borderRadius="md"
            bg="tomato"
            color="white"
            px={4}
            h={8}
          >
            Box jadi button
          </Box>

          <TayanganStatus />
        </main>
      </div>
    </PenyiarPerintahProvider>
  );
}
