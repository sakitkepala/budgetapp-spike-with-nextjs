import * as React from "react";

const PenyiarPerintahContext = React.createContext();

function reducerPerintah(state) {
  switch (typeof state) {
    case "string":
      console.log("string");
      break;

    case "number":
      console.log("number");
      break;

    default:
      break;
  }

  return state;
}

function PenyiarPerintahProvider(props) {
  // const [outputPerintah, setOutputPerintah] = React.useState("");
  const [outputPerintah, setOutputPerintah] = React.useReducer(
    reducerPerintah,
    "default"
  );
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
