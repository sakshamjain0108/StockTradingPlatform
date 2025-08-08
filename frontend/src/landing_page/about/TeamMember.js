import { useState } from "react";

function TeamMember({imgLink,naam,position,desc}){
    let [arrow,changeArrow] = useState(false);
    
        let ToggleArrow = ()=>{
            // let arr = <i class="fa-solid fa-angle-up"></i>;
            changeArrow(!arrow);
        }
    return(
        <div>
            <img src={`Media/${imgLink}`} alt="" />
            <h1>{naam}</h1>
            <h2>{position}</h2>
            <div onClick={ToggleArrow}>{!arrow?
                <div>
                    <p>Bio</p>
                    <i class="fa-solid fa-angle-up"></i>
                </div>:
                <div>
                    <p>Bio</p>
                    <i class="fa-solid fa-angle-down"></i>
                    <p>{desc}</p>
                </div>}</div>
        </div>
    )
}

export default TeamMember;