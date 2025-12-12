import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.json({
            success: false,
            message: "Not authorized, login again"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // normalize all possible ID keys
        const userId =
            decoded.id ||
            decoded._id ||
            decoded.userId ||
            decoded.user_id;

        if (!userId) {
            return res.json({
                success: false,
                message: "Invalid token structure"
            });
        }

        req.user = { id: userId };
        req.userId = userId;

        next();
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default authMiddleware;
