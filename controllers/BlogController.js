import Blogs from "../models/Blogs.js";
import { CustomError } from "../utils/CustomError.js";
import { CustomResponse } from "../utils/CusomResponse.js";

const createBlog = async (req, res, next) => {
  const { title, body, author } = req.body;
  const newBlog = new Blogs({ title, body, author });
  try {
    await newBlog.save();
    res.json(CustomResponse(201, "Blog created successfully!", true, newBlog));
  } catch (error) {
    next(error);
  }
};

const getBlogById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await Blogs.findById(id);
    if (!blog) return next(CustomError(404, "Blog not found!", false));
    res.json(CustomResponse(200, "Blog fetched successfully", true, blog));
  } catch (error) {
    next(error);
  }
};

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blogs.find();
    res.json(CustomResponse(200, "Blogs fetched successfully", true, blogs));
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  const { id } = req.params;
  const { title, body, author } = req.body;
  try {
    const updatedBlog = await Blogs.findByIdAndUpdate(
      id,
      { title, body, author },
      { new: true }
    );
    if (!updatedBlog) return next(CustomError(404, "Blog not found!", false));
    res.json(
      CustomResponse(200, "Blog updated successfully", true, updatedBlog)
    );
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedBlog = await Blogs.findByIdAndDelete(id);
    if (!deletedBlog) return next(CustomError(404, "Blog not found!", false));
    res.json(
      CustomResponse(200, "Blog deleted successfully", true, deletedBlog)
    );
  } catch (error) {
    next(error);
  }
};

export default {
  createBlog,
  getBlogById,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
