import { Link } from "react-router-dom";
import { isPartiallyEmittedExpression, isTemplateExpression } from "typescript";
import { iRobot } from "../../interfaces/interfaces";


export function Card({robot}: {robot: iRobot}) {
    return (
        <div className="card-container">
            <div>
            <Link to={`details/${robot._id}`} >
                <img src={robot.image} alt={robot.name} />
            </Link>
            </div>
            <div>{robot.name}</div>
        </ div>
    )
}