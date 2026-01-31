import { Router } from 'express';
import { Role } from '../../../generated/prisma/enums';
import auth from '../../middleware/auth';
import { ProviderController } from './provider.controller';

const router = Router()
router.get("/", ProviderController.getProviders);
router.get("/:id", ProviderController.getProvider);

router.post("/profile", auth(Role.PROVIDER), ProviderController.createProfile)
router.get("/dashboard", auth(Role.PROVIDER), ProviderController.getMyProfile)


export const providerRouter: Router = router;