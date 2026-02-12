import AppText from './app_text.json'
import { enLangs } from './enLangs';
import { LangConstants } from './LangConstants';

export default class ApplicationLang
{
    static setUserLang(lang:enLangs)
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

