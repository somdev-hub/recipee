import React, { useState } from "react";
import "./AddCategory.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Switch from "react-switch";
import { AiOutlinePlus } from "react-icons/ai";

const AddCategory = () => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    category: "",
    ingredients: [],
    tags: [],
    isVeg: false,
    image: null,
    description: "",
    dishes: [
      {
        name: "",
        price: "",
        image: null
      }
    ],
    nutrients: [
      {
        name: "",
        quantity: ""
      }
    ],
    price: "",
    weight: "",
    sellerId: localStorage.getItem("email")
  });
  const [compliance, setCompliance] = useState(false);

  const handleAddNutrient = () => {
    setCategoryData({
      ...categoryData,
      nutrients: [...categoryData.nutrients, { name: "", quantity: "" }]
    });
  };
  const handleNutrientChange = (e, index) => {
    const { name, value } = e.target;
    const newNutrients = [...categoryData.nutrients];
    newNutrients[index] = { ...newNutrients[index], [name]: value };
    setCategoryData({ ...categoryData, nutrients: newNutrients });
  };
  const handleAddDish = () => {
    setCategoryData({
      ...categoryData,
      dishes: [...categoryData.dishes, { name: "", price: "", image: null }]
    });
  };
  const handleDishChange = (e, index) => {
    const { name, value } = e.target;
    const newDishes = [...categoryData.dishes];
    newDishes[index] = { ...newDishes[index], [name]: value };
    setCategoryData({ ...categoryData, dishes: newDishes });
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    if (name === "ingredients" || name === "tags") {
      const values = value.split(",");
      setCategoryData({ ...categoryData, [name]: values });
      return;
    }
    if (name === "image") {
      setCategoryData({ ...categoryData, [name]: e.target.files[0] });
    }

    setCategoryData({ ...categoryData, [name]: value });
  };
  return (
    <div className="add-category flex">
      <Sidebar />
      <div className="add-category-main w-full sm:mt-5 text-white">
        <nav>
          <h2 className="w-full">Share your special category</h2>
        </nav>
        <div className="add-category-container my-10">
          <div className="add-category-form">
            <form action="">
              <div className="add-category-head">
                <input
                  type="text"
                  placeholder="Enter your category title"
                  name="name"
                  value={categoryData.name}
                  onChange={handleCategoryChange}
                />
                <div className="my-5 flex sm:flex-row flex-col gap-5 type-ingredients">
                  <select
                    name="category"
                    value={categoryData.category}
                    id=""
                    onChange={handleCategoryChange}
                  >
                    <option value="">Breakfast</option>
                    <option value="">Lunch</option>
                    <option value="">Snacks</option>
                    <option value="">Dinner</option>
                    <option value="">Dessert</option>
                    <option value="">Spicy</option>
                    <option value="">Main Course</option>
                  </select>
                  {/* <input
                    type="text"
                    className=""
                    placeholder="Category type"
                    name="category"
                  /> */}
                  <input
                    type="text"
                    className=""
                    placeholder="Ingredients"
                    name="ingredients"
                    value={categoryData.ingredients}
                    onChange={handleCategoryChange}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Tags i.e #food"
                  name="tags"
                  value={categoryData.tags}
                  onChange={handleCategoryChange}
                />
                <div className="veg flex items-center mt-5">
                  <p className="text-white mr-3">Non-Vegetarian</p>
                  <Switch
                    onChange={() => setCategoryData(!categoryData.isVeg)}
                    checked={categoryData.isVeg}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onColor="#EF3434"
                    offColor="#34EF47"
                    height={20}
                    width={40}
                  />
                </div>
              </div>
              <div className="add-recipee-details mt-10">
                <div className="pic-upload mt-2 mb-5 flex justify-center items-center p-5 h-24">
                  <p className="text-white">
                    <label htmlFor="pic-input" className="mr-2 cursor-pointer ">
                      Upload{" "}
                    </label>
                    {categoryData.image
                      ? categoryData.image.name
                      : "Category picture"}
                  </p>
                  <input
                    type="file"
                    id="pic-input"
                    accept="image/*"
                    name="image"
                    onChange={handleCategoryChange}
                  />
                </div>
                <p className="mt-10">Write your category description</p>
                <textarea
                  name="description"
                  id=""
                  cols="100"
                  rows="10"
                  className="mt-10 p-3 resize-none w-full"
                  placeholder="Start writing here..."
                  value={categoryData.description}
                  onChange={handleCategoryChange}
                ></textarea>
              </div>
              <div className="category-dishes mt-10">
                <h3>Enter all the dishes</h3>
                <div className="category-dishes-container mt-10">
                  {categoryData.dishes.map((dish, index) => {
                    return (
                      <div
                        className="category-dish flex gap-5 mb-5"
                        key={index}
                      >
                        <input
                          type="text"
                          placeholder="Dish name"
                          name="name"
                          value={dish.name}
                          onChange={(e) => handleDishChange(e, index)}
                        />
                        <div className="category-dish-price flex items-center">
                          <div className="rupees flex items-center justify-center text-xl h-full">
                            ₹
                          </div>
                          <input
                            type="number"
                            placeholder="price"
                            name="price"
                            className="focus:outline-none h-full background-transparent"
                            value={dish.price}
                            onChange={(e) => handleDishChange(e, index)}
                          />
                        </div>
                        <div className="category-dish-upload flex justify-center items-center p-5 h-24">
                          <p className="text-white">
                            <label
                              htmlFor="category-dish-input"
                              className="mr-2 cursor-pointer "
                            >
                              Upload{" "}
                            </label>
                            {dish.image ? dish.image.name : "Dish picture"}
                          </p>
                          <input
                            type="file"
                            id="pic-input"
                            accept="image/*"
                            name="image"
                            onChange={(e) => handleDishChange(e, index)}
                          />
                        </div>
                      </div>
                    );
                  })}

                  <p
                    className="inline-flex items-center text-sm mt-5 cursor-pointer"
                    onClick={handleAddDish}
                  >
                    <AiOutlinePlus className="mr-2" /> add more
                  </p>
                </div>
              </div>
              <div className="recipee-nutrients mt-10">
                <p>Enter the nutrients of the recipee</p>
                <div className="recipee-nutrient-container mt-10 ">
                  {categoryData.nutrients.map((nutrient, index) => {
                    return (
                      <div
                        className="recipee-nutrient-content flex items-center mb-5"
                        key={index}
                      >
                        <input
                          type="text"
                          placeholder="Nutrient"
                          name="name"
                          value={nutrient.name}
                          onChange={(e) => handleNutrientChange(e, index)}
                        />
                        <p className="mx-3">:</p>
                        <input
                          type="number"
                          placeholder="Quantity"
                          name="quantity"
                          value={nutrient.quantity}
                          onChange={(e) => handleNutrientChange(e, index)}
                        />
                      </div>
                    );
                  })}

                  <p
                    className="inline-flex items-center text-sm mt-5 cursor-pointer"
                    onClick={handleAddNutrient}
                  >
                    <AiOutlinePlus className="mr-2" /> add more
                  </p>
                </div>
              </div>
              <div className="add-recipee-order mt-10 flex sm:flex-row flex-col gap-5">
                <input
                  type="text"
                  placeholder="Weight per serving"
                  // disabled={!takeOrders}
                  name="weight"
                  value={categoryData.weight}
                  onChange={handleCategoryChange}
                />
                <input
                  type="text"
                  placeholder="Total price"
                  // disabled={!takeOrders}
                  name="price"
                  value={categoryData.price}
                  onChange={handleCategoryChange}
                />
              </div>
              <div className="check-order flex mt-10 items-center">
                <input
                  type="checkbox"
                  className="mr-3 cursor-pointer"
                  onChange={() => setCompliance(!compliance)}
                />
                <p className="text-sm">
                  mark if you comply with the food safety standards and terms of
                  use and privacy policy
                </p>
              </div>

              <div className="add-recipee-buttons mt-10 flex gap-5 justify-end">
                  <button>Clear</button>
                  <button type="submit" disabled={!compliance}>
                    {/* {recipeeLoading || dishLoading ? (
                      <span class="loader"></span>
                    ) : (
                      "Submit"
                    )} */}
                    Submit
                  </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
