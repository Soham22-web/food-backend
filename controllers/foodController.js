import foodModel from "../models/foodModel.js";

// Add Food
export const addFood = async (req, res) => {
  try {
    const image_filename = req.file ? req.file.filename : null;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename
    });

    await food.save();
    res.json({ success: true, message: "Food Added Successfully!" });

  } catch (err) {
    res.json({ success: false, message: "Error" });
  }
};

// List Food
export const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });

  } catch (err) {
    res.json({ success: false, message: "Error" });
  }
};

// ---------------- UPDATE FOOD ----------------
export const updateFood = async (req, res) => {
  try {
    const { _id, name, description, price, category } = req.body;

    const food = await foodModel.findById(_id);
    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }

    food.name = name;
    food.description = description;
    food.price = price;
    food.category = category;

    await food.save();

    res.json({ success: true, message: "Food Updated Successfully!" });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
// REMOVE FOOD
export const removeFood = async (req, res) => {
  try {
    const { id } = req.body;
    await foodModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Food removed successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

