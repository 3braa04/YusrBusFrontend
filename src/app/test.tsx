import { useState } from "react";
import EditBranchDialog from "./features/branches/presentation/components/ChangeBranchDialog";

export default function Testing()
{
    const [name, setName] = useState("Ahmed");

    return <div>
        <button onClick={()=>setName(`${name == "Ahmed"? "Yaroup" : "Ahmed"}`)}>Click me</button>
        <h3>{name}</h3>
        <EditBranchDialog/>
    </div>;


}