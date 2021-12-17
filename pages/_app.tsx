import "../styles/globals.css";
import type { AppProps } from "next/app";
import { EmptyLayout } from "@/components/layout";
import { AppPropsWithLayout } from "../model";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

// Khi chuyển trang thì Component sẽ thay đổi theo component
