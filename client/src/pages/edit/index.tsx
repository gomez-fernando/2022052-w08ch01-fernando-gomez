import { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { iRobot, iStore } from "../../interfaces/interfaces";
import { ApiRobot } from "../../services/robot/api";
import * as robotActions from '../../reducers/robot/action.creators'


export default function editPage(){
    const { id } = useParams();


    const robots = useSelector((store: iStore) => store.robots)
    const robot = robots.find(item => item._id === id);

    const dispatch = useDispatch();
    const apiRobot = new ApiRobot();
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    


    let initialState: iRobot = {
        name: '',
        image: '',
        speed: 0,
        endurance: 0,
        creationDate: '',
    };
    initialState = {...robot as iRobot};

    // if (initialState._id) delete initialState._id;

    const [formData, setFormData] = useState(initialState as iRobot);

    const handleChange = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        const value = element.value;
        setFormData({...formData, [element.name]: value});
    };

    const handleSubmit = async (ev: SyntheticEvent) => {
        ev.preventDefault();
        let updatedRobot: iRobot = {...formData as iRobot};

        updatedRobot = await apiRobot.updateOne( (robot as iRobot)._id , updatedRobot);
        dispatch(robotActions.updateRobotAction(updatedRobot));
        // // setFormData(initialState);
        navigate(`/details/${updatedRobot._id}`);
    }

    return (
        <div className="edit-page">
            {robot ? (
                <>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input 
                                type="text" 
                                name="name"
                                placeholder="Nombre del robot"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <input 
                                type="text" 
                                name="image"
                                placeholder="url de la imagen"
                                value={formData.image}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Velocidad </label>
                            <input 
                                type="number" 
                                name="speed"
                                min="0"
                                max="10"
                                value={formData.speed}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Resistencia </label>
                            <input 
                                type="number" 
                                name="endurance"
                                min="0"
                                max="10"
                                value={formData.endurance}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <input 
                                type="text" 
                                name="creationDate"
                                placeholder="Fecha de creación"
                                value={formData.creationDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit">Guardar cambios</button>

                    </form>
                </>
            ) : (
                <>
                    <h1>No se ha encontrado este robot..</h1>
                    <button onClick={goBack}>Volver</button>
                </>
            )
            }
        </div>
    )
}
