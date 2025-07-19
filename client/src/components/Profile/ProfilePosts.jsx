import React from "react";
import Post from "../Post/Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import { useSelector } from "react-redux";
import Loader from "../Loader";

function ProfilePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setloading] = useState("false");
  const { loggedIn } = useSelector((state) => state.auth); 
  const navigate = useNavigate();
  

  useEffect(() => {
    setloading(true);
    axios
      .get("http://localhost:5000/api/posts/get-user-posts", {
        withCredentials: true,
      })
      .then((res) => {
        setPosts(res.data);
      })
      .then(() => setloading(false))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {loading ? <Loader></Loader> : null}
      <div className="bg-white dark:bg-black dark:text-white flex  flex-col items-center   sm:justify-center sm:pt-0">

        {(posts.length===0)? (<p className="font-bold" >No posts, create some post </p>) : ( posts.map((post) => (
          <Post key={post._id} post={post} />
        )))}


       
      </div>
    </>
  );
}

export default ProfilePosts;
