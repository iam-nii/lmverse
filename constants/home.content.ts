import { type Dictionary, t } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    hero: {
      title: t({
        en: "Learn languages effectively",
        ru: "Изучайте языки эффективно",
        fr: "Apprenez les langues efficacement",
      }),
      description: t({
        en: "Our specialized online courses are designed to bring the classroom experience to you, no matter where you are.",
        ru: "Наша специализированная онлайн-курсовая программа разработана для того, чтобы привести опыт классной комнаты к вам, независимо от того, где вы находитесь.",
        fr: "Nos cours spécialisés en ligne sont conçus pour vous apporter l'expérience de la classe, peu importe où vous vous trouvez.",
      }),
      trusted: t({
        en: "Trusted by over 15K Users worldwide since 2024",
        ru: "Проверено более 15K пользователей за рубежом с 2024 года",
        fr: "Approuvé par plus de 15K utilisateurs à travers le monde depuis 2024",
      }),
      subtitle: t({
        en: "Start speaking from the first lesson",
        ru: "Начни говорить с первого урока",
        fr: "Commencez à parler dès la première leçon",
      }),
      cta1: t({
        en: "Start learning",
        ru: "Начать обучение",
        fr: "Commencer à apprendre",
      }),
      cta2: t({
        en: "Book a trial",
        ru: "Пробный урок",
        fr: "Réserver un essai",
      }),
    },
    featuredLevels: {
      whatsNew: t({
        en: "What's New",
        ru: "Что нового",
        fr: "Quoi de neuf",
      }),
      title: t({
        en: "Featured Levels",
        ru: "Рекомендуемые уровни",
        fr: "Niveaux populaires",
      }),
      viewAll: t({
        en: "View all Courses",
        ru: "Смотреть все курсы",
        fr: "Voir tous les cours",
      }),
      bookConsultation: t({
        en: "Book a consultation",
        ru: "Записаться на консультацию",
        fr: "Réserver une consultation",
      }),
      levels: {
        starter: {
          tag: "STARTER",
          description: t({
            en: "The foundation of the English language is the basic grammatical structures, keywords and correct pronunciation, without which it is impossible to build complex sentences and understand speech.",
            ru: "Основа английского языка - базовые грамматические структуры, ключевые слова и правильное произношение, без которых невозможно строить сложные предложения и понимать речь.",
            fr: "Les bases de la langue anglaise sont les structures grammaticales élémentaires, les mots-clés et une prononciation correcte, sans lesquels il est impossible de construire des phrases complexes.",
          }),
        },
        beginner: {
          tag: "A1 - A2",
          title: t({
            en: "Beginner | Elementary | Pre-level",
            ru: "Beginner | Elementary | Pre-level",
            fr: "Débutant | Élémentaire | Pré-intermédiaire",
          }),
          description: t({
            en: "Ideal for those who are just starting to learn a language and want to gradually speak confidently.",
            ru: "Идеально подходит для тех, кто только начинает изучать язык и хочет постепенно начать уверенно говорить.",
            fr: "Idéal pour ceux qui commencent tout juste à apprendre une langue et qui veulent parler avec confiance.",
          }),
        },
        intermediate: {
          tag: "B1 - B2",
          title: t({
            en: "Intermediate | Upper intermediate",
            ru: "Intermediate | Upper intermediate",
            fr: "Intermédiaire | Intermédiaire supérieur",
          }),
          description: t({
            en: "This is an advanced stage when you communicate confidently in English, understand complex texts, and express your thoughts freely.",
            ru: "Это продвинутый этап, когда вы уверенно общаетесь на английском, понимаете сложные тексты и свободно выражаете свои мысли.",
            fr: "C'est un stade avancé où vous communiquez avec confiance en anglais, comprenez des textes complexes et exprimez librement vos pensées.",
          }),
        },
        advanced: {
          tag: "C1 - C2",
          title: t({
            en: "Advanced | Proficiency",
            ru: "Advanced | Proficiency",
            fr: "Avancé | Maîtrise",
          }),
          description: t({
            en: "The advanced level makes it easy to understand everything you hear and read, to express thoughts freely and accurately, even in difficult situations.",
            ru: "Продвинутый уровень позволяет легко понимать все, что вы слышите и читаете, свободно и точно выражать мысли даже в сложных ситуациях.",
            fr: "Le niveau avancé permet de comprendre facilement tout ce que vous entendez et lisez, d'exprimer vos pensées librement et avec précision.",
          }),
        },
      },
    },
    programs: {
      title: t({
        en: "Our Programs have been designed for your convenience",
        ru: "Наши программы созданы для вашего удобства",
        fr: "Nos programmes ont été conçus pour votre confort",
      }),
      individual: t({
        en: "Individual consultations",
        ru: "Индивидуальные консультации",
        fr: "Consultations individuelles",
      }),
      corporate: t({
        en: "Corporate Training",
        ru: "Корпоративное обучение",
        fr: "Formation en entreprise",
      }),
      exams: t({
        en: "Exam preparations",
        ru: "Подготовка к экзаменам",
        fr: "Préparation aux examens",
      }),
    },
    whyJoinUs: {
      title: t({
        en: "Why join us?",
        ru: "Почему стоит выбрать нас?",
        fr: "Pourquoi nous rejoindre ?",
      }),
      description: t({
        en: "We are a team of native speakers and experienced teachers who have joined forces to create a unique educational platform. Each of our teachers has international certificates and experience working with students of various levels. We believe that everyone can learn English, and we are ready to help you with this.",
        ru: "Мы - команда носителей языка и опытных преподавателей, которые объединили усилия для создания уникальной образовательной платформы. Каждый из наших учителей имеет международные сертификаты и опыт работы со студентами разных уровней. Мы верим, что английский может выучить каждый, и готовы вам в этом помочь.",
        fr: "Nous sommes une équipe de locuteurs natifs et de professeurs expérimentés qui se sont unis pour créer une plateforme éducative unique. Chacun de nos professeurs possède des certificats internationaux et de l'expérience avec des étudiants de différents niveaux.",
      }),
      points: [
        t({
          en: "Courses are for all ages and levels — from complete beginners to fluent speakers",
          ru: "Курсы для всех возрастов и уровней — от полных новичков до свободно говорящих",
          fr: "Des cours pour tous les âges et tous les niveaux — des grands débutants aux locuteurs courants",
        }),
        t({
          en: "Learn through real dialogues, movies, songs, and life scenarios.",
          ru: "Учитесь на реальных диалогах, фильмах, песнях и жизненных сценариях.",
          fr: "Apprenez à travers des dialogues réels, des films, des chansons et des scénarios de vie.",
        }),
        t({
          en: "Your progress and mistakes are not ignored.",
          ru: "Ваш прогресс и ошибки не остаются без внимания.",
          fr: "Vos progrès et vos erreurs ne sont pas ignorés.",
        }),
        t({
          en: "The Most World Class Instructors",
          ru: "Преподаватели мирового класса",
          fr: "Les meilleurs instructeurs de classe mondiale",
        }),
      ],
      register: t({
        en: "Register for a free trial lesson",
        ru: "Записаться на бесплатный пробный урок",
        fr: "S'inscrire à une leçon d'essai gratuite",
      }),
    },
    speakingSection: {
      subtitle: t({
        en: "at LmVerse",
        ru: "в LmVerse",
        fr: "chez LmVerse",
      }),
      title: t({
        en: "Immediately start speaking effectively in English",
        ru: "Начните эффективно говорить по-английски с первого занятия",
        fr: "Commencez immédiatement à parler efficacement en anglais",
      }),
      description: t({
        en: "Native speakers and highly qualified, experienced teachers provide high-quality instruction while helping students develop natural language proficiency. Our approach to language learning is centered on practical, real-life communication, making it the core component of every lesson. Classes are flexible and adapt to your schedule, allowing you to study whenever it is convenient — without stress or unnecessary pressure.",
        ru: "Носители языка и высококвалифицированные опытные преподаватели обеспечивают качественное обучение, помогая студентам развить естественные языковые навыки. Наш подход к изучению языка сосредоточен на практическом общении в реальных жизненных ситуациях, что делает его ключевым компонентом каждого урока. Гибкий график позволяет учиться в удобное для вас время — без стресса и лишнего давления.",
        fr: "Des locuteurs natifs et des professeurs hautement qualifiés et expérimentés dispensent un enseignement de haute qualité tout en aidant les étudiants à développer une maîtrise naturelle de la langue. Notre approche se concentre sur la communication pratique et réelle.",
      }),
      bullets: [
        t({
          en: "Stay motivated with highly qualified instructors",
          ru: "Сохраняйте мотивацию с высококвалифицированными инструкторами",
          fr: "Restez motivé avec des instructeurs hautement qualifiés",
        }),
        t({
          en: "Keep up with an effective approach to learning",
          ru: "Следуйте эффективному подходу к обучению",
          fr: "Suivez une approche d'apprentissage efficace",
        }),
        t({
          en: "Build confidence through flexibility in learning",
          ru: "Обретайте уверенность благодаря гибкости обучения",
          fr: "Renforcez votre confiance grâce à la flexibilité de l'apprentissage",
        }),
        t({
          en: "Get certified with 100+ certification courses",
          ru: "Получите сертификат после прохождения одного из 100+ курсов",
          fr: "Obtenez une certification avec plus de 100 cours certifiants",
        }),
      ],
    },
    lessonOptions: {
      title: t({
        en: "lesson options",
        ru: "варианты занятий",
        fr: "options de leçons",
      }),
      elementary: {
        title: t({
          en: "Elementary",
          ru: "Начальный",
          fr: "Élémentaire",
        }),
        description: t({
          en: "For those who are not familiar with the language at all. Lots of grammar and basic rules.",
          ru: "Для тех, кто совсем не знаком с языком. Много грамматики и базовых правил.",
          fr: "Pour ceux qui ne connaissent pas du tout la langue. Beaucoup de grammaire et de règles de base.",
        }),
      },
      individual: {
        title: t({
          en: "Individual",
          ru: "Индивидуальные",
          fr: "Individuel",
        }),
        description: t({
          en: "Courses tailored to your individual learning style and pace, guaranteeing progress and success.",
          ru: "Курсы, адаптированные под ваш индивидуальный стиль обучения и темп, гарантирующие прогресс и успех.",
          fr: "Des cours adaptés à votre style et à votre rythme d'apprentissage individuels, garantissant des progrès.",
        }),
      },
      business: {
        title: t({
          en: "Business English",
          ru: "Деловой английский",
          fr: "Anglais des affaires",
        }),
        description: t({
          en: "Course focused on developing the key skills necessary for a successful career.",
          ru: "Курс, направленный на развитие ключевых навыков, необходимых для успешной карьеры.",
          fr: "Cours axé sur le développement des compétences clés nécessaires pour une carrière réussie.",
        }),
      },
      group: {
        title: t({
          en: "Group lessons",
          ru: "Групповые занятия",
          fr: "Cours en groupe",
        }),
        description: t({
          en: "Lessons in a group of up to 8 people. A lot of conversational practice. Interactive learning materials.",
          ru: "Занятия в группе до 8 человек. Много разговорной практики. Интерактивные учебные материалы.",
          fr: "Leçons en groupe jusqu'à 8 personnes. Beaucoup de pratique de la conversation.",
        }),
      },
    },
    ctaCards: {
      tutor: {
        title: t({
          en: "Become A Tutor",
          ru: "Стать преподавателем",
          fr: "Devenir tuteur",
        }),
        description: t({
          en: "Top tutors from around the world teach hundreds of students different international languages.",
          ru: "Лучшие преподаватели со всего мира обучают сотни студентов различным иностранным языкам.",
          fr: "Les meilleurs tuteurs du monde entier enseignent à des centaines d'étudiants différentes langues internationales.",
        }),
        button: t({
          en: "Register as a tutor",
          ru: "Зарегистрироваться как преподаватель",
          fr: "S'inscrire comme tuteur",
        }),
      },
      newsletter: {
        title: t({
          en: "Become a student",
          ru: "Стать учеником",
          fr: "Devenir étudiant",
        }),
        description: t({
          en: "Learning a language is not an obligation. This is an opportunity. And we've made it accessible. Start today. No pressure. No deadline. Without fear.",
          ru: "Изучение языка не обязательно. Это возможность. И мы сделали его доступным. Начните сегодня. Без давления. Без срока. Без страха.",
          fr: "Apprendre une langue n'est pas une obligation. C'est une opportunité. Et nous l'avons rendu accessible. Commencez aujourd'hui. Sans pression. Sans délai. Sans peur.",
        }),
        button: t({
          en: "Register as instructor",
          ru: "Зарегистрироваться",
          fr: "S'inscrire comme instructeur",
        }),
      },
    },
  },
} satisfies Dictionary;

export default homeContent;
