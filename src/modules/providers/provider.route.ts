import { Router } from 'express';
import { Role } from '../../../generated/prisma/enums';
import auth from '../../middleware/auth';
import { ProviderController } from './provider.controller';

const router = Router()
// PROVIDER

router.post("/profile", auth(Role.PROVIDER), ProviderController.createProfile)
router.get("/dashboard", auth(Role.PROVIDER), ProviderController.getMyProfile)


export const providerRouter: Router = router;