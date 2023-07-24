import React, { useState } from "react";
import "./Community.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import CreatePost from "../../components/CreatePost/CreatePost";
import "./Community.css";
import { posts } from "../../utils/providers/posts";
import Posts from "../../components/Posts/Posts";
import PostCreate from "../../components/PostCreate/PostCreate";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../utils/graphql/queries";
import Loader from "../../components/Loader/Loader";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";

const Community = () => {
  const { data, loading } = useQuery(GET_POSTS);
  // console.log(data1);
  console.log(data?.getPostList);
  const [create, setCreate] = useState(false);
  const handleCreate = () => {
    setCreate(!create);
  };
  const [sidebarView, setSidebarView] = useState(false);
  const [rightbarView, setRightbarView] = useState(false);
  return (
    <div className="community flex relative">
      <Sidebar blur={create} sidebarView={sidebarView} />
      {loading && <Loader />}
      {/* <Loader /> */}
      <div
        className={`community-content mt-5 ${
          create ? "brightness-50 transition-all" : ""
        } ${sidebarView || rightbarView ? "h-screen overflow-hidden" : ""}`}
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
          <nav>``
            <h2 className="text-white">Community</h2>
          </nav>
          <div className="community-posts mt-10">
            {data?.getPostList.slice().reverse().map((item, index) => {
              return <Posts props={item} key={index} />;
            })}
          </div>
        </div>
      </div>
      <CreatePost
        onClick={handleCreate}
        rightbarView={rightbarView}
        setRightbarView={setRightbarView}
      />
      <PostCreate onClick={handleCreate} set={create} />
    </div>
  );
};

export default Community;
