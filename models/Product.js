const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        unique: true,
      },
      price: {
        type: String,
        required: true,
      },
      category: [
        {
          type: String,
          enum: ["veg", "non-veg"],
        },
      ],
      bestseller: {
         
        type: String,

      },
      description: {
        type: String,
      },
      image: {
        type: String,
      },
      firm: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Firm"
        },
      ],
    

});

const Product = mongoose.model("Products", productSchema);

module.exports = Product;