import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { Analytics } from "@vercel/analytics/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Analytics />
      <NextUIProvider>
        <Component {...pageProps} className="bg-[#fafafa]" />
      </NextUIProvider>
    </SessionProvider>
  );
}
