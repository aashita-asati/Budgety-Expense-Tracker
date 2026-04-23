const express=require ("express");
const {getDashboardData}=require ("../controllers/dashboardControllers");
const {protect}=require ("../middleWare/authMiddleware");

const router=express.Router();
router.get("/",protect,getDashboardData);

module.exports=router;