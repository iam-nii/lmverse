import localFont from "next/font/local";
import { Sour_Gummy, Nunito } from "next/font/google";

export const ltSuperior = localFont({
  src: [
    {
      path: "../public/fonts/LTSuperior-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/LTSuperior-Medium.otf",
      weight: "500",
      style: "medium",
    },
    {
      path: "../public/fonts/LTSuperior-Semibold.otf",
      weight: "600",
      style: "seminbold",
    },
    {
      path: "../public/fonts/LTSuperior-Bold.otf",
      weight: "700",
      style: "bold",
    },
  ],
});

export const soure_gummy = Sour_Gummy({
  weight: "600",
  style: "normal",
  display: "swap",
});

export const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
