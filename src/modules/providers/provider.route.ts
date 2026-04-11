import { Router } from 'express';
import { Role } from '../../../generated/prisma/enums';
import auth from '../../middleware/auth';
import { ProviderController } from './provider.controller';

const router = Router()
router.get("/providers", ProviderController.getProviders);
router.get("/providers/:id", ProviderController.getProvider);

router.post("/provider/profile", auth(Role.PROVIDER), ProviderController.createProfile);

router.get("/provider/dashboard", auth(Role.PROVIDER), ProviderController.getMyProfile);

router.patch("/provider/profile", auth(Role.PROVIDER), ProviderController.updateProfile);

router.get(
  "/provider/orders",
  auth(Role.PROVIDER),
  ProviderController.getOrders,
);

router.patch(
  "/provider/order/:id",
  auth(Role.PROVIDER),
  ProviderController.updateOrderStatus,
);


export const providerRouter: Router = router;