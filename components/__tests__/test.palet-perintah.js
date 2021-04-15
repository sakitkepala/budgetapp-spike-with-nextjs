import { render, screen, fireEvent } from "@testing-library/react";
import { PaletPerintah, InputPerintah } from "../palet-perintah";
import { PenyiarPerintahProvider } from "../penyiar-perintah";

function userShortcut(kombinasi) {
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
      fireEvent.keyDown(document.body, {
        keyCode: 80 /* tombol kibor "P" */,
        shiftKey: true,
      });
      break;

    case "esc":
      fireEvent.keyDown(document.body, {
        keyCode: 27 /* tombol kibor "ESC" */,
      });
      break;

    default:
      break;
  }
}

test("Palet Perintah cuma muncul saat eksekusi shortcut SHIFT+P", () => {
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
