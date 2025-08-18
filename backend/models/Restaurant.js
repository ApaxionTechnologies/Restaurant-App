import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageUrl: String,
  prepTime: Number,
});

const addressSchema = new mongoose.Schema(
  {
    line1: String,
    line2: String,
    country: String,
    state: String,
    city: String,
  },
  { _id: false }
);

const restaurantSchema = new mongoose.Schema({
  restaurantName: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contact: { type: String, required: true },
  address: addressSchema,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  tables: { type: Number, default: 0 },
  menu: { type: Array, default: [] },
});

// ✅ Yeh line OverwriteModelError se bachayegi
const Restaurant =
  mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
