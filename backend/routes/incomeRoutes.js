const express=require ("express")
const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
}=require("../controllers/incomeControllers")
const {protect}=require ("../middleWare/authMiddleware")

const router=express.Router();

router.post("/add", protect,addIncome);

router.get("/get",protect, getAllIncome);

router.get("/downloadexcel", protect,downloadIncomeExcel);

router.delete("/:id",protect,deleteIncome);

module.exports=router;