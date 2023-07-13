import React, { useState } from "react";
import "./Dashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { BsSliders2Vertical } from "react-icons/bs";
import ad1 from "../../utils/ad1.png";
import { AiOutlineArrowRight } from "react-icons/ai";
import Dish from "../../components/Dish/Dish";
import { favorites } from "../../utils/providers/favorites";
import Choices from "../../components/Choices/Choices";
import RightBar from "../../components/RightBar/RightBar";
import InfoCard from "../../components/InfoCard/InfoCard";
import InfoCard2 from "../../components/InfoCard2/InfoCard2";
import { choice } from "../../utils/providers/choice";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CATEGORIES, GET_DISHES } from "../../utils/graphql/queries";
import Loader from "../../components/Loader/Loader";
import logo from "../../utils/recipee_logo-cropped.png";
import { CgOptions } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { SEARCH_ARTICLE, SEARCH_ITEM } from "../../utils/graphql/mutations";
import Posts from "../../components/Posts/Posts";
import Loader2 from "../../components/Loader2/Loader2";
import { Link } from "react-router-dom";
import FilterBar from "../../components/FilterBar/FilterBar";

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_DISHES);
  const {
    loading: categoryLoading,
    error: categoryError,
    data: categoryData
  } = useQuery(GET_CATEGORIES);
  const [getSearchItems, { loading: itemLoading }] = useMutation(SEARCH_ITEM);
  const [getSearchArticles, { loading: articleLoading }] =
    useMutation(SEARCH_ARTICLE);
  const [pos, setPos] = useState(false);
  const [pos2, setPos2] = useState(false);
  const [info, setInfo] = useState({});
  const [info2, setInfo2] = useState({});
  const [sidebarView, setSidebarView] = useState(false);
  const [rightbarView, setRightbarView] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [searchArticles, setSearchArticles] = useState(null);
  const [filterBar, setFilterBar] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [search, setSearch] = useState("");

  const searchChangeHandler = async (e) => {
    const value = e.target.value;
    setSearch(value);
    // Perform search logic here
    try {
      const { data: searchItems } = await getSearchItems({
        variables: { search: value }
      });
      const { data: searchArticles } = await getSearchArticles({
        variables: { search: value }
      });
      // console.log(searchItems);
      setSearchResults(searchItems);
      setSearchArticles(searchArticles);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard flex relative sm:overflow-hidden">
      <Sidebar blur={pos || pos2} sidebarView={sidebarView} />
      {loading ? (
        <Loader position={"no-pos"} />
      ) : (
        <div
          className={`main-content mt-5 ${
            pos || pos2 ? "brightness-50 transition-all" : ""
          }`}
        >
          <div className="navbar justify-between mb-7 items-start">
            <GiHamburgerMenu
              className="text-lg"
              onClick={() => setSidebarView(!sidebarView)}
            />
            <div className="navbar-logo">
              <img src={logo} alt="" />
            </div>
            <CgOptions
              className="text-lg"
              onClick={() => setRightbarView(!rightbarView)}
            />
          </div>
          <div
            className=""
            onClick={() => {
              setSidebarView(false);
              setRightbarView(false);
            }}
          >
            <nav className="dashboard-nav flex justify-between">
              <h2>Hi, welcome to Recipee dashboard</h2>
              <div className="search flex">
                <input
                  type="text"
                  placeholder="Search here"
                  className="mr-5"
                  onChange={searchChangeHandler}
                  onClick={() => setSearchBar(true)}
                />

                <div
                  className="filter flex justify-center items-center cursor-pointer"
                  onClick={() => setFilterBar(!filterBar)}
                >
                  <BsSliders2Vertical className="text-xl flex" />
                </div>
              </div>
            </nav>
            <FilterBar visibility={filterBar} />
            <div
              className="search-results-container my-5 p-5"
              style={{ display: search ? "block" : "none" }}
            >
              {itemLoading || articleLoading ? (
                <Loader2 />
              ) : (
                <div className="search-result-contents ">
                  {searchResults?.searchItem?.code === 200 && (
                    <div className="search-results-dishes overflow-auto ">
                      <h3>Top dishes</h3>
                      <div className="search-results-dishes-container mt-5 flex"></div>
                      {searchResults?.searchItem?.searchResult?.map(
                        (item, index) => {
                          return (
                            <Dish
                              props={item}
                              key={index}
                              click={() => {
                                setInfo(item);
                                setPos(!pos);
                              }}
                            />
                          );
                        }
                      )}
                    </div>
                  )}
                  {searchArticles?.searchArticle?.code === 200 && (
                    <div className="search-results-articles mt-5">
                      <h3 className="">Top articles</h3>
                      <div className="search-results-articles-container mt-5">
                        {searchArticles?.searchArticle?.searchResult?.map(
                          (item, index) => {
                            return <Posts props={item} key={index} />;
                          }
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="ad1 w-full mt-10 p-5 relative">
              <h3>Add your own recipe</h3>
              <p>
                Now you an share your own recipe with us to enjoy fresh meal and
                win exciting rewards so hurry up
              </p>
              <img src={ad1} alt="" className="absolute" />
            </div>
            <div className="favorites">
              <div className="flex justify-between items-center mt-10">
                <h3 className="">Our dishes</h3>
                <Link to="/all-dishes">
                  <p className="flex items-center gap-3 view">
                    View all
                    <AiOutlineArrowRight />
                  </p>
                </Link>
              </div>
              <div className="fav-container overflow-x-auto mt-10">
                <div className="fav flex">
                  {data?.dishes.slice(0, 5).map((item, index) => {
                    return (
                      <Dish
                        props={item}
                        key={index}
                        click={() => {
                          setInfo(item);
                          setPos(!pos);
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="choices">
              <div className="flex justify-between items-center mt-10">
                <h3 className="">Based on your choices</h3>
                <p className="flex items-center gap-3 view">
                  View all
                  <AiOutlineArrowRight />
                </p>
              </div>
              <div className="choice-container mt-10 overflow-x-auto">
                <div className="choice-cards flex flex-col">
                  {categoryData?.getCategories.map((item, index) => {
                    return (
                      <Choices
                        item={item}
                        click={() => {
                          setPos2(!pos2);
                          setInfo2(item);
                        }}
                        key={index}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <RightBar rightbarView={rightbarView} />
      <InfoCard
        pos={pos ? "0" : "-50%"}
        posMini={pos ? "0" : "-110%"}
        props={info}
        onClick={() => setPos(false)}
      />
      <InfoCard2
        pos2={pos2 ? "0" : "-50%"}
        posMini={pos2 ? "0" : "-110%"}
        props={info2}
        onClick={() => setPos2(false)}
      />
    </div>
  );
};

export default Dashboard;
