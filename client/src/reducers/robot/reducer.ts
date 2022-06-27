import { createReducer } from "@reduxjs/toolkit";
import { iRobot } from "../../interfaces/interfaces";
import * as actions from './action.creators'


const initialState = [] as iRobot[];

export const robotReducer = createReducer(initialState, (builder) =>  builder
    .addCase(actions.loadRobotsAction, (_state, action) => [
        ...action.payload
    ])
    .addCase(actions.addRobotAction, (state, action) => [
        ...state,
        action.payload
    ])
    .addCase(actions.updateRobotAction, (state, action) => 
        state.map((item) => 
            item._id === action.payload._id ? action.payload : item
        )
    )
    .addCase(actions.deleteRobotAction, (state, action) => 
        state.filter(item => item._id !== action.payload._id)
    )
    .addDefaultCase(state => state)
);