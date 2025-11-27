import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { ITeam } from './team.interface';
import Team from './team.model';

const createTeamMember = async (payload: ITeam) => {
  const result = await Team.create(payload);
  return result;
};

const getAllTeamMembers = async (query: { isActive?: string }) => {
  const filter: { isActive?: boolean } = {};

  // Default to active team members only if not specified
  if (query.isActive === undefined) {
    filter.isActive = true;
  } else {
    filter.isActive = query.isActive === 'true';
  }

  console.log('🔍 Team Query:', { query, filter });

  const result = await Team.find(filter).sort({ order: 1 });

  console.log('✅ Team members found:', result.length);

  return result;
};

const getTeamMemberById = async (id: string) => {
  const result = await Team.findById(id);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Team member not found');
  }

  return result;
};

const updateTeamMember = async (id: string, payload: Partial<ITeam>) => {
  const teamMember = await Team.findById(id);

  if (!teamMember) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Team member not found');
  }

  const result = await Team.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteTeamMember = async (id: string) => {
  const teamMember = await Team.findById(id);

  if (!teamMember) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Team member not found');
  }

  const result = await Team.findByIdAndDelete(id);
  return result;
};

export const TeamService = {
  createTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
};