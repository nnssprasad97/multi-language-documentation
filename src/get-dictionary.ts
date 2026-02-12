import 'server-only';

const dictionaries = {
    en: () => import('../public/locales/en/common.json').then((module) => module.default),
    es: () => import('../public/locales/es/common.json').then((module) => module.default),
    fr: () => import('../public/locales/fr/common.json').then((module) => module.default),
    de: () => import('../public/locales/de/common.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
    if (dictionaries[locale as keyof typeof dictionaries]) {
        return dictionaries[locale as keyof typeof dictionaries]();
    }
    return dictionaries.en();
};
