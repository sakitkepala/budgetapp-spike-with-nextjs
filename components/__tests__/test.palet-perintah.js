import { render, screen, fireEvent } from "@testing-library/react";
import { PenyiarPerintahProvider } from "../penyiar-perintah";
import { PaletPerintah, InputPerintah } from "../palet-perintah";
// import { PaletPerintah, InputPerintah } from "../mock.palet-perintah";

function simulasiKeyUser(target, keyCode, shiftKey = false) {
  fireEvent.keyDown(target, { keyCode, shiftKey });
  fireEvent.keyUp(target, { keyCode, shiftKey });
}

/**
 * Menyimulasikan user mengeksekusi shortcut kibor dari elemen yang sedang fokus.
 *
 * Default-nya, shortcut "didengarkan" oleh elemen yang sedang fokus (aktif) akibat
 * adanya aksi-aksi sebelumnya: user klik di suatu tempat, ngisi form, etc. Maka
 * dari itu, fokus didefaultkan ke `document.activeElement`, kecuali user menentukan
 * mau aktif dimana.
 * @param {string} kombinasi shortcut kibor yang dieksekusi
 * @param {HTMLElement} target (opsional) elemen target event-nya dimunculkan, defaultnya `document.activeElement`
 */
function userShortcut(kombinasi, target = document.activeElement) {
  switch (kombinasi) {
    case "shift+p":
      /**
       * * Aside: cuma untuk tujuan dokumentasi/reminder:
       *
       * Untuk ngetes hotkey atau shortcut kombinasi tombol kibor...
       * alt #2 ini gak jalan:
       * ```
       *  fireEvent.keyDown(document.body, { keyCode: "16" });
       *  fireEvent.keyDown(document.body, { keyCode: "80" });
       * ```
       *
       * Yang berhasil adalah...
       * `fireEvent` cuma bisa jalan dengan baca opsi `keyCode`
       * dan key SHIFT di bacanya bukan dengan mendeteksi event dari SHIFT itu sendiri
       * melainkan dibaca dari apakah nilai modifier `shiftKey`-nya benar atau enggak.
       */
      simulasiKeyUser(target, 80, true); /* tombol kibor "P" === 80 */
      break;

    case "esc":
      simulasiKeyUser(target, 27); /* tombol kibor "ESC" === 27 */
      break;

    default:
      throw new Error("Shortcut gak didukung!");
  }
}

test("Palet Perintah awal render cuma muncul setelah eksekusi shortcut SHIFT+P", () => {
  render(
    <PenyiarPerintahProvider>
      <PaletPerintah>
        <InputPerintah />
      </PaletPerintah>
    </PenyiarPerintahProvider>
  );
  expect(screen.queryByLabelText(/palet perintah/i)).not.toBeInTheDocument();

  userShortcut("shift+p");

  expect(screen.getByLabelText(/palet perintah/i)).toBeInTheDocument();
});

test("Palet Perintah ditutup pakai tombol ESC", () => {
  render(
    <PenyiarPerintahProvider>
      <PaletPerintah>
        <InputPerintah />
      </PaletPerintah>
    </PenyiarPerintahProvider>
  );

  userShortcut("shift+p");
  userShortcut("esc");

  expect(screen.queryByLabelText(/palet perintah/i)).not.toBeInTheDocument();
});

test("Palet Perintah bisa dibuka lagi pakai shortcut setelah ditutup", () => {
  render(
    <PenyiarPerintahProvider>
      <PaletPerintah>
        <InputPerintah />
      </PaletPerintah>
    </PenyiarPerintahProvider>
  );

  // WORKS!
  userShortcut("shift+p");
  userShortcut("esc");
  userShortcut("shift+p", window.document.body.querySelector("div"));

  expect(screen.queryByLabelText(/palet perintah/i)).toBeInTheDocument();
});
