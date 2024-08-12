import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>SoAD Archival Platform</title>
      </Head>
      <Analytics />
      <NextUIProvider>
        <Component {...pageProps} className="bg-[#fafafa]" />
      </NextUIProvider>
    </SessionProvider>
  );
}
