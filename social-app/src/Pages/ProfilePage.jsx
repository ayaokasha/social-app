import React, { useContext, useEffect, useState } from "react";
import LoadingPost from "../Components/LoadingPost";
import { GetProfileApi } from "../Services/PostApi";
import { AuthContext } from "../Context/AuthContext";
import PostCard from "../Components/PostCard";

export default function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useContext(AuthContext);

  async function getUserPosts() {
    if (userData?._id) {
      try {
        const response = await GetProfileApi(userData._id);
        if (response.posts) {
          setPosts(response.posts);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    getUserPosts();
  }, [userData]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-cyan-900 via-purple-900 to-pink-900"></div>

          <div className="px-6 pb-8 -mt-20 relative">
            <div className="flex justify-center mb-6">
              <img
                src={userData?.photo || "https://placehold.co/140x140"}
                alt="User Profile Picture"
                className="w-36 h-36 rounded-full border-4 border-white shadow-2xl object-cover"
              />
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {userData?.name || "Loading..."}
              </h1>
              <p className="text-lg text-gray-500 mb-4">
                @{userData?.name?.toLowerCase().replace(" ", "") || "username"}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-2xl bg-gray-50">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {posts.length}
                </div>
                <div className="text-sm font-medium text-gray-600">Posts</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-gray-50">
                <div className="text-3xl font-bold text-green-600 mb-1">103</div>
                <div className="text-sm font-medium text-gray-600">
                  Followers
                </div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-gray-50">
                <div className="text-3xl font-bold text-purple-600 mb-1">20</div>
                <div className="text-sm font-medium text-gray-600">
                  Following
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="post-sec max-w-5xl mx-auto px-3">
        {loading ? (
          <LoadingPost />
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No posts yet</p>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
}
