const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    playerType: {
      type: String,
      enum: ["Beginner", "Intermediate", "Professional"],
      default: "Beginner",
    },
    material: {
      type: String,
      default: "Unknown",
    },
    level: {
      type: String,
      enum: ["Amateur", "Semi-Pro", "Pro"],
      default: "Amateur",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);