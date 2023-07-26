import React from "react";
import "./CreatePost.css";
import { FiUpload } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

const CreatePost = (props) => {
  return (
    <div
      className={`create-post fixed h-screen flex-col transition-all`}
      style={
        window.innerWidth < 640
          ? { width: "100%", right: props.rightbarView ? "0" : "-100%" }
          : window.innerWidth <= 768
          ? { width: "50%", right: props.rightbarView ? "0" : "-100%" }
          : { right: "0" }
      }
    >
      <nav className="flex  ml-5 mt-5 items-center gap-3">
        {window.innerWidth < 640 && (
          <RxCross2
            className="text-2xl text-white"
            onClick={() => props.setRightbarView(false)}
          />
        )}
        <h3 className="text-white">Create post</h3>
      </nav>
      <div className="upload-video mt-10 ml-5 flex justify-center items-center p-10">
        <div className="upload flex justify-center items-center">
          <FiUpload className="text-5xl mr-5" />
          <p>
            Drag your videos here to upload or
            <label htmlFor="filechoose" className="ml-3 pl-3">
              browse
            </label>
            <input type="file" id="filechoose" className="ml-3" />
          </p>
        </div>
      </div>
      <div className="post-upload flex flex-col justify-center items-center  mt-5 ml-5">
        <div className="upload-head ml-4">
          <h3 className="text-white text-left">Have an idea</h3>
          <p className="text-sm my-3">
            Got something to cook or have a new idea! Let others no about it by
            sharing it to the community
          </p>
        </div>
        <button className="font-medium" onClick={props.onClick}>
          Create post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
