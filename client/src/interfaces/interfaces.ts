/* eslint-disable no-undef */
export interface iRobot{
    _id?: string;
    name: string;
    image: string;
    speed: number;
    endurance: number;
    creationDate: string
}

export interface iStore{
    robots: iRobot[];
}

export interface iRouterItem {
    path: string;
    label: string;
    page: JSX.Element;
}

