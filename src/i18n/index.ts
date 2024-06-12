import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en/translation';
import ru from './ru/translation';

export const resources = {
  en,
  ru,
};

export const defaultNS = 'common';
const getLang = (): string | undefined => {
  if (typeof window !== 'undefined') {
    if (localStorage !== undefined) {
      if (localStorage.getItem('lang') === null) {
        localStorage.setItem('lang', 'ru');
        return 'ru';
      } else {
        return localStorage.getItem('lang') ?? 'ru';
      }
    }
  }
  return 'ru';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getLang(),
    interpolation: {
      escapeValue: false,
    },
    defaultNS,
  })
  .catch((e) => console.error(e));

export default i18n;

export const changeLanguageHandler = async (lang: string): Promise<void> => {
  await i18n.changeLanguage(lang);
  localStorage.setItem('lang', `${lang}`);
};

export type TranslationType = typeof ru;
export type ErrorCodes = keyof TranslationType['error'];
export const isErrorCode = (x: unknown): x is ErrorCodes => {
  if (typeof x !== 'string') return false;
  return Object.keys(ru.error).includes(x);
};
