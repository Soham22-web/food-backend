import userModel from "../models/userModel.js";

// ADD TO CART
const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;          // FIXED
        const itemId = req.body.itemId;

        let userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// REMOVE FROM CART
const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;          // FIXED
        const itemId = req.body.itemId;

        let userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Removed from Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// GET USER CART DATA
const getCart = async (req, res) => {
    try {
        const userId = req.user.id;          // FIXED

        let userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export {
    addToCart,
    removeFromCart,
    getCart
};
