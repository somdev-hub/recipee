import React from "react";
import "./CreatePost.css";
import { FiUpload } from "react-icons/fi";

const CreatePost = () => {
  return (
    <div className="create-post fixed h-screen flex-col">
      <h3 className="text-white ml-5 mt-5">Create post</h3>
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
        <button className="font-medium">Create post</button>
      </div>
    </div>
  );
};

export default CreatePost;
