import { type Dictionary, t } from "intlayer";

const studentsPageContent = {
  key: "students",
  content: {
    title: t({
      en: "Students",
      ru: "Студенты",
      fr: "Étudiants",
    }),
  },
} satisfies Dictionary;

export default studentsPageContent;
