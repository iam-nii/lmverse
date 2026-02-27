import { type Dictionary, t } from "intlayer";

const authContent = {
    key: "auth",
    content: {
        quotes: [
            {
                text: t({
                    en: "To have another language is to possess a second soul.",
                    ru: "Владеть другим языком — значит обладать второй душой.",
                    fr: "Posséder une autre langue, c'est posséder une deuxième âme.",
                }),
                author: "Charlemagne"
            },
            {
                text: t({
                    en: "Language is the road map of a culture. It tells you where its people come from and where they are going.",
                    ru: "Язык — это дорожная карта культуры. Он говорит о том, откуда пришли люди и куда они идут.",
                    fr: "La langue est la carte routière d'une culture. Elle vous dit d'où vient son peuple et où il va.",
                }),
                author: "Rita Mae Brown"
            },
            {
                text: t({
                    en: "One language sets you in a corridor for life. Two languages open every door along the way.",
                    ru: "Один язык направляет вас в коридоре жизни. Два языка открывают каждую дверь на вашем пути.",
                    fr: "Une langue vous place dans un couloir pour la vie. Deux langues ouvrent toutes les portes le long du chemin.",
                }),
                author: "Frank Smith"
            }
        ],
        login: {
            title: t({
                en: "Welcome back",
                ru: "Добро пожаловать",
                fr: "Bon retour",
            }),
            subtitle: t({
                en: "Sign in to your account to continue.",
                ru: "Войдите в свой аккаунт, чтобы продолжить.",
                fr: "Connectez-vous à votre compte pour continuer.",
            }),
            emailLabel: t({
                en: "Email address",
                ru: "Адрес электронной почты",
                fr: "Adresse e-mail",
            }),
            passwordLabel: t({
                en: "Password",
                ru: "Пароль",
                fr: "Mot de passe",
            }),
            rememberMe: t({
                en: "Remember Me",
                ru: "Запомнить меня",
                fr: "Se souvenir de moi",
            }),
            forgotPassword: t({
                en: "Forgot Password?",
                ru: "Забыли пароль?",
                fr: "Mot de passe oublié ?",
            }),
            loginButton: t({
                en: "Login",
                ru: "Войти",
                fr: "Se connecter",
            }),
            joinedBefore: t({
                en: "Joined us before?",
                ru: "Уже были с нами?",
                fr: "Vous nous avez déjà rejoints ?",
            }),
            googleButton: t({
                en: "Google",
                ru: "Google",
                fr: "Google",
            }),
            noAccount: t({
                en: "Don't have an account?",
                ru: "Нет аккаунта?",
                fr: "Pas de compte ?",
            }),
            signUpLink: t({
                en: "Sign up",
                ru: "Зарегистрироваться",
                fr: "S'inscrire",
            }),
        },
        signup: {
            title: t({
                en: "Create your account",
                ru: "Создайте свой аккаунт",
                fr: "Créez votre compte",
            }),
            subtitle: t({
                en: "Hello there! Let's create your account.",
                ru: "Привет! Давайте создадим ваш аккаунт.",
                fr: "Bonjour ! Créons votre compte.",
            }),
            firstName: t({
                en: "First name",
                ru: "Имя",
                fr: "Prénom",
            }),
            middleName: t({
                en: "Middle name",
                ru: "Отчество",
                fr: "Deuxième prénom",
            }),
            lastName: t({
                en: "Last name",
                ru: "Фамилия",
                fr: "Nom de famille",
            }),
            emailPlaceholder: t({
                en: "Email address",
                ru: "Электронная почта",
                fr: "Adresse e-mail",
            }),
            passwordPlaceholder: t({
                en: "Password",
                ru: "Пароль",
                fr: "Mot de passe",
            }),
            agreement1: t({
                en: "I agree to Platform",
                ru: "Я согласен с",
                fr: "J'accepte les",
            }),
            terms: t({
                en: "Terms of Service",
                ru: "Условиями обслуживания",
                fr: "Conditions d'utilisation",
            }),
            and: t({
                en: "and",
                ru: "и",
                fr: "et la",
            }),
            privacy: t({
                en: "Privacy Policy",
                ru: "Политикой конфиденциальности",
                fr: "Politique de confidentialité",
            }),
            createAccountButton: t({
                en: "Create my account",
                ru: "Создать мой аккаунт",
                fr: "Créer mon compte",
            }),
            haveAccount: t({
                en: "Joined us before?",
                ru: "Уже есть аккаунт?",
                fr: "Déjà membre ?",
            }),
            loginLink: t({
                en: "Login",
                ru: "Войти",
                fr: "Se connecter",
            }),
        },
        forgotPassword: {
            title: t({
                en: "Reset your password",
                ru: "Сброс пароля",
                fr: "Réinitialiser votre mot de passe",
            }),
            subtitle: t({
                en: "Enter your email address and we'll send you a link to reset your password.",
                ru: "Введите свой email, и мы отправим вам ссылку для сброса пароля.",
                fr: "Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.",
            }),
            emailLabel: t({
                en: "Email Address",
                ru: "Адрес электронной почты",
                fr: "Adresse e-mail",
            }),
            emailPlaceholder: t({
                en: "Enter your registered email",
                ru: "Введите ваш зарегистрированный email",
                fr: "Entrez votre e-mail",
            }),
            sendLinkButton: t({
                en: "Send Reset Link",
                ru: "Отправить ссылку для сброса",
                fr: "Envoyer le lien de réinitialisation",
            }),
            checkInbox: t({
                en: "Check your inbox",
                ru: "Проверьте входящие",
                fr: "Vérifiez votre boîte de réception",
            }),
            sentLinkText1: t({
                en: "We've sent a password reset link to",
                ru: "Мы отправили ссылку для сброса пароля на",
                fr: "Nous avons envoyé un lien de réinitialisation de mot de passe à",
            }),
            sentLinkText2: t({
                en: "Please check your email and follow the instructions.",
                ru: "Пожалуйста, проверьте свою электронную почту и следуйте инструкциям.",
                fr: "Veuillez vérifier votre e-mail et suivre les instructions.",
            }),
            tryAnotherEmail: t({
                en: "Try another email",
                ru: "Попробовать другой email",
                fr: "Essayer avec un autre e-mail",
            }),
            rememberedPassword: t({
                en: "Remembered your password?",
                ru: "Вспомнили пароль?",
                fr: "Vous vous souvenez de votre mot de passe ?",
            }),
            loginLink: t({
                en: "Login",
                ru: "Войти",
                fr: "Se connecter",
            }),
        },
        resetPassword: {
            title: t({
                en: "Create new password",
                ru: "Создать новый пароль",
                fr: "Créer un nouveau mot de passe",
            }),
            subtitle: t({
                en: "Your new password must be different from previous used passwords.",
                ru: "Ваш новый пароль должен отличаться от ранее использованных паролей.",
                fr: "Votre nouveau mot de passe doit être différent des mots de passe précédemment utilisés.",
            }),
            newPasswordLabel: t({
                en: "New Password",
                ru: "Новый пароль",
                fr: "Nouveau mot de passe",
            }),
            confirmPasswordLabel: t({
                en: "Confirm New Password",
                ru: "Подтвердите новый пароль",
                fr: "Confirmer le nouveau mot de passe",
            }),
            resetButton: t({
                en: "Reset Password",
                ru: "Сбросить пароль",
                fr: "Réinitialiser le mot de passe",
            }),
        },
    },
} satisfies Dictionary;

export default authContent;
