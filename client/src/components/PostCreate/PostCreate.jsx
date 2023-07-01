import React, { useState } from "react";
import "./PostCreate.css";
import { RxCross2 } from "react-icons/rx";
import { GET_PROFILE_HEAD } from "../../utils/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_POST } from "../../utils/graphql/mutations";
import { convertToBase64 } from "../../utils/base64";

const PostCreate = (props) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const { data } = useQuery(GET_PROFILE_HEAD, {
    variables: {
      email: localStorage.getItem("email")
    }
  });
  // console.log(data?.getProfile?.firstName);
  const [postData, setPostData] = useState({
    title: "",
    length: "",
    description: "",
    image: null,
    date: `${day}/${month}/${year}`,
    author: `${data?.getProfile?.firstName} ${data?.getProfile?.lastName}`,
    tags: []
  });
  const [setPost, { loading }] = useMutation(ADD_POST);

  // console.log(data?.getProfile?.firstName);

  const handleFormChange = (e) => {
    if (e.target.name === "tags") {
      setPostData({ ...postData, [e.target.name]: e.target.value.split(",") });
      return;
    }
    if (e.target.name === "image") {
      setPostData({ ...postData, [e.target.name]: e.target.files[0] });
      return;
    }
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const { title, length, description, date, tags } = postData;

    if (
      [title, length, description, tags].some((element) => element === "") ||
      postData.image === null
    ) {
      alert("please fill all the data");
    } else {
      const base64 = await convertToBase64(postData.image);
      try {
        const response = await setPost({
          variables: {
            post: {
              title,
              length,
              description,
              date,
              author: `${data?.getProfile?.firstName} ${data?.getProfile?.lastName}`,
              authorMail: localStorage.getItem("email"),
              tags,
              image: base64
            }
          }
        });
        if (response?.data.addPost.code === 200) {
          alert("post added successfully");
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div
      className="post-create fixed flex p-5  h-screen "
      style={{ right: props.set ? "0" : "-50%" }}
    >
      <div className="post-create-container text-white w-full">
        <nav className="flex gap-3 items-center">
          <RxCross2
            className="text-white text-2xl cursor-pointer"
            onClick={props.onClick}
          />
          <h3 className="text-lg">Create post</h3>
        </nav>

        <div className="post-create-form mt-10">
          <form action="" onSubmit={handlePostSubmit}>
            <div className="post-create-form-head">
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={postData.title}
                onChange={handleFormChange}
              />
              <div className="post-create-form-head-sub flex gap-5">
                <input
                  type="text"
                  placeholder="Length"
                  name="length"
                  value={postData.length}
                  onChange={handleFormChange}
                />
                <input
                  type="text"
                  name="data"
                  value={`${day}/${month}/${year}`}
                  readOnly
                />
              </div>
              <input
                type="text"
                placeholder="Tags"
                name="tags"
                value={postData.tags}
                onChange={handleFormChange}
              />
            </div>
            <p className="mt-5">Upload post image</p>
            <div className="pic-upload mt-5 flex justify-center items-center p-5 h-24">
              <p className="text-white">
                <label htmlFor="pic-input" className="mr-2 cursor-pointer ">
                  Upload{" "}
                </label>
                a picture
              </p>
              <input
                type="file"
                id="pic-input"
                accept="image/*"
                name="image"
                onChange={handleFormChange}
              />
            </div>
            <p className="mt-5">Enter post description</p>
            <textarea
              name="description"
              id=""
              cols="30"
              rows="10"
              className="mt-5"
              placeholder="Start writing here..."
              value={postData.description}
              onChange={handleFormChange}
            ></textarea>

            <div className="add-recipee-buttons mt-5 flex gap-5 justify-end">
              <button>Clear</button>
              <button type="submit">
                {loading ? <span class="loader"></span> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostCreate;
