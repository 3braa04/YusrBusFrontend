import AppText from './app_text.json';
import { LangConstants } from './LangConstants';
import type { Languages } from './Languages';

export default class ApplicationLang
{
    static setUserLang(lang:Languages)
    {
        localStorage.setItem(LangConstants.langKey,lang);
    }
    static getUserLang()
    {
        return localStorage.getItem(LangConstants.langKey);
    }
    static getAppLangText() {
        const userLang:string = this.getUserLang() || 'ar';
        return AppText[userLang as keyof typeof AppText] ;
    }
}

