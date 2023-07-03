import React from "react";
import "./Posts.css";
import { useQuery } from "@apollo/client";
import { GET_PROFILE_IMG } from "../../utils/graphql/queries";
import { useNavigate } from "react-router-dom";

const Posts = ({ props }) => {
  const { data } = useQuery(GET_PROFILE_IMG, {
    variables: {
      email: props.authorMail
    }
  });
  const navigate = useNavigate();
  // console.log(data);

  return (
    <div
      className="posts flex sm:flex-row flex-col mb-5 justify-center items-center sm:pr-3 cursor-pointer"
      onClick={() => navigate(`/community/article/${props.id}`)}
    >
      <div className="post-content flex flex-col px-5">
        <div className="post-header mb-5 ">
          <h3 className="text-white text-lg">{props.title}</h3>
          <p className="mt-3 text-sm">{props.description.slice(0, 200)}</p>
        </div>
        <div className="post-author flex justify-between items-center">
          <div className="author-img flex flex-1 items-center">
            <img src={data?.getProfile.image} alt="" />
            <p className="text-white text-sm sm:text-base">{props.author}</p>
          </div>
          <p className="post-length text-sm">{props.length} read</p>
        </div>
      </div>
      <div className="post-image">
        <img src={props.image} alt="" className="h-full w-full" />
      </div>
    </div>
  );
};

export default Posts;
