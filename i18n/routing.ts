import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['en', 'fr', 'ru'],

    // Used when no locale matches
    defaultLocale: 'en',

    // Always prefix the locale in the URL
    localePrefix: 'always'
});