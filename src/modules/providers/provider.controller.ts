import { Request, Response } from "express";
import { ProviderService } from "./provider.service";


const createProfile = async (req: Request, res: Response) => {
  try {
    const { restaurantName, address, phone } = req.body;

    if (!restaurantName || !address) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const profile = await ProviderService.createProviderProfile(
      req.user.id,
      restaurantName,
      address,
      phone
    );

    return res.status(201).json({
      success: true,
      data: profile,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to create profile",
    });
  }
};

const getMyProfile = async (req: Request, res: Response) => {
  console.log("provider", req.user)
  const profile = await ProviderService.getMyProviderProfile(req.user!.id);

  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  res.json({ success: true, data: profile });
};

const getProviders = async (_req: Request, res: Response) => {
  const providers = await ProviderService.getAllProviders();
  res.json({ success: true, data: providers });
};


const getProvider = async (req: Request, res: Response) => {
  const provider = await ProviderService.getProviderById(
    req.params.id as string,
  );

  if (!provider) {
    return res.status(404).json({ message: "Provider not found" });
  }

  res.json({ success: true, data: provider });
};


// orders
const getOrders = async (req: Request, res: Response) => {
  const profile = await ProviderService.getMyProviderProfile(req.user!.id);

  console.log(profile)

  if (!profile) {
    return res.status(403).json({ message: "No provider profile" });
  }

  const orders = await ProviderService.getProviderOrders(profile.id);
  console.log(orders)
  res.json({ success: true, data: orders });
};

//  update order status
const updateOrderStatus = async (req: Request, res: Response) => {
  const { status } = req.body;

  const profile = await ProviderService.getMyProviderProfile(req.user!.id);
  if (!profile) {
    return res.status(403).json({ message: "No provider profile" });
  }

  const result = await ProviderService.updateOrderStatus(
    req.params.id as string,
    profile.id,
    status,
  );

  // if (result.count === 0) {
  //   return res.status(403).json({ message: "Not allowed" });
  // }

  res.json({ success: true, data: result });
};


export const ProviderController = {
    createProfile,
    getMyProfile,
    getProviders,
    getProvider,
    getOrders,
    updateOrderStatus
}