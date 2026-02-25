import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        ru: "Начните редактировать",
      }),
      pageLink: "app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
