import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const CLIENT_URL = process.env.CLIENT_URL;

// =====================================================
// PLACE ORDER
// =====================================================
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.user.id,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save();

        const line_items = req.body.items.map(item => ({
            price_data: {
                currency: "INR",
                product_data: { name: item.name },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        // Add delivery fee
        line_items.push({
            price_data: {
                currency: "INR",
                product_data: { name: "Delivery Charges" },
                unit_amount: 2000,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${CLIENT_URL}/verify?orderId=${newOrder._id}`,
            cancel_url: `${CLIENT_URL}/verify?orderId=${newOrder._id}&success=false`,
         

        });
           console.log("CLIENT_URL:", process.env.CLIENT_URL),
            console.log("Success URL:", `${CLIENT_URL}/verify?orderId=test`);

        // Save session_id (optional, Stripe not used in demo)
        await orderModel.findByIdAndUpdate(newOrder._id, {
            session_id: session.id
        });

        return res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log("Error placing order:", error);
        return res.json({ success: false, message: error.message, error });
    }
};

// =====================================================
// VERIFY ORDER (DEMO HACK: payment true immediately)
// =====================================================
const verifyOrder = async (req, res) => {
    try {
        const { orderId } = req.body || req.query;

        if (!orderId) return res.json({ success: false });

        // DEMO: mark payment true instantly
        await orderModel.findByIdAndUpdate(
            orderId,
            { payment: true, status: "Paid" },
            { new: true }
        );

        return res.json({ success: true });
    } catch (error) {
        console.log("VERIFY ERROR:", error);
        return res.json({ success: false });
    }
};

// =====================================================
// GET USER ORDERS
// =====================================================
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ userId: req.user.id })
            .sort({ date: -1 });
        return res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error fetching orders" });
    }
};

// =====================================================
// ADMIN: GET ALL ORDERS
// =====================================================
const listAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().sort({ date: -1 });
        return res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error fetching all orders" });
    }
};

// =====================================================
// ADMIN: UPDATE ORDER STATUS
// =====================================================
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        return res.json({ success: true, message: "Order status updated" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error updating status" });
    }
};

export {
    placeOrder,
    verifyOrder,
    userOrders,
    listAllOrders,
    updateOrderStatus
};
