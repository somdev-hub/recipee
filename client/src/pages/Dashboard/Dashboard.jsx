import React, { useState } from "react";
import "./Dashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { BsSliders2Vertical } from "react-icons/bs";
import ad1 from "../../utils/ad1.png";
import { AiOutlineArrowRight } from "react-icons/ai";
import Dish from "../../components/Dish/Dish";
import Choices from "../../components/Choices/Choices";
import RightBar from "../../components/RightBar/RightBar";
import InfoCard from "../../components/InfoCard/InfoCard";
import InfoCard2 from "../../components/InfoCard2/InfoCard2";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CATEGORIES, GET_DISHES } from "../../utils/graphql/queries";
import { SEARCH_ARTICLE, SEARCH_ITEM } from "../../utils/graphql/mutations";
import Posts from "../../components/Posts/Posts";
import Loader2 from "../../components/Loader2/Loader2";
import { Link } from "react-router-dom";
import FilterBar from "../../components/FilterBar/FilterBar";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";

const Dashboard = () => {
  const { loading: dishesLoading, data } = useQuery(GET_DISHES);
  const { loading: categoryLoading, data: categoryData } =
    useQuery(GET_CATEGORIES);
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
  // const [searchBar, setSearchBar] = useState(false);
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

      <div
        className={`main-content lg:mt-5 ${
          pos || pos2 || sidebarView || rightbarView
            ? "brightness-50 transition-all"
            : ""
        } ${sidebarView || rightbarView ? "h-screen-dvh overflow-hidden" : ""}`}
      >
        <MobileNavbar
          sidebarView={sidebarView}
          setSidebarView={setSidebarView}
          rightbarView={rightbarView}
          setRightbarView={setRightbarView}
        />
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
                className="mr-3 text-sm"
                onChange={searchChangeHandler}
                // onClick={() => setSearchBar(true)}
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
              <div className="search-result-contents">
                {searchResults?.searchItem?.code === 200 && (
                  <div className="search-results-dishes">
                    <h3>Top dishes</h3>
                    <div className="search-results-dishes-container mt-5 sm:flex grid grid-cols-2 gap-5 overflow-x-auto">
                      {searchResults?.searchItem?.searchResult?.map(
                        (item, index) => {
                          return (
                            <Dish
                              props={item}
                              key={index}
                              size="small"
                              click={() => {
                                setInfo(item);
                                setPos(!pos);
                              }}
                            />
                          );
                        }
                      )}
                    </div>
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
              {dishesLoading && <Loader2 />}
              <div className="fav flex">
                {data?.dishes
                  .slice()
                  .reverse()
                  .slice(0, 5)
                  .map((item, index) => {
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
              <Link to="/all-categories">
                <p className="flex items-center gap-3 view cursor-pointer">
                  View all
                  <AiOutlineArrowRight />
                </p>
              </Link>
            </div>
            <div className="choice-container mt-10 overflow-x-auto">
              {categoryLoading && <Loader2 />}
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
        {/* )} */}
      </div>
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
