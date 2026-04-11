import { Request, Response } from "express";
import { ProviderService } from "./provider.service";

const createProfile = async (req: Request, res: Response) => {
  try {
    const {
      restaurantName,
      restaurantLogo,
      bannerImage,
      address,
      phone,
      description,
      cuisineType,
      openingTime,
      closingTime,
      deliveryArea,
    } = req.body;

    if (!restaurantName || !address || !phone) {
      return res.status(400).json({
        success: false,
        message: "restaurantName, address and phone are required",
      });
    }

    const profile = await ProviderService.createProviderProfile(
      req.user?.id as string,
      {
        restaurantName,
        restaurantLogo,
        bannerImage,
        address,
        phone,
        description,
        cuisineType,
        openingTime,
        closingTime,
        deliveryArea,
      }
    );

    return res.status(201).json({
      success: true,
      message: "Provider profile created successfully",
      data: profile,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message === "PROVIDER_PROFILE_EXISTS"
          ? "Provider profile already exists"
          : "Failed to create profile",
      error: error.message,
    });
  }
};

const getMyProfile = async (req: Request, res: Response) => {
  try {
    const profile = await ProviderService.getMyProviderProfile(req.user!.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to get provider profile",
      error: error.message,
    });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const {
      restaurantName,
      restaurantLogo,
      bannerImage,
      address,
      phone,
      description,
      cuisineType,
      openingTime,
      closingTime,
      deliveryArea,
    } = req.body;

    const profile = await ProviderService.updateProviderProfile(
      req.user?.id as string,
      {
        restaurantName,
        restaurantLogo,
        bannerImage,
        address,
        phone,
        description,
        cuisineType,
        openingTime,
        closingTime,
        deliveryArea,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Provider profile updated successfully",
      data: profile,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message === "PROVIDER_PROFILE_NOT_FOUND"
          ? "Provider profile not found"
          : "Failed to update profile",
      error: error.message,
    });
  }
};

const getProviders = async (_req: Request, res: Response) => {
  try {
    const providers = await ProviderService.getAllProviders();

    return res.status(200).json({
      success: true,
      data: providers,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to get providers",
      error: error.message,
    });
  }
};

const getProvider = async (req: Request, res: Response) => {
  try {
    const provider = await ProviderService.getProviderById(req.params.id as string);

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: provider,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to get provider",
      error: error.message,
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await ProviderService.getProviderOrders(req.user!.id);

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message === "PROVIDER_PROFILE_NOT_FOUND"
          ? "No provider profile found"
          : "Failed to get provider orders",
      error: error.message,
    });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const result = await ProviderService.updateOrderStatus(
      req.params.id as string,
      req.user!.id,
      status
    );

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message === "PROVIDER_PROFILE_NOT_FOUND"
          ? "No provider profile found"
          : error.message === "ORDER_NOT_FOUND"
          ? "Order not found"
          : "Failed to update order status",
      error: error.message,
    });
  }
};

export const ProviderController = {
  createProfile,
  getMyProfile,
  updateProfile,
  getProviders,
  getProvider,
  getOrders,
  updateOrderStatus,
};