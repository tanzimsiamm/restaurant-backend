import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TeamService } from './team.service';

const createTeamMember = catchAsync(async (req: Request, res: Response) => {
  const result = await TeamService.createTeamMember(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Team member created successfully',
    data: result,
  });
});

const getAllTeamMembers = catchAsync(async (req: Request, res: Response) => {
  const result = await TeamService.getAllTeamMembers(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Team members retrieved successfully',
    data: result,
  });
});

const getTeamMemberById = catchAsync(async (req: Request, res: Response) => {
  const result = await TeamService.getTeamMemberById(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Team member retrieved successfully',
    data: result,
  });
});

const updateTeamMember = catchAsync(async (req: Request, res: Response) => {
  const result = await TeamService.updateTeamMember(req.params.id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Team member updated successfully',
    data: result,
  });
});

const deleteTeamMember = catchAsync(async (req: Request, res: Response) => {
  await TeamService.deleteTeamMember(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Team member deleted successfully',
    data: null,
  });
});

export const TeamController = {
  createTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
};