import request from 'supertest';
import express from 'express';
import HomeController from '@controllers/HomeController';
import User from '@models/User';
import UserService from '@services/UserService';
import { MockRequest, MockResponse } from '../../src/types';

// Mock the User model and UserService
jest.mock('@models/User');
jest.mock('@services/UserService');

describe('HomeController', () => {
  let app: express.Application;
  let homeController: HomeController;
  let mockUserService: jest.Mocked<UserService>;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    homeController = new HomeController();

    // Get the mocked UserService instance
    mockUserService = (homeController as any).userService;

    // Clear all mocks
    jest.clearAllMocks();
  });

  describe('getCollectionResponse', () => {
    it('should return collection of users successfully', async () => {
      const mockUsers = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
      ];

      mockUserService.getAllUsers = jest.fn().mockResolvedValue(mockUsers);

      const req: MockRequest = {};
      const res: MockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await homeController.getCollectionResponse(req as any, res as any);

      expect(mockUserService.getAllUsers).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: expect.any(Object),
        error: {},
        success: true,
        message: 'Operation Successful',
      });
    });

    it('should handle database errors gracefully', async () => {
      const error = new Error('Database connection failed');
      mockUserService.getAllUsers = jest.fn().mockRejectedValue(error);

      const req: MockRequest = {};
      const res: MockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await homeController.getCollectionResponse(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        data: {},
        error: {
          message: 'Database connection failed',
          code: 500,
        },
        success: false,
        message: 'Database connection failed',
      });
    });
  });

  describe('getSingleResponse', () => {
    it('should create and return a new user successfully', async () => {
      const mockUser = { id: 1, name: 'John Doe' };
      mockUserService.createUser = jest.fn().mockResolvedValue(mockUser);

      const req: MockRequest = {
        body: { name: 'John Doe' },
      };
      const res: MockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await homeController.getSingleResponse(req as any, res as any);

      expect(mockUserService.createUser).toHaveBeenCalledWith({
        name: 'John Doe',
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        data: expect.any(Object),
        error: {},
        success: true,
        message: 'User created successfully',
      });
    });

    it('should handle validation errors', async () => {
      const error = new Error('Validation failed');
      (error as any).status = 422;
      mockUserService.createUser = jest.fn().mockRejectedValue(error);

      const req: MockRequest = {
        body: { name: '' },
      };
      const res: MockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await homeController.getSingleResponse(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({
        data: {},
        error: {
          message: 'Validation failed',
          code: 422,
        },
        success: false,
        message: 'Validation failed',
      });
    });
  });

  describe('getErrorResponse', () => {
    it('should throw sample exception for testing', async () => {
      const req: MockRequest = {};
      const res: MockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await homeController.getErrorResponse(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        data: {},
        error: {
          message: 'Test Exception',
          code: 422,
        },
        success: false,
        message: 'Test Exception',
      });
    });
  });
});
