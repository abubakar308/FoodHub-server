import { ProviderService } from "./provider.service";
const createProfile = async (req, res) => {
    try {
        const { restaurantName, address, phone } = req.body;
        if (!restaurantName || !address) {
            return res.status(400).json({ message: "Missing fields" });
        }
        const profile = await ProviderService.createProviderProfile(req.user.id, restaurantName, address, phone);
        return res.status(201).json({
            success: true,
            data: profile,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create profile",
        });
    }
};
const getMyProfile = async (req, res) => {
    console.log("provider", req.user);
    const profile = await ProviderService.getMyProviderProfile(req.user.id);
    if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
    }
    res.json({ success: true, data: profile });
};
const getProviders = async (_req, res) => {
    const providers = await ProviderService.getAllProviders();
    res.json({ success: true, data: providers });
};
const getProvider = async (req, res) => {
    const provider = await ProviderService.getProviderById(req.params.id);
    if (!provider) {
        return res.status(404).json({ message: "Provider not found" });
    }
    res.json({ success: true, data: provider });
};
// orders
const getOrders = async (req, res) => {
    const profile = await ProviderService.getMyProviderProfile(req.user.id);
    console.log(profile);
    if (!profile) {
        return res.status(403).json({ message: "No provider profile" });
    }
    const orders = await ProviderService.getProviderOrders(profile.id);
    console.log(orders);
    res.json({ success: true, data: orders });
};
//  update order status
const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    const profile = await ProviderService.getMyProviderProfile(req.user.id);
    if (!profile) {
        return res.status(403).json({ message: "No provider profile" });
    }
    const result = await ProviderService.updateOrderStatus(req.params.id, profile.id, status);
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
};
//# sourceMappingURL=provider.controller.js.map