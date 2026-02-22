import ApplicationLang from "@/app/core/Services/LangService/ApplicationLang";
import { Languages } from "@/app/core/Services/LangService/Languages";
import { useEffect, useState } from "react";

export default function useAppInitialization()
{
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{
    const userLang = ApplicationLang.getUserLang();
      console.log("language is ", userLang);

    if(!userLang) 
    {
      ApplicationLang.setUserLang(Languages.ar);
      console.log("language updated");
    }

    setLoading(false);
    },[])

    return {isLoading};
}

