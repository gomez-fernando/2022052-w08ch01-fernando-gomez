import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { RobotController } from './robot.controller';


describe('Given the RobotController', () => {
    let req: Partial<Request>;
    let resp: Partial<Response>;
    let next: Partial<NextFunction> = jest.fn();

    let mockModel = {
        find: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    };
    let robotController = new RobotController(mockModel as unknown as mongoose.Model<{}>);

    beforeEach(() => {
        req = {
            params: { _id: '62b877c394f0db40c11be88f' },
            body: { name: 'robot 1' }
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            end: jest.fn(),
        };
    });
    describe('When method getAll is called', () => {
        test('Then resp.end should be called with mockResult', async () => {
            const mockResult = [{ name: 'robot 1' }];
            (mockModel.find as jest.Mock).mockResolvedValue(mockResult);
            await robotController.getAll(req as Request, resp as Response, next as NextFunction);
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
    });
    describe('When method getById is called', () => {
        test('If success, then resp.end should be called with mockResult', async () => {
            const mockResult = [{ name: 'robot 1' }];
            (mockModel.findById as jest.Mock).mockResolvedValue(mockResult);
            await robotController.getById(req as Request, resp as Response, next as NextFunction);
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
        test('If response is null, then resp.end should be called without mockResult', async () => {
            const mockResult = null;
            (mockModel.findById as jest.Mock).mockResolvedValue(mockResult);
            await robotController.getById(req as Request, resp as Response, next as NextFunction);
            expect(resp.status).toHaveBeenCalledWith(404);
            expect(resp.end).toHaveBeenCalledWith('No object found');
        });
    });
    describe('When method post is called', () => {
        test('If success, then resp.end should be called with mockResult ', async () => {
            const mockResult = [{ name: 'robot 1' }];
            (mockModel.create as jest.Mock).mockResolvedValue(mockResult);
            await robotController.post(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.status).toHaveBeenCalledWith(201)
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
        test('If error, then function next should be called with error', async () => {
            const mockResult = null;
            (mockModel.create as jest.Mock).mockRejectedValue(mockResult);
            await robotController.post(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When patch method is called', () => {
        test('If success then resp.end should be called with mockResult', async () => {
            const mockResult = { name: 'robot 1' };
            (mockModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
                mockResult
            );
            await robotController.patch(req as Request, resp as Response, next as NextFunction);
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
    });
    describe('When delete method is called', () => {
        test('If success, then resp.end should be called with mockResult', async () => {
            const mockResult = { _id: '62b877c394f0db40c11be88f' };
            (mockModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
                mockResult
            );
            await robotController.delete(req as Request, resp as Response, next as NextFunction);
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify({ _id: '62b877c394f0db40c11be88f' }));
        });
        test('If response === null, then resp.end should be called with status Object not found', async () => {
            const mockResult = null;
            (mockModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
                mockResult
            );
            await robotController.delete(req as Request, resp as Response, next as NextFunction);
            expect(resp.status).toHaveBeenCalledWith(400);
            expect(resp.end).toHaveBeenCalledWith('Object not found');
        });
    });
});
