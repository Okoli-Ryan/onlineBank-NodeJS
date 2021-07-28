import React from "react";
import { BrowserRouter } from "react-router-dom";

export default function Wrapper({ children }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}
