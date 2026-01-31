import { Request, Response } from "express";
import { providService } from "./provider.service";

const createProfile = async (req: Request, res: Response) => {
  try {
    const { restaurantName, address, phone } = req.body;

    if (!restaurantName || !address) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const profile = await providService.createProviderProfile(
      req.user!.id,
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


export const ProviderController = {
    createProfile
}