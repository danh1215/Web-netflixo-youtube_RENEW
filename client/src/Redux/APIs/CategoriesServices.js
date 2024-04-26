import Axios from "./Axios";

// ************ PUBLIC APIs ************

// Get all categories API function
const getCategoriesService = async () => {
  const { data } = await Axios.get("/categories");
  return data;
};

// ************ ADMIN APIs ************
 
// create new category API function
const createCategoryService = async (title, token) => {
  const { data } = await Axios.post("/categories", title, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete category API function
const deleteCategoryService = async (id, token) => {
  const { data } = await Axios.delete(`/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// update category API function
const updateCategoryService = async (id, title, token) => {
  const { data } = await Axios.put(`/categories/${id}`, title, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export {
  getCategoriesService,
  createCategoryService,
  deleteCategoryService,
  updateCategoryService,
};
