import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";

const FocusRootContext = React.createContext();

function WithFocusRoot({ children }) {
  const [apakahFokus, setFokus] = React.useState(false);

  return (
    <div
      tabIndex="0"
      onFocus={() => setFokus(true)}
      onBlur={() => setFokus(false)}
    >
      <FocusRootContext.Provider value={{ apakahFokus, setFokus }}>
        {children}
      </FocusRootContext.Provider>
    </div>
  );
}

function ChildWithFocus({ children }) {
  const { apakahFokus } = React.useContext(FocusRootContext);
  const tabIndexValue = apakahFokus ? 0 : -1;
  return <div tabIndex={tabIndexValue}>{children}</div>;
}

export default function SpikeNavigasiFokus() {
  useHotkeys("up", () => console.log("↑"));
  useHotkeys("down", () => console.log("↓"));
  useHotkeys("left", () => console.log("←"));
  useHotkeys("right", () => console.log("→"));

  return (
    <div className="navigasi-fokus">
      <WithFocusRoot>
        <div>
          <h1>1</h1>
          {/* Eksperimen dengan tabIndex -1 & custom handler untuk tombol panah */}

          <ChildWithFocus>
            <p>Anak dari 1</p>
          </ChildWithFocus>

          <ChildWithFocus>
            <p>Anak dari 1, yang ke-2</p>
          </ChildWithFocus>

          {/*  */}
        </div>
      </WithFocusRoot>

      {/* Dengan tabIndex 0 semua */}
      <WithFocusRoot>
        <div>
          <a>2</a>
        </div>
      </WithFocusRoot>

      <WithFocusRoot>
        <div>3</div>
      </WithFocusRoot>

      <WithFocusRoot>
        <div>4</div>
      </WithFocusRoot>
    </div>
  );
}
