import { iRobot } from "../../interfaces/interfaces";

export class ApiRobot {
    apiUrl: string;
    constructor(){
        this.apiUrl = 'http://localhost:3400/robot/';
    }

    async getAll(): Promise<iRobot[]> {
        const resp = await fetch(this.apiUrl);
        return await resp.json();
    };

    async getOne(id: iRobot['_id']): Promise<iRobot> {
        const resp = await fetch(this.apiUrl + id);
        return await resp.json();
    };

    async setOne(payload: iRobot): Promise<iRobot> {
        const resp = await fetch(this.apiUrl, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await resp.json();
    };

    async updateOne(id: iRobot['_id'], payload: iRobot): Promise<iRobot> {
        const resp = await fetch(this.apiUrl + id, {
            method: 'PATCH',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await resp.json();
    };

    async deleteOne(id: iRobot['_id']): Promise<iRobot>{
        const resp = await fetch(this.apiUrl + id, {
            method: 'DELETE'
        })
        return await resp.json();
    }
}




