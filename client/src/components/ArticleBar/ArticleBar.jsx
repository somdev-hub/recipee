import React from "react";
import "./ArticleBar.css";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../utils/graphql/queries";
import { RxCross2 } from "react-icons/rx";
import Loader2 from "../Loader2/Loader2";
import { Link } from "react-router-dom";

const ArticleCard = (props) => {
  return (
    <Link to={`/community/article/${props.href}`}>
      <div className="flex items-center justify-center article-card-container w-full p-2 mb-5">
        <div className="article-card-img mr-3">
          <img
            src={props.image}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="article-card-content">
          <div className="article-card-title">
            <h3 className="text-lg font-medium">
              {props.title.slice(0, 17)}...
            </h3>
          </div>
          <div className="article-card-desc mt-1">
            <p className="text-xs">
              {props.description.slice(0, 115)}...
              <span className="font-semibold">more</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ArticleBar = (props) => {
  const { data: articles, loading } = useQuery(GET_POSTS);
  console.log(articles);
  return (
    <div
      className="article-bar fixed flex flex-col h-screen text-white p-5 transition-all"
      style={
        window.innerWidth < 640
          ? { width: "100%", right: props.rightbarView ? "0" : "-100%" }
          : { right: "0" }
      }
    >
      <nav className="flex gap-3 items-center">
        {window.innerWidth < 640 && (
          <RxCross2
            className="text-2xl"
            onClick={() => props.setRightbarView(false)}
          />
        )}
        <h3>More Posts</h3>
      </nav>
      {loading && <Loader2 />}
      <div className="article-post-container mt-5">
        {articles?.getPostList
          ?.slice()
          .reverse()
          .map((article) => {
            return (
              <ArticleCard
                key={article.id}
                title={article.title}
                description={article.description}
                image={article.image}
                href={article.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ArticleBar;
