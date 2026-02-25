import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.RUSSIAN,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // This tells Intlayer where your *.content.ts files live
    contentDir: ["./app", "./components", "./constants"],
  },
};

export default config;
