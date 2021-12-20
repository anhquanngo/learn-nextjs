import "../styles/globals.css";
import { EmptyLayout } from "@/components/layout";
import { AppPropsWithLayout } from "../model";
import { SWRConfig } from "swr";
import axiosClient from "@/api_client/axios-client";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}

export default MyApp;

// Khi chuyển trang thì Component sẽ thay đổi theo component
