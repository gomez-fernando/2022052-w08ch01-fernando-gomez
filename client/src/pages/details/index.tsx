import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { iRobot, iStore } from "../../interfaces/interfaces";
import { ApiRobot } from "../../services/robot/api";
import * as robotActions from '../../reducers/robot/action.creators'


export default function DetailsPage(){
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const apiRobot = new ApiRobot;
    const robots = useSelector((store: iStore) => store.robots)
    const robot = robots.find(item => item._id === id);

    // const goBack = () => navigate(-1);
    const edit = () => navigate(`/edit/${id}`);
    const delRobot = async () => {
        const resp = await apiRobot.deleteOne(robot?._id);
        dispatch(robotActions.deleteRobotAction(robot as iRobot))
        navigate(`/`);
    }

    return (
        <div className="details-page">
            {robot ? (
                <>
                    <h1>{robot.name}</h1>
                    <img src={robot.image} alt={robot.name} />

                    <div>
                        <p>Velocidad: {robot.speed}</p>
                        <p>Resistencia: {robot.endurance}</p>
                        <p>Fecha de creación: {robot.creationDate}</p>
                    </div>
                </>
            ) : (
                <h1>No se ha encontrado este robot..</h1>
            )
            }
            <button onClick={edit}>Editar</button>
            <button onClick={delRobot}>Borrar</button>
        </div>
    )
}