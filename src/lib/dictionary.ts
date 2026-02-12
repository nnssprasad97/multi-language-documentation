import 'server-only';
import fs from 'fs/promises';
import path from 'path';

const dictionaries = {
    en: () => fs.readFile(path.join(process.cwd(), 'public/locales/en.json'), 'utf8').then((res) => JSON.parse(res)),
    es: () => fs.readFile(path.join(process.cwd(), 'public/locales/es.json'), 'utf8').then((res) => JSON.parse(res)),
    fr: () => fs.readFile(path.join(process.cwd(), 'public/locales/fr.json'), 'utf8').then((res) => JSON.parse(res)),
    de: () => fs.readFile(path.join(process.cwd(), 'public/locales/de.json'), 'utf8').then((res) => JSON.parse(res)),
};

export const getDictionary = async (locale: string) => {
    // Default to 'en' if locale is not found
    if (!dictionaries[locale as keyof typeof dictionaries]) {
        return dictionaries.en();
    }
    return dictionaries[locale as keyof typeof dictionaries]();
};
