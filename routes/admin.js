const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const locals = require('../middleware/locals');
const isAdmin = require('../middleware/isAdmin')


router.get("/products",locals,isAdmin,adminController.getProducts);
router.get("/add-product",locals,isAdmin,adminController.getAddProduct);
router.post("/add-product",locals,isAdmin,adminController.postAddProduct);
router.get("/edit-product/:productid",locals,isAdmin,adminController.getEditProduct);
router.post("/edit-product",locals,isAdmin,adminController.postEditProduct);
router.post("/delete-product",locals,isAdmin,adminController.postDeleteProduct);
module.exports = router;
