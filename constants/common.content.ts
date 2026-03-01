import { type Dictionary, t } from "intlayer";

const commonContent = {
    key: "common",
    content: {
        loading: t({
            en: "Loading...",
            ru: "Загрузка...",
            fr: "Chargement...",
        }),
        errorTitle: t({
            en: "Something went wrong!",
            ru: "Что-то пошло не так!",
            fr: "Quelque chose s'est mal passé !",
        }),
        errorDesc: t({
            en: "We encountered an error while processing your request.",
            ru: "Мы столкнулись с ошибкой при обработке вашего запроса.",
            fr: "Nous avons rencontré une erreur lors du traitement de votre demande.",
        }),
        tryAgain: t({
            en: "Try again",
            ru: "Попробовать снова",
            fr: "Réessayer",
        }),
        goHome: t({
            en: "Go back home",
            ru: "Вернуться на главную",
            fr: "Retourner à l'accueil",
        }),
        notFoundTitle: t({
            en: "Page not found",
            ru: "Страница не найдена",
            fr: "Page non trouvée",
        }),
        notFoundDesc: t({
            en: "The page you are looking for doesn't exist or has been moved.",
            ru: "Страница, которую вы ищете, не существует или была перемещена.",
            fr: "La page que vous recherchez n'existe pas ou a été déplacée.",
        }),
    },
} satisfies Dictionary;

export default commonContent;
