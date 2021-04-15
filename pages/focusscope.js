import * as React from "react";
import { FocusScope, useFocusManager } from "@react-aria/focus";

function Toolbar(props) {
  return (
    <div role="toolbar">
      <FocusScope>{props.children}</FocusScope>
    </div>
  );
}

function ToolbarButton(props) {
  let focusManager = useFocusManager();
  let onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowRight":
        focusManager.focusNext({ wrap: true });
        break;
      case "ArrowLeft":
        focusManager.focusPrevious({ wrap: true });
        break;
    }
  };

  return <button onKeyDown={onKeyDown}>{props.children}</button>;
}

function KelompokTombol() {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open</button>
      {isOpen && (
        <FocusScope contain restoreFocus autoFocus>
          <input aria-label="First input" placeholder="First input" />
          <input aria-label="Second input" placeholder="Second input" />
          <button onClick={() => setOpen(false)}>Close</button>
        </FocusScope>
      )}
    </div>
  );
}

export default function Focuuuuuus() {
  return (
    <div>
      <Toolbar>
        <ToolbarButton>Cut</ToolbarButton>
        <ToolbarButton>Copy</ToolbarButton>
        <ToolbarButton>Paste</ToolbarButton>
      </Toolbar>

      <h1>Fokus</h1>
      <KelompokTombol />
      <KelompokTombol />
      <KelompokTombol />
    </div>
  );
}
