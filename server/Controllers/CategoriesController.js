import Categories from "../Models/CategoriesModal.js";
import asyncHandler from "express-async-handler";

// ************ PUBLIC CONTROLLERS ************
// @desc    get all categories
// @route   GET /api/categories
// @access  Public 

const getCategories = asyncHandler(async (req, res) => {
  try {
    // find all categories in database
    const categories = await Categories.find({});
    // send all categories to the client
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ************ ADMIN CONTROLLERS ************

// @desc    create new category
// @route   POST /api/categories
// @access  Private/Admin

const createCategory = asyncHandler(async (req, res) => {
  try {
    // lấy tiêu đề từ nội dung yêu cầu
    const { title } = req.body;
    // Yaoj mới category
    const category = new Categories({
      title,
    });
    // Lưu category trong  database
    const createdCategory = await category.save();
    // Gửi category mới đến client
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    update category
// @route   PUT /api/categories/:id
// @access  Private/Admin

const updateCategory = asyncHandler(async (req, res) => {
  try {
    // lấy id category từ thông số yêu cầu
    const category = await Categories.findById(req.params.id);

    if (category) {
      // update tiêu đề category 
      category.title = req.body.title || category.title;
      // Lưu updated category trong database
      const updatedCategory = await category.save();
      // Gửi updated category đến client
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    // lấy id category từ thông số yêu cầu
    const category = await Categories.findById(req.params.id);

    if (category) {
      // Xóa category từ database
      await category.remove();
      // Gửi tin nhắn "Thành công" đến client
      res.json({ message: "Category removed" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { getCategories, createCategory, updateCategory, deleteCategory };
