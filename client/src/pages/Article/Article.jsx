import React, { useState } from "react";
import "./Article.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import ArticleBar from "../../components/ArticleBar/ArticleBar";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_POST,
  GET_PROFILE_HEAD,
  GET_PROFILE_IMG
} from "../../utils/graphql/queries";
import { ADD_COMMENT } from "../../utils/graphql/mutations";
import Loader from "../../components/Loader/Loader";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";

const Comment = (props) => {
  const { data: userPic } = useQuery(GET_PROFILE_IMG, {
    variables: {
      email: props.userMail
    }
  });
  return (
    <div className="comment py-5 flex items-center gap-5">
      <div className="comment-user-img rounded-full mr-2">
        <img
          src={userPic?.getProfile.image}
          alt=""
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div className="user-comment">
        <p className="text-sm">{props.user}</p>
        <p className="">{props.comment}</p>
      </div>
    </div>
  );
};

const Article = () => {
  const { articleId } = useParams();
  const { data, loading } = useQuery(GET_POST, {
    variables: {
      getPostId: articleId
    }
  });

  const { data: data1 } = useQuery(GET_PROFILE_IMG, {
    variables: {
      email: data?.getPost?.authorMail
    }
  });
  const { data: profilePic } = useQuery(GET_PROFILE_HEAD, {
    variables: {
      email: localStorage.getItem("email")
    }
  });
  const [comment, setComment] = useState("");
  const [addComment] = useMutation(ADD_COMMENT);
  const [sidebarView, setSidebarView] = useState(false);
  const [rightbarView, setRightbarView] = useState(false);
  return (
    <div className="article flex">
      <Sidebar sidebarView={sidebarView} />
      {loading ? (
        <Loader />
      ) : (
        <div
          className={`article-content mt-5 text-white ${
            sidebarView || rightbarView ? "h-screen overflow-hidden" : ""
          }`}
        >
          <MobileNavbar
            sidebarView={sidebarView}
            setSidebarView={setSidebarView}
            rightbarView={rightbarView}
            setRightbarView={setRightbarView}
          />
          <div className="" onClick={() => setSidebarView(false)}>
            <div className="article-image">
              <img
                src={data?.getPost.image}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="article-meta flex justify-between items-center py-5 mt-10">
              <div className="article-author flex items-center gap-5">
                <img
                  className="rounded-full object-cover"
                  src={data1?.getProfile.image}
                  alt=""
                />
                <p>{data?.getPost.author}</p>
              </div>
              <div className="article-date">
                <p>dt: {data?.getPost.date}</p>
              </div>
            </div>
            <div className="article-data mt-5">
              <div className="article-head">
                <h1 className="sm:text-4xl text-3xl font-bold sm:my-10 my-7">
                  {data?.getPost.title}
                </h1>
              </div>
              <div className="article-para ">
                <p className="text-sm">{data?.getPost.description}</p>
              </div>
            </div>
            <div className="article-likes"></div>
            <div className="article-comments mt-10">
              <div className="comment-head">
                <h3>Comments</h3>
                <div className="comment-input mt-5">
                  <form
                    action=""
                    className="flex justify-between"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      console.log(comment);
                      try {
                        const response = await addComment({
                          variables: {
                            postId: articleId,
                            comment: {
                              user: `${profilePic.getProfile.firstName} ${profilePic.getProfile.lastName}`,
                              userMail: localStorage.getItem("email"),
                              comment: comment
                            }
                          }
                        });
                        console.log(response);
                        if (response?.data?.addComment.code === 200) {
                          alert("comment added successfully");
                        }
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    <div className="user-img rounded-full">
                      <img
                        src={profilePic?.getProfile.image}
                        alt=""
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                    <div className="comment-box">
                      <input
                        type="text"
                        className="mr-5 w-full"
                        name="comment"
                        value={comment}
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                      />
                    </div>
                    <button type="submit">post</button>
                  </form>
                </div>
                <div className="comments-container my-10">
                  {data?.getPost.comments.map((comment, index) => {
                    return (
                      <Comment
                        key={index}
                        userMail={comment?.userMail}
                        user={comment?.user}
                        comment={comment?.comment}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ArticleBar
        rightbarView={rightbarView}
        setRightbarView={setRightbarView}
      />
    </div>
  );
};

export default Article;
