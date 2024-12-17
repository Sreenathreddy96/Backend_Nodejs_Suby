const express = require("express");
const ProductController = require("../controllers/ProductControllers");
const router = express.Router();

router.post("/add-product/:firmId", ProductController.addProducts);
router.get("/:firmId/products", ProductController.getProductsByFirm);
router.get("/upload/:imageName", (req, res)=>{
    const imageName = req.params.imageName;
    req.headersSent("content-Type", "image/jpeg");
    res.sendFile(path.join(__dirname, "..", "uploads", imageName));

});
router.delete("/:productId", ProductController.deleteProductById);


module.exports = router;