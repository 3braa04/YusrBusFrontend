import { useState } from "react";

export default function Testing()
{
    const [name, setName] = useState("Ahmed");

    return <div>
        <button onClick={()=>setName(`${name == "Ahmed"? "Yaroup" : "Ahmed"}`)}>Click me</button>
        <h3>{name}</h3>
    </div>;


}