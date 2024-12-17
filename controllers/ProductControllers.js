const Product = require("../models/Product");
const multer = require("multer");
const Firm = require("../models/Firm");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder where the uploaded images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
  },
});

const upload = multer({ storage: storage });

const addProducts = async (req, res) => {
  try {
    const { productName, price, category, bestseller, description } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);
    if (!firm) {
      return res.status(404).json({ error: "No firm found" });
    }
    const product = new Product({
      productName,
      price,
      category,
      bestseller,
      description,
      image,
      firm: firm._id,
    });

    const savedProduct = await product.save();
    firm.products.push(savedProduct);
    await firm.save();
    res.status(200).json({ savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json("internal server error");
  }
};

const getProductsByFirm = async(req,res)=>{
try {
    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);

    if(!firm){
        return res.status(404).json({erroe: "No firm found"});
    }
    const restaurentName = firm.firmName;
    const products = await Product.find({firm: firmId});
    res.status(200).json({restaurentName, products});
    
} catch (error) {
    console.error(error);
    res.status(500).json("internal server error");
    
}

}
const deleteProductById = async(req, res) => {
    try {
        const productId = req.params.productId;

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "No product found" })
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {addProducts:[upload.single("image"), addProducts], getProductsByFirm, deleteProductById};