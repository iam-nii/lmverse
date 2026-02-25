import { type Dictionary, t } from "intlayer";

const buttonsContent = {
  key: "buttons",
  content: {
    signIn: t({
      en: "Sign In",
      ru: "Войти",
      fr: "Connexion",
    }),
    signOut: t({
      en: "Sign Out",
      ru: "Выйти",
      fr: "Se déconnecter",
    }),
    register: t({
      en: "Register",
      ru: "Зарегистрироваться",
      fr: "S'inscrire",
    }),
  },
} satisfies Dictionary;

export default buttonsContent;
