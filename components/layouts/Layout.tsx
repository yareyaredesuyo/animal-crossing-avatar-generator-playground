import React from "react";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

type props = {
  children?: React.ReactNode;
};

export function Layout(Props: props) {
  const { children } = Props;
  return (
    <>
      <Navbar />
      <div className="container mx-auto h-screen">
        {children}
        {/* <Footer /> */}
      </div>
    </>
  );
}
