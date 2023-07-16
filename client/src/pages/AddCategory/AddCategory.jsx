import React, { useState } from "react";
import "./AddCategory.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Switch from "react-switch";
import { AiOutlinePlus } from "react-icons/ai";
import { useMutation } from "@apollo/client";
import { ADD_CATEGORY } from "../../utils/graphql/mutations";
import { convertToBase64 } from "../../utils/base64";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";

const AddCategory = () => {
  const [addCategory, { loading }] = useMutation(ADD_CATEGORY);
  const [sidebarView, setSidebarView] = useState(false);
  const [nonVeg, setNonVeg] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: "",
    category: "",
    ingredients: [],
    tags: [],
    isNonVeg: nonVeg,
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
    if (name === "image") {
      newDishes[index] = { ...newDishes[index], [name]: e.target.files[0] };
      setCategoryData({ ...categoryData, dishes: newDishes });
      return;
    }
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
      return;
    }

    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    for (const property in categoryData) {
      if (
        categoryData[property] === "" ||
        categoryData[property].length === 0
      ) {
        alert("Please fill all the fields");
        return;
      }
    }
    console.log(categoryData);
    const {
      name,
      category,
      ingredients,
      tags,
      isNonVeg,
      image,
      description,
      dishes,
      nutrients,
      price,
      weight,
      sellerId
    } = categoryData;
    const categoryDishes = await Promise.all(
      dishes.map(async (dish) => ({
        name: dish.name,
        price: dish.price,
        image: await convertToBase64(dish.image)
      }))
    );
    console.log(categoryDishes);
    const catImg = await convertToBase64(image);
    try {
      const response = await addCategory({
        variables: {
          category: {
            name,
            category,
            ingredients,
            tags,
            isNonVeg,
            description,
            nutrients,
            price,
            weight,
            sellerId,
            dishes: categoryDishes && categoryDishes,
            image: catImg
          }
        }
      });
      if (response.data.addCategory.code === 200) {
        alert("Category added successfully");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const clear = () => {
    setCategoryData({
      name: "",
      category: "",
      ingredients: [],
      tags: [],
      isNonVeg: nonVeg,
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
  };
  return (
    <div className="add-category flex">
      <Sidebar sidebarView={sidebarView} />
      <div
        className={`add-category-main w-full sm:mt-5 text-white ${
          sidebarView && "h-screen-dvh overflow-hidden"
        }`}
      >
        <MobileNavbar
          setSidebarView={setSidebarView}
          sidebarView={sidebarView}
          rightbarView={null}
        />
        <div className="" onClick={() => setSidebarView(false)}>
          <nav>
            <h2 className="w-full">Share your special category</h2>
          </nav>
          <div className="add-category-container my-10">
            <div className="add-category-form">
              <form action="" onSubmit={handleCategorySubmit}>
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
                      <option value="" disabled selected>
                        Select a category
                      </option>
                      <option value="Breakfast">Breakfast</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Snacks">Snacks</option>
                      <option value="Dinner">Dinner</option>
                      <option value="Dessert">Dessert</option>
                      <option value="Spicy">Spicy</option>
                      <option value="Main Course">Main Course</option>
                    </select>

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
                    <p className="text-white mr-3">
                      {nonVeg ? "Non-vegetarian" : "Vegetarian"}
                    </p>
                    <Switch
                      onChange={() => setNonVeg(!nonVeg)}
                      checked={nonVeg}
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
                      <label
                        htmlFor="pic-category-input"
                        className="mr-2 cursor-pointer "
                      >
                        Upload{" "}
                      </label>
                      {categoryData.image
                        ? categoryData.image.name
                        : "Category picture"}
                    </p>
                    <input
                      type="file"
                      id="pic-category-input"
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
                          className="category-dish flex sm:flex-row flex-col gap-5 mb-5"
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
                                htmlFor={`pic-dish-input${index}`}
                                className="mr-2 cursor-pointer "
                              >
                                Upload{" "}
                              </label>
                              {dish.image ? dish.image.name : "Dish picture"}
                            </p>
                            <input
                              type="file"
                              id={`pic-dish-input${index}`}
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
                    mark if you comply with the food safety standards and terms
                    of use and privacy policy
                  </p>
                </div>

                <div className="add-recipee-buttons mt-10 flex gap-5 justify-end">
                  <button onClick={clear}>Clear</button>
                  <button type="submit" disabled={!compliance}>
                    {loading ? <span class="loader"></span> : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
