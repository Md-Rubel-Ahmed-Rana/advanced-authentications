import { store } from "@/redux";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import type { NextPage } from "next";
import { Suspense, type ReactElement, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import AppLoader from "@/common/AppLoader";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Suspense fallback={<AppLoader />}>
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
        <Toaster position="top-right" />
      </Provider>
    </Suspense>
  );
}
