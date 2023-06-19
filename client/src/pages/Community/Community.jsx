import React from "react";
import "./Community.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import CreatePost from "../../components/CreatePost/CreatePost";
import "./Community.css";
import { posts } from "../../utils/providers/posts";
import Posts from "../../components/Posts/Posts";

const Community = () => {
  return (
    <div className="community flex">
      <Sidebar />
      <div className="community-content mt-5">
        <nav>
          <h2 className="text-white">Community</h2>
        </nav>
        <div className="community-posts mt-10">
            {posts.map((item, index) => {
                return <Posts props={item}/>
            })}
        </div>
      </div>
      <CreatePost />
    </div>
  );
};

export default Community;
