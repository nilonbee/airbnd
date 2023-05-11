import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function PageLayout({ children }) {
  return (
    <>
      <Header />

      {children}
      
      <Footer />
    </>
  );
}
