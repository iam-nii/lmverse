import { type Dictionary, t } from "intlayer";

const coursesContent = {
  key: "courses",
  content: {
    genEng: {
      label: t({
        en: "General English",
        ru: "Общий английский",
        fr: "Anglais général",
      }),
      href: "/courses/gen-eng",
      description: t({
        en: "General English course",
        ru: "Общий английский курс",
        fr: "Cours d'anglais général",
      }),
    },
    businessEng: {
      label: t({
        en: "Business English",
        ru: "Бизнес английский",
        fr: "Anglais commercial",
      }),
      href: "/courses/business-eng",
      description: t({
        en: "Business English course",
        ru: "Бизнес английский курс",
        fr: "Cours d'anglais commercial",
      }),
    },
    techEng: {
      label: t({
        en: "Technical English",
        ru: "Технический английский",
        fr: "Anglais technique",
      }),
      href: "/courses/tech-eng",
      description: t({
        en: "Technical English course",
        ru: "Технический английский курс",
        fr: "Cours d'anglais technique",
      }),
    },
    intExams: {
      label: t({
        en: "International Exams",
        ru: "Международные экзамены",
        fr: "Examen international",
      }),
      href: "/courses/int-exams",
      description: t({
        en: "International Exams course",
        ru: "Международные экзамены курс",
        fr: "Cours d'examen international",
      }),
      types: t({
        en: "IELTS, TOEFL, FCE",
        ru: "IELTS, TOEFL, FCE",
        fr: "IELTS, TOEFL, FCE",
      }),
    },
    rusExam: {
      label: t({
        en: "Russian Exam",
        ru: "Русский экзамен",
        fr: "Examen russe",
      }),
      href: "/courses/rus-exam",
      description: t({
        en: "Russian Exam course",
        ru: "Русский экзамен курс",
        fr: "Cours d'examen russe",
      }),
    },
  },
} satisfies Dictionary;

export default coursesContent;
