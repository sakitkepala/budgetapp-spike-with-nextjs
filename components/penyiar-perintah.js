import * as React from "react";

const PenyiarPerintahContext = React.createContext();

function PenyiarPerintahProvider(props) {
  const [outputPerintah, setOutputPerintah] = React.useState("");
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

export { PenyiarPerintahProvider, usePenyiarPerintah };
