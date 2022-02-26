import "../styles/globals.css";

const canUseDom = typeof window !== "undefined";

if (canUseDom) {
  import("@github/g-emoji-element");
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
