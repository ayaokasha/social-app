import { Avatar, Button, AvatarGroup, Textarea, Input } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { CounterContext } from "../Context/CounterContext";
import { GetAllPostApi } from "../Services/PostApi";
import PostCard from "../Components/PostCard";
import LoadingPost from "../Components/LoadingPost";
import CreatePost from "../Components/CreatePost";

export const SearchIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  // Fetch posts from API
  async function getAllPosts() {
    const response = await GetAllPostApi();
    setPosts(response.posts);
  }
  //call api on component did mount
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <div className=" px-3 ">
        {/* placeholders */}
        <div className="feed-head-container flex  justify-between max-w-5xl mx-auto p-3 gap-5">
          <div className="story-container ">
            <AvatarGroup isBordered max={4}>
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
            </AvatarGroup>

            {/* <div className="users-container">
              <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-6">
                <div
                  className="flex items-center justify-between mb-2 cursor-pointer"
                  onClick={() => setOpen(!open)}
                >
                  <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Latest Customers
                  </h5>
                  <button className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                    {open ? "Hide" : "View all"}
                  </button>
                </div>

                {open && (
                  <div className="flow-root animate-fadeIn">
                    <ul
                      role="list"
                      className="divide-y divide-gray-200 dark:divide-gray-700"
                    >
                      <li className="py-3 sm:py-4">
                        <div className="flex items-center">
                          <div className="shrink-0">
                            <img
                              className="w-8 h-8 rounded-full"
                              src="/docs/images/people/profile-picture-1.jpg"
                              alt="Neil image"
                            />
                          </div>
                          <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                              Neil Sims
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                              email@windster.com
                            </p>
                          </div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            $320
                          </div>
                        </div>
                      </li>
                      <li className="py-3 sm:py-4">
                        <div className="flex items-center ">
                          <div className="shrink-0">
                            <img
                              className="w-8 h-8 rounded-full"
                              src="/docs/images/people/profile-picture-3.jpg"
                              alt="Bonnie image"
                            />
                          </div>
                          <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                              Bonnie Green
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                              email@windster.com
                            </p>
                          </div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            $3467
                          </div>
                        </div>
                      </li>
                      <li className="py-3 sm:py-4">
                        <div className="flex items-center">
                          <div className="shrink-0">
                            <img
                              className="w-8 h-8 rounded-full"
                              src="/docs/images/people/profile-picture-2.jpg"
                              alt="Michael image"
                            />
                          </div>
                          <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                              Michael Gough
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                              email@windster.com
                            </p>
                          </div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            $67
                          </div>
                        </div>
                      </li>
                      <li className="py-3 sm:py-4">
                        <div className="flex items-center ">
                          <div className="shrink-0">
                            <img
                              className="w-8 h-8 rounded-full"
                              src="/docs/images/people/profile-picture-4.jpg"
                              alt="Lana image"
                            />
                          </div>
                          <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                              Lana Byrd
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                              email@windster.com
                            </p>
                          </div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            $367
                          </div>
                        </div>
                      </li>
                      <li className="pt-3 pb-0 sm:pt-4">
                        <div className="flex items-center ">
                          <div className="shrink-0">
                            <img
                              className="w-8 h-8 rounded-full"
                              src="/docs/images/people/profile-picture-5.jpg"
                              alt="Thomas image"
                            />
                          </div>
                          <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                              Thomes Lean
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                              email@windster.com
                            </p>
                          </div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            $2367
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div> */}
          </div>
          <div className="search-container ">
            <div className=" text-white ">
              <Input
                isClearable
                classNames={{
                  label: "text-black/50 dark:text-white/90",
                  input: [
                    "bg-transparent",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "shadow-sm",
                    "bg-default-200/50",
                    "dark:bg-default/60",
                    "backdrop-blur-xl",
                    "backdrop-saturate-200",
                    "hover:bg-default-200/70",
                    "dark:hover:bg-default/70",
                    "group-data-[focus=true]:bg-default-200/50",
                    "dark:group-data-[focus=true]:bg-default/60",
                    "cursor-text!",
                  ],
                }}
                label="Search"
                placeholder="Type to search..."
                radius="lg"
                startContent={
                  <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90  pointer-events-none shrink-0" />
                }
              />
            </div>
          </div>
        </div>

        <CreatePost callback={getAllPosts} />

        <div className="post-sec max-w-5xl  mx-auto ">
          {/* map on postes */}

          {posts.length == 0 ? (
            <LoadingPost />
          ) : (
            posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                commentLimit={1}
                callback={getAllPosts}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
