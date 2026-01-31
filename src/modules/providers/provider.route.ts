import { Router } from 'express';
import { Role } from '../../../generated/prisma/enums';
import auth from '../../middleware/auth';
import { ProviderController } from './provider.controller';

const providerRouter = Router()
// PROVIDER

providerRouter.post("/provider/profile", auth(Role.PROVIDER), ProviderController.createProfile)


export default providerRouter;