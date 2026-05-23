import Footer from "@/common/Footer";
import Navbar from "@/common/Navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
  maxWidth?: string;
};

const RootLayout = ({ children, maxWidth = "1400px" }: Props) => {
  return (
    <div>
      <Navbar />
      <main style={{ maxWidth: maxWidth }} className={`w-full mx-auto`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
