import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";

function PaletPerintah({ children }) {
  const [isTerbuka, setIsTerbuka] = React.useState(false);

  useHotkeys("esc", () => setIsTerbuka(false), { enableOnTags: ["INPUT"] });
  useHotkeys("shift+p", () => setIsTerbuka(true));

  return !isTerbuka ? null : <>{children}</>;
}

function InputPerintah() {
  const refInputPerintah = React.useRef(null);
  React.useEffect(() => {
    refInputPerintah.current.focus();
  }, []);

  return (
    <div aria-label="Palet Perintah">
      <label htmlFor="input-perintah" className="prompt">
        Input Perintah
      </label>
      <input ref={refInputPerintah} />
    </div>
  );
}

export { PaletPerintah, InputPerintah };
