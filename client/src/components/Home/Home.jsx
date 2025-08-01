import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import { getGlobalPosts } from "../../../features/posts/postslice";
import Footer from "../Footer/Footer";

function Home() {
  const dispatch = useDispatch();


  const { posts, skip, limit, totalpost, loading } = useSelector(
    (state) => state.post
  );

  const handleLoadMore = () => {
    dispatch(getGlobalPosts({ skip, limit }));
  };


  return (<>
    <div className="  ">

      
      <div className="dark:bg-black text-white flex min-h-screen flex-col items-center   sm:justify-center sm:pt-0">
        {posts.map((post) => (
          <Post key={post._id} post={post}></Post>
        ))}

        {loading? (<div className="w-7  mt-4 h-7 border-3  border-t-transparent dark:border-white dark:border-t-black  border-black rounded-full animate-spin"></div>):(
           (posts.length === totalpost)?  (<p className="mt-6 text-sm font-bold text-gray-600">No more posts, you reached at the bottom
              </p>):(
          
          
          <button 
        className="mt-4 flex items-center justify-center rounded-xl bg-blue-600  text-sm font-semibold text-white shadow-sm transition-all duration-150 h-10 w-25 cursor-pointer  " onClick={handleLoadMore}>LOAD MORE</button>))}
       
      </div>
    </div>
    <Footer></Footer>
</>
  );
}

export default Home;
