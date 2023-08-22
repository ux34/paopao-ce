import { createI18n } from 'vue-i18n';
import zh from './zh.json'
import en from './en.json'
export const locales: Record<string, any> = {
  zh, en
};

export const i18n = createI18n({
  legacy: false,
  locale: 'en', // 默认语言
  messages: locales,
});