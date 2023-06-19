import React from "react";
import "./Posts.css";

const Posts = ({ props }) => {
  return (
    <div className="posts flex mb-5 justify-center items-center pr-3">
      <div className="post-content flex flex-col px-5">
        <div className="post-header mb-5 ">
          <h3 className="text-white text-lg">{props.header}</h3>
          <p className="mt-3 text-sm">{props.content}</p>
        </div>
        <div className="post-author flex justify-between items-center">
          <div className="author-img flex flex-1 items-center">
            <img src={props.authorImg} alt="" />
            <p className="text-white">{props.authorName}</p>
          </div>
          <p className="post-length text-sm">{props.length} minuites read</p>
        </div>
      </div>
      <div className="post-image">
        <img src={props.postImg} alt="" className="h-full w-full" />
      </div>
    </div>
  );
};

export default Posts;
