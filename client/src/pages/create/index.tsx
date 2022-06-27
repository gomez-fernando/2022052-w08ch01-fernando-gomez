import { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { iRobot } from "../../interfaces/interfaces";
import { ApiRobot } from "../../services/robot/api";
import * as robotActions from '../../reducers/robot/action.creators'
import { useNavigate } from "react-router-dom";

export default function Create(){
    const dispatch = useDispatch();
    const apiRobot = new ApiRobot();
    const initialState: iRobot = {
        name: '',
        image: '',
        speed: 0,
        endurance: 0,
        creationDate: '',
    }
    const navigate = useNavigate();

    

    const [formData, setFormData] = useState(initialState);

    const handleChange = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        // const value =
        //     element.type === "checkbox" ? element.checked : element.value;
        const value = element.value;
        setFormData({...formData, [element.name]: value});
    };

    const handleSubmit = async (ev: SyntheticEvent) => {
        ev.preventDefault();
        let newRobot: iRobot = {...formData};
        newRobot = await apiRobot.setOne(newRobot)
        dispatch(robotActions.addRobotAction(newRobot));
        // setFormData(initialState);
        navigate(`/details/${newRobot._id}`);


    }

    return (
        <>
            <form onSubmit={handleSubmit}>
            <div>
                <input 
                    type="text" 
                    name="name"
                    placeholder="Nombre del robot"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <input 
                    type="text" 
                    name="image"
                    placeholder="url de la imagen"
                    value={formData.image}
                    onChange={handleChange}
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
                />
            </div>
            <div>
                <input 
                    type="text" 
                    name="creationDate"
                    placeholder="Fecha de creación"
                    value={formData.creationDate}
                    onChange={handleChange}
                />
            </div>

            <button type="submit">Guardar</button>

        </form>
    </>
    )
}