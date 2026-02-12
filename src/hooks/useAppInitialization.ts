import ApplicationLang from "@/app/core/Services/LangService/ApplicationLang";
import { enLangs } from "@/app/core/Services/LangService/enLangs";
import { useEffect, useState } from "react";

export default function useAppInitialization()
{
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{
    const userLang = ApplicationLang.getUserLang();
      console.log("language is ", userLang);

    if(!userLang) 
    {
      ApplicationLang.setUserLang(enLangs.ar);
      console.log("language updated");
    }

    setLoading(false);
    },[])

    return {isLoading};
}

