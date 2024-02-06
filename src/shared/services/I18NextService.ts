import { isBrowser } from "@utils/browser";
import i18next, { Resource } from "i18next";
import { UserService } from "../services";
import { ar } from "../../../lemmy-translations/translations/ar.json";
import { bg } from "../../../lemmy-translations/translations/bg.json";
import { ca } from "../../../lemmy-translations/translations/ca.json";
import { cs } from "../../../lemmy-translations/translations/cs.json";
import { da } from "../../../lemmy-translations/translations/da.json";
import { de } from "../../../lemmy-translations/translations/de.json";
import { el } from "../../../lemmy-translations/translations/el.json";
import { en } from "../../../lemmy-translations/translations/en.json";
import { eo } from "../../../lemmy-translations/translations/eo.json";
import { es } from "../../../lemmy-translations/translations/es.json";
import { eu } from "../../../lemmy-translations/translations/eu.json";
import { fa } from "../../../lemmy-translations/translations/fa.json";
import { fi } from "../../../lemmy-translations/translations/fi.json";
import { fr } from "../../../lemmy-translations/translations/fr.json";
import { ga } from "../../../lemmy-translations/translations/ga.json";
import { gl } from "../../../lemmy-translations/translations/gl.json";
import { hr } from "../../../lemmy-translations/translations/hr.json";
import { id } from "../../../lemmy-translations/translations/id.json";
import { it } from "../../../lemmy-translations/translations/it.json";
import { ja } from "../../../lemmy-translations/translations/ja.json";
import { ko } from "../../../lemmy-translations/translations/ko.json";
import { nl } from "../../../lemmy-translations/translations/nl.json";
import { oc } from "../../../lemmy-translations/translations/oc.json";
import { pl } from "../../../lemmy-translations/translations/pl.json";
import { pt } from "../../../lemmy-translations/translations/pt.json";
import { pt_BR } from "../../../lemmy-translations/translations/pt_BR.json";
import { ru } from "../../../lemmy-translations/translations/ru.json";
import { sv } from "../../../lemmy-translations/translations/sv.json";
import { vi } from "../../../lemmy-translations/translations/vi.json";
import { zh } from "../../../lemmy-translations/translations/zh.json";
import { zh_Hant } from "../../../lemmy-translations/translations/zh_Hant.json";

export const languages = [
  { resource: ar, code: "ar", name: "العربية" },
  { resource: bg, code: "bg", name: "Български" },
  { resource: ca, code: "ca", name: "Català" },
  { resource: cs, code: "cs", name: "Česky" },
  { resource: da, code: "da", name: "Dansk" },
  { resource: de, code: "de", name: "Deutsch" },
  { resource: el, code: "el", name: "Ελληνικά" },
  { resource: en, code: "en", name: "English" },
  { resource: eo, code: "eo", name: "Esperanto" },
  { resource: es, code: "es", name: "Español" },
  { resource: eu, code: "eu", name: "Euskara" },
  { resource: fa, code: "fa", name: "فارسی" },
  { resource: fi, code: "fi", name: "Suomi" },
  { resource: fr, code: "fr", name: "Français" },
  { resource: ga, code: "ga", name: "Gaeilge" },
  { resource: gl, code: "gl", name: "Galego" },
  { resource: hr, code: "hr", name: "Hrvatski" },
  { resource: id, code: "id", name: "Bahasa Indonesia" },
  { resource: it, code: "it", name: "Italiano" },
  { resource: ja, code: "ja", name: "日本語" },
  { resource: ko, code: "ko", name: "한국어" },
  { resource: nl, code: "nl", name: "Nederlands" },
  { resource: oc, code: "oc", name: "Occitan" },
  { resource: pl, code: "pl", name: "Polski" },
  { resource: pt, code: "pt", name: "Português" },
  { resource: pt_BR, code: "pt_BR", name: "Português (Brasil)" },
  { resource: ru, code: "ru", name: "Русский" },
  { resource: sv, code: "sv", name: "Svenska" },
  { resource: vi, code: "vi", name: "Tiếng Việt" },
  { resource: zh, code: "zh", name: "中文 (简体)" },
  { resource: zh_Hant, code: "zh-TW", name: "中文 (繁體)" },
];

const resources: Resource = {};
languages.forEach(l => (resources[l.code] = l.resource));

function format(value: any, format: any): any {
  return format === "uppercase" ? value.toUpperCase() : value;
}

class LanguageDetector {
  static readonly type = "languageDetector";

  detect() {
    const langs: string[] = [];

    const myLang =
      UserService.Instance.myUserInfo?.local_user_view.local_user
        .interface_language ?? "browser";

    if (myLang !== "browser") langs.push(myLang);

    if (isBrowser()) langs.push(...navigator.languages);

    return langs;
  }
}

export class I18NextService {
  #i18n: typeof i18next;
  static #instance: I18NextService;

  private constructor() {
    this.#i18n = i18next;
    this.#i18n.use(LanguageDetector).init({
      debug: false,
      compatibilityJSON: "v3",
      supportedLngs: languages.map(l => l.code),
      nonExplicitSupportedLngs: true,
      // load: 'languageOnly',
      // initImmediate: false,
      fallbackLng: "en",
      resources,
      interpolation: { format },
    });
  }

  static get #Instance() {
    return this.#instance ?? (this.#instance = new this());
  }

  public static get i18n() {
    return this.#Instance.#i18n;
  }
}
