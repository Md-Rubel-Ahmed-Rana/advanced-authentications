"use client";

import { store } from "@/redux";
import React from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

type Props = {
  children: React.ReactNode;
};

const StoreProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      {children}
      <Toaster position="top-right" theme="light" />
    </Provider>
  );
};

export default StoreProvider;
