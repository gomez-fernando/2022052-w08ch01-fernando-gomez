import { createAction } from "@reduxjs/toolkit";
import { iRobot } from "../../interfaces/interfaces";
import { actionTypes } from "./action.types";


export const loadRobotsAction = createAction<iRobot[]>(
    actionTypes['robot@load']
);

export const addRobotAction = createAction<iRobot>(
    actionTypes['robot@add']
);

export const updateRobotAction = createAction<iRobot>(
    actionTypes['robot@update']
);

export const deleteRobotAction = createAction<iRobot>(
    actionTypes['robot@delete']
);