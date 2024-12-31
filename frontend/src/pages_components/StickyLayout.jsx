import React from "react";
import Footer from "./Footer";

const StickyLayout = ({ children }) => {
  return (
    <div  
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <div style={{ flex: 1 }}>{children}</div>
      <Footer />
    </div>
  );
};

export default StickyLayout;
