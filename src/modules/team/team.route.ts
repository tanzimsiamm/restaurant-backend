import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TeamValidation } from './team.validation';
import { TeamController } from './team.controller';

const router = Router();

router.post(
  '/',
  validateRequest(TeamValidation.createTeamValidationSchema),
  TeamController.createTeamMember,
);

router.get('/', TeamController.getAllTeamMembers);

router.get('/:id', TeamController.getTeamMemberById);

router.patch(
  '/:id',
  validateRequest(TeamValidation.updateTeamValidationSchema),
  TeamController.updateTeamMember,
);

router.delete('/:id', TeamController.deleteTeamMember);

export const TeamRoutes = router;