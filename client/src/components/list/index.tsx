import { url } from "inspector";
import { iRobot } from "../../interfaces/interfaces";
import { Card } from "../card";


export function List({data}: {data: iRobot[]}) {
    return (
        <ul>
            {data.map(item => (
                <li key={item._id}>
                    <Card robot={item}/>
                </li>
                ))
            }
        </ul>
    )
}