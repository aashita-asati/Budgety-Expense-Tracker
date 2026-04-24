const express=require("express");
require ('dotenv').config();
const cors=require("cors");
const path=require("path");
const connectDB=require("./config/db");
const authRoutes=require("./routes/authRoutes");
const incomeRoutes=require("./routes/incomeRoutes");
const expenseRoutes=require("./routes/expenseRoutes");
const dashboardRoutes=require("./routes/dashboardRoutes");

const app=express();

//middleware
app.use(express.json());

app.get("/",(req,res) =>{
    res.send("Backend is running")
})
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders: ["Content-Type","Authorization"],

    })
)
connectDB();


app.use ("/api/v1/auth", authRoutes);
app.use("/api/v1/income",incomeRoutes);
app.use("/api/v1/expense",expenseRoutes);
app.use("/api/v1/dashboard",dashboardRoutes);

//server uploads
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
const PORT=process.env.PORT ||8000;
app.listen(PORT,()=>console.log(`Server Running on port ${PORT}`));