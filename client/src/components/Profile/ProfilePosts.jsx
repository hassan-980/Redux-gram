import React from "react";
import Post from "../Post/Post";
import { useSelector } from "react-redux";
import Loader from "../Loader";

function ProfilePosts() {
  const { loading, userposts } = useSelector((state) => state.post);
  return (
    <>
      {loading ? <Loader></Loader> : null}
      <div className="bg-white dark:bg-black dark:text-white flex  flex-col items-center   sm:justify-center sm:pt-0">
        {userposts.length === 0 ? (
          <p className="font-bold sm:mt-0  mt-10">
            No posts, create some posts📝
          </p>
        ) : (
          userposts.map((post) => <Post key={post._id} post={post} />)
        )}
      </div>
    </>
  );
}

export default ProfilePosts;
