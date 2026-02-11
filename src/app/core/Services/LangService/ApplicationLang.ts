import AppText from './ar_app_text.json'
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
    static getArabic() {
        // const userLang:string = this.getUserLang();
        // if(userLang == enLangs.ar)

        return AppText ;
    }
}