import React, { useState } from "react";
import "./Community.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import CreatePost from "../../components/CreatePost/CreatePost";
import "./Community.css";
import { posts } from "../../utils/providers/posts";
import Posts from "../../components/Posts/Posts";
import PostCreate from "../../components/PostCreate/PostCreate";
import { useQuery } from "@apollo/client";
import { GET_POSTS, GET_PROFILE_IMG } from "../../utils/graphql/queries";

const Community = () => {
  const { data } = useQuery(GET_POSTS);
  // console.log(data1);
  // console.log(data?.getPostList);
  const [create, setCreate] = useState(false);
  const handleCreate = () => {
    setCreate(!create);
  };
  return (
    <div className="community flex relative">
      <Sidebar blur={create} />
      <div
        className={`community-content mt-5 ${
          create ? "brightness-50 transition-all" : ""
        }`}
      >
        <nav>
          <h2 className="text-white">Community</h2>
        </nav>
        <div className="community-posts mt-10">
          {data?.getPostList.map((item, index) => {
            return <Posts props={item} key={index} />;
          })}
        </div>
      </div>
      <CreatePost onClick={handleCreate} />
      <PostCreate onClick={handleCreate} set={create} />
    </div>
  );
};

export default Community;
