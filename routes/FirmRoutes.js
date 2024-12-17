const express = require("express");
const FirmController = require("../controllers/FirmController");
const verifyToken = require("../middlewares/verifyToken");
const { deleteFirmById } = require("../controllers/ProductControllers");

const router = express.Router();

router.post("/add-firm", verifyToken, FirmController.addFirm);
router.get("/upload/:imageName", (req, res)=>{
    const imageName = req.params.imageName;
    req.headersSent("content-Type", "image/jpeg");
    res.sendFile(path.join(__dirname, "..", "uploads", imageName));

});
router.delete("/:firmId", FirmController.deleteFirmById);

module.exports = router;

