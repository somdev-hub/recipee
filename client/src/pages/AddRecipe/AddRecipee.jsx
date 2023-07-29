import React, { useState } from "react";
import "./AddRecipee.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Switch from "react-switch";
import { AiOutlinePlus } from "react-icons/ai";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_DISH, ADD_RECIPEE } from "../../utils/graphql/mutations";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import { convertToBase64 } from "../../utils/base64";
import { GET_PROFILE_HEAD } from "../../utils/graphql/queries";

const AddRecipee = () => {
  const [nonveg, setNonVeg] = useState(false);
  const [sidebarView, setSidebarView] = useState(false);
  const [takeOrders, setTakeOrders] = useState(false);
  const [compliance, setCompliance] = useState(false);
  const recipeeCatagories = [
    "Breakfast",
    "Lunch",
    "Snacks",
    "Dinner",
    "Dessert",
    "Beverages",
    "Cocktails",
    "Appetizers",
    "Main Course",
    "Side Dishes",
    "Other"
  ];
  const [recipeeData, setRecipeeData] = useState({
    name: "",
    author: localStorage.getItem("email"),
    category: "",
    ingredients: [],
    tags: [],
    description: "",
    nutrients: [{ name: "", quantity: "" }],
    image: null,
    nonveg: nonveg,
    weight: "",
    price: "",
    calories: "",
    dishDescription: ""
  });
  const { data: userData } = useQuery(GET_PROFILE_HEAD, {
    variables: {
      email: localStorage.getItem("email")
    }
  });
  const isCustomer = userData?.getProfile?.client === "customer";
  const [addRecipee, { loading: recipeeLoading }] = useMutation(ADD_RECIPEE);
  const [addDish, { loading: dishLoading }] = useMutation(ADD_DISH);

  const handleAddNutrient = () => {
    setRecipeeData({
      ...recipeeData,
      nutrients: [...recipeeData.nutrients, { name: "", quantity: "" }]
    });
  };

  const handleNutrientChange = (e, index) => {
    const { name, value } = e.target;
    const newNutrients = [...recipeeData.nutrients];
    newNutrients[index] = { ...newNutrients[index], [name]: value };
    setRecipeeData({ ...recipeeData, nutrients: newNutrients });
  };

  const handleRecipeeChange = (e) => {
    if (e.target.name === "ingredients" || e.target.name === "tags") {
      setRecipeeData({
        ...recipeeData,
        [e.target.name]: e.target.value.split(",")
      });
      return;
    }
    if (e.target.name === "image") {
      setRecipeeData({ ...recipeeData, [e.target.name]: e.target.files[0] });
      return;
    }

    setRecipeeData({ ...recipeeData, [e.target.name]: e.target.value });
  };

  const handleRecipeeSubmit = async (e) => {
    e.preventDefault();
    // console.log(recipeeData);
    const {
      name,
      author,
      category,
      ingredients,
      tags,
      description,
      nutrients,
      image,
      nonveg,
      calories,
      weight,
      price,
      dishDescription
    } = recipeeData;

    for (const property in recipeeData) {
      if (recipeeData[property] === "" || recipeeData[property].length === 0) {
        alert("Please fill all the fields");
        return;
      }
    }
    const base64 = await convertToBase64(image);
    try {
      const response = await addRecipee({
        variables: {
          recipee: {
            name,
            author: localStorage.getItem("email"),

            category,
            description,
            ingredients,
            nonveg,
            tags,
            nutrients,
            image: base64
          }
        }
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    if (takeOrders) {
      try {
        const response = await addDish({
          variables: {
            dish: {
              name,
              price,
              sellerId: localStorage.getItem("email"),
              image: base64,
              dishDescription,
              weight,
              category,
              tags,
              calories,
              nutrients,
              nonveg
            }
          }
        });
        console.log(response);
        if (response.data.addDish.code === 200) {
          alert(response.data.addDish.message);
        } else {
          alert(response.data.addDish.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const clearRecipeeData = () => {
    setRecipeeData({
      name: "",
      category: "",
      ingredients: [],
      tags: [],
      description: "",
      nutrients: [{ name: "", quantity: "" }],
      image: null,
      weight: "",
      price: "",
      dishDescription: ""
    });
  };

  return (
    <div className="add-recipee flex relative">
      <Sidebar sidebarView={sidebarView} />
      <div
        className={`add-recipee-main w-full sm:mt-5 ${
          sidebarView ? "h-screen-dvh overflow-hidden" : ""
        }`}
      >
        <MobileNavbar
          setSidebarView={setSidebarView}
          sidebarView={sidebarView}
          rightbarView={null}
        />
        <div className="" onClick={() => setSidebarView(false)}>
          <nav>
            <h2 className="text-white text-xl">Share your recipee with us</h2>
          </nav>
          <div className="add-recipee-container my-10">
            <div className="add-recipee-form">
              <form action="" onSubmit={handleRecipeeSubmit}>
                <div className="add-recipee-head">
                  <input
                    type="text"
                    placeholder="Enter your recipe title"
                    name="name"
                    value={recipeeData.name}
                    onChange={handleRecipeeChange}
                  />
                  <div className="my-5 flex sm:flex-row flex-col gap-5 type-ingredients text-white">
                    <select
                      name="category"
                      value={recipeeData.category}
                      id=""
                      onChange={handleRecipeeChange}
                    >
                      <option value="" disabled selected>
                        Select a category
                      </option>
                      {recipeeCatagories.map((category) => {
                        return <option value={category}>{category}</option>;
                      })}
                    </select>
                    <input
                      type="text"
                      className=""
                      placeholder="Ingredients"
                      name="ingredients"
                      value={recipeeData.ingredients}
                      onChange={handleRecipeeChange}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Tags i.e #food"
                    name="tags"
                    value={recipeeData.tags}
                    onChange={handleRecipeeChange}
                  />
                  <div className="veg flex items-center mt-5">
                    <p className="text-white mr-3">
                      {nonveg ? "Non-vegetarian" : "Vegetarian"}
                    </p>
                    <Switch
                      onChange={() => setNonVeg(!nonveg)}
                      checked={nonveg}
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
                        htmlFor="pic-input"
                        className="mr-2 cursor-pointer "
                      >
                        Upload{" "}
                      </label>
                      {recipeeData.image
                        ? recipeeData.image.name
                        : "Select recipe image"}
                    </p>
                    <input
                      type="file"
                      id="pic-input"
                      accept="image/*"
                      name="image"
                      onChange={handleRecipeeChange}
                    />
                  </div>
                  <p className="mt-10">Write your recipee description</p>
                  <textarea
                    name="description"
                    id=""
                    cols="100"
                    rows="10"
                    className="mt-10 p-3"
                    placeholder="Start writing here..."
                    value={recipeeData.description}
                    onChange={handleRecipeeChange}
                  ></textarea>
                </div>
                <div className="recipee-nutrients mt-10">
                  <p>Enter the nutrients of the recipee</p>
                  <div className="recipee-nutrient-container mt-10 ">
                    {recipeeData.nutrients.map((nutrient, index) => {
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
                      className="flex items-center text-sm mt-5 cursor-pointer"
                      onClick={handleAddNutrient}
                    >
                      <AiOutlinePlus className="mr-2" /> add more
                    </p>
                  </div>
                </div>
                <div
                  className=""
                  style={{ display: isCustomer ? "none" : "block" }}
                >
                  <p className="mt-10">
                    (Enter the fields below only if you take orders)
                  </p>
                  <div className="check-order flex mt-10 items-center">
                    <input
                      type="checkbox"
                      className="mr-3 cursor-pointer"
                      onChange={() => setTakeOrders(!takeOrders)}
                    />
                    <p className="text-sm">
                      mark if you take orders for this recipe
                    </p>
                  </div>
                  <div className="add-recipee-order mt-10 flex sm:flex-row flex-col gap-5">
                    <input
                      type="text"
                      placeholder="Weight per serving"
                      disabled={!takeOrders}
                      name="weight"
                      value={recipeeData.weight}
                      onChange={handleRecipeeChange}
                    />
                    <input
                      type="text"
                      placeholder="Price"
                      disabled={!takeOrders}
                      name="price"
                      value={recipeeData.price}
                      onChange={handleRecipeeChange}
                    />
                    <input
                      type="text"
                      placeholder="Calories"
                      disabled={!takeOrders}
                      name="calories"
                      value={recipeeData.calories}
                      onChange={handleRecipeeChange}
                    />
                  </div>

                  <div className="mt-10">
                    <p className="">Write the dish description</p>
                    <textarea
                      name="dishDescription"
                      id=""
                      cols="100"
                      rows="10"
                      className="mt-10 p-3"
                      placeholder="Start writing here..."
                      disabled={!takeOrders}
                      value={recipeeData.dishDescription}
                      onChange={handleRecipeeChange}
                    ></textarea>
                  </div>
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
                  <button onClick={clearRecipeeData}>Clear</button>
                  <button type="submit" disabled={!compliance}>
                    {recipeeLoading || dishLoading ? (
                      <span className="loader"></span>
                    ) : (
                      "Submit"
                    )}
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

export default AddRecipee;
