const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
    menuId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
},{ timestamps: true });

module.exports = mongoose.model("MenuItem", MenuItemSchema);
