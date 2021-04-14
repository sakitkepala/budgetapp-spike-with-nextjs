import {
  PenyiarPerintahProvider,
  usePenyiarPerintah,
} from "../components/penyiar-perintah";
import { PaletPerintah, InputPerintah } from "../components/palet-perintah";

function TayanganStatus() {
  const { outputPerintah } = usePenyiarPerintah();
  return !outputPerintah ? null : <div>{outputPerintah}</div>;
}

export default function HalamanBeranda() {
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
