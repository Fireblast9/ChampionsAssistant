"use client";

import { FaRegTrashAlt } from "react-icons/fa";
import { deleteTeam } from "../../actions";

export default function DeleteButton({ id} : Readonly<{id: Readonly<string>}>){
    return (
        <button type="button" className="ml-auto px-4 py-3 opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer" onClick={()=> deleteTeam(id)}><FaRegTrashAlt /></button>
    )
}