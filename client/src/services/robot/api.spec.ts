import {iRobot} from '../../interfaces/interfaces';
import { ApiRobot } from './api';

const api = new ApiRobot();

const robot1: iRobot = {
    _id: '62b8e1b3b42b44430f283f4b',
    name: 'Robocop',
    image: 'https://m.media-amazon.com/images/I/91IZIG74ZiL._SY679_.jpg',
    speed: 6,
    endurance: 8,
    creationDate: '1980',
};

const wrong = {
    noway: 23,
    noway2: true
};

describe('Given the ApiRobot service', () => {
    describe('When we call getAll method', () => {
        test('Should return a robots array ', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue([robot1])
            });
            const resp = await api.getAll();
            expect(resp).toStrictEqual([robot1]);
            expect(resp).toHaveLength(1)
        });
    });
    describe('When we call getOne method', () => {
        test('should return a robot', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(robot1)
            });
            const resp = await api.getAll();
            expect(resp).toStrictEqual(robot1);
        })
    });
    describe('When we call setOne method', () => {
        test('should return the setted robot', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(robot1)
            });
            const resp = await api.setOne(robot1);
            expect(resp).toStrictEqual(robot1);
        });
    });
    describe('When we call updateOne method with wrong params', () => {
        test('should return an error', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(robot1)
            });
            const resp = await api.setOne( wrong as unknown as iRobot);
            expect(resp).toBe(
                {
                    status: 406,
                    type: "ValidationError",
                    error: "Robot validation failed: name: Path `name` is required."
                }
            );
        });
    });
    describe('When we call updateOne method', () => {
        test('should return the updated robot', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(robot1)
            });
            const resp = await api.updateOne( robot1._id, robot1);
            expect(resp).toStrictEqual(robot1);
        });
    });
    describe('When we call deleteOne method', () => {
        test('should return the robot`s id into an object ', async () => {
           
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue({_id: '62b8e1b3b42b44430f283f4b'})
            });
            const resp = await api.deleteOne(robot1._id);
            expect(resp).toStrictEqual({_id: '62b8e1b3b42b44430f283f4b'});
        });
    });
})

