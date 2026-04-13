import { Request, RequestHandler, Response } from "express";
import { ProviderService } from "./provider.service";
import { uploadToCloudinary } from "../../utils/upload";
import { IProviderFilesRequest, IProviderProfilePayload } from "./providerr.interface";

type ProviderFiles = {
  bannerImage?: Express.Multer.File[];
  restaurantLogo?: Express.Multer.File[];
};

const createProfile: RequestHandler = async (req, res) => {
  try {
    const {
      restaurantName,
      address,
      phone,
      description,
      cuisineType,
      openingTime,
      closingTime,
      deliveryArea,
    } = req.body;

    if (!restaurantName?.trim() || !address?.trim() || !phone?.trim()) {
      return res.status(400).json({
        success: false,
        message: "restaurantName, address and phone are required",
      });
    }

    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    // ✅ first check DB/business validation before upload
    const existingProfile = await ProviderService.getMyProviderProfile(req.user.id);
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Provider profile already exists",
      });
    }

    const files = req.files as
      | {
        restaurantLogo?: Express.Multer.File[];
        bannerImage?: Express.Multer.File[];
      }
      | undefined;

    let restaurantLogo: string | undefined;
    let bannerImage: string | undefined;

    if (files?.restaurantLogo?.[0]) {
      restaurantLogo = await uploadToCloudinary(
        files.restaurantLogo[0].buffer,
        "foodhub/providers"
      );
    }

    if (files?.bannerImage?.[0]) {
      bannerImage = await uploadToCloudinary(
        files.bannerImage[0].buffer,
        "foodhub/providers"
      );
    }

    const payload: IProviderProfilePayload = {
      restaurantName,
      address,
      phone,
      description,
      cuisineType,
      openingTime,
      closingTime,
      deliveryArea,
    };

    if (restaurantLogo) payload.restaurantLogo = restaurantLogo;
    if (bannerImage) payload.bannerImage = bannerImage;

    const profile = await ProviderService.createProviderProfile(
      req.user.id,
      payload
    );

    return res.status(201).json({
      success: true,
      message: "Provider profile created successfully",
      data: profile,
    });
  } catch (error: any) {
    console.error("CREATE PROVIDER PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create profile",
      error: error.message,
    });
  }
};


const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const result = await ProviderService.getProviderDashboardStats(req.user!.id);

    return res.status(200).json({
      success: true,
      message: "Provider dashboard stats fetched successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message === "PROVIDER_PROFILE_NOT_FOUND"
          ? "Provider profile not found"
          : "Failed to fetch provider dashboard stats",
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

    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }
    console.log(req.user);

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
  getDashboardStats
};