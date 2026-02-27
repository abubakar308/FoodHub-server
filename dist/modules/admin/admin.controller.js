import { AdminService } from "./admin.service";
const getAllUsers = async (req, res) => {
    try {
        const users = await AdminService.getAllUsers();
        res.json({ success: true, data: users });
    }
    catch {
        res.status(500).json({ message: "Failed to fetch users" });
    }
};
const updateUserStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;
        if (!status) {
            return res.status(400).json({ message: "Status required" });
        }
        const user = await AdminService.updateUserStatus(id, status);
        res.json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message || "Failed to update user status",
        });
    }
};
const getAllOrders = async (req, res) => {
    try {
        const orders = await AdminService.getAllOrders();
        res.json({ success: true, data: orders });
    }
    catch {
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};
export const AdminController = {
    getAllUsers,
    updateUserStatus,
    getAllOrders
};
//# sourceMappingURL=admin.controller.js.map