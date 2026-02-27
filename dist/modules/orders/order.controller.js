import { OrderServices } from "./order.service";
const addToCart = async (req, res) => {
    try {
        const customerId = req.user.id;
        const { mealId } = req.body;
        if (!mealId) {
            return res.status(400).json({
                success: false,
                message: "mealId is required",
            });
        }
        const result = await OrderServices.addToCart(customerId, mealId);
        res.status(200).json({
            success: true,
            message: "Added to cart",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
const getMyCart = async (req, res) => {
    try {
        const customerId = req.user.id;
        const cart = await OrderServices.getMyCart(customerId);
        res.status(200).json({
            success: true,
            data: cart,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
const updateQuantity = async (req, res) => {
    try {
        const cartItemId = req.params.id;
        const { quantity } = req.body;
        const customerId = req.user.id;
        const result = await OrderServices.updateQuantity(customerId, cartItemId, quantity);
        res.json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
// const createOrder = async (req: Request, res: Response) => {
//   try {
//     const { items, address } = req.body;
//     if (!items || !items.length || !address) {
//       return res.status(400).json({
//         message: "Items and address are required",
//       });
//     }
//     const order = await OrderServices.createOrder(req.user!.id, items, address);
//     res.status(201).json({
//       success: true,
//       data: order,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       message: error.message || "Failed to create order",
//     });
//   }
// };
const createOrder = async (req, res) => {
    try {
        const customerId = req.user.id;
        const { address } = req.body;
        if (!address) {
            return res.status(400).json({
                success: false,
                message: "Address is required",
            });
        }
        const order = await OrderServices.createOrder(customerId, address);
        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: order,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to create order",
        });
    }
};
const getMyOrders = async (req, res) => {
    try {
        const orders = await OrderServices.getCustomerOrders(req.user.id);
        res.json({
            success: true,
            data: orders,
        });
    }
    catch {
        res.status(500).json({
            message: "Failed to fetch orders"
        });
    }
};
const getOrderById = async (req, res) => {
    try {
        const order = await OrderServices.getOrderById(req.user.id, req.params.id);
        res.json({
            success: true,
            data: order,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message || "Order not found",
        });
    }
};
export const OrderController = {
    addToCart,
    getMyCart,
    updateQuantity,
    createOrder,
    getMyOrders,
    getOrderById
};
//# sourceMappingURL=order.controller.js.map