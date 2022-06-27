import { configureStore } from "@reduxjs/toolkit";
import { iRobot, iStore } from "../interfaces/interfaces";
import { robotReducer } from "../reducers/robot/reducer";

const preloadedState: iStore = {
    robots: [] as iRobot[]
}

export const store = configureStore({
    reducer: {robots: robotReducer},
    preloadedState
})