import { type Dictionary, t } from "intlayer";

const navMenuContent = {
  key: "navMenu",
  content: {
    home: {
      label: t({
        en: "Home",
        ru: "Главная",
        fr: "Accueil",
      }),
      href: "/",
    },
    courses: {
      label: t({
        en: "Courses",
        ru: "Курсы",
        fr: "Cours",
      }),
      href: "/courses",
    },
    dashboard: {
      label: t({
        en: "Dashboard",
        ru: "Дашборд",
        fr: "Dashboard",
      }),
      href: "/dashboard",
    },
    work: {
      label: t({
        en: "Work",
        ru: "Работа",
        fr: "Travail",
      }),
      href: "/work",
    },
    contactUs: {
      label: t({
        en: "Contact Us",
        ru: "Контакты",
        fr: "Contactez-nous",
      }),
      href: "/contact-us",
    },
  },
} satisfies Dictionary;

export default navMenuContent;
