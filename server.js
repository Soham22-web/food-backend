import 'dotenv/config.js'

import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// app config
const app = express()
const PORT = 4000

// Middleware
app.use(express.json());
app.use(cors())

// DB connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter)
app.use("/uploads", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/images", express.static('uploads'))
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/",(req, res) => {
    res.send("API is Working")
})

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})
