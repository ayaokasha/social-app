import React, { useContext } from "react";
import { CardHeader as HeroHeader, Avatar } from "@heroui/react";
import userImgv from "../assets/user-v.svg";
import { AuthContext } from "../Context/AuthContext";
import PostAction from "./PostAction";

export default function CardHeaderSection({ photo, name, date, userId,postId ,post,callback}) {
const avatarSrc = photo && !photo.includes("undefined") ? photo : userImgv;

  const { userData } = useContext(AuthContext);
  

  return (
    <>
      <HeroHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={avatarSrc}
            alt={name}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {name}
            </h4>
            <h5 className="text-[13px]  text-default-400">
              {date &&
                (() => {
                  const d = new Date(date);
                  const day = d.toLocaleDateString();
                  let hours = d.getHours();
                  const minutes = d.getMinutes().toString().padStart(2, "0");
                  const ampm = hours >= 12 ? "PM" : "AM";
                  hours = hours % 12 || 12;
                  return `${day} ${hours}:${minutes} ${ampm}`;
                })()}
            </h5>
          </div>
        </div>
        <div>
          <div className="">
            {userData._id === userId && (
              <PostAction postId={postId} callback={callback} post={post}/>
            )}
          </div>
        </div>
      </HeroHeader>
    </>
  );
}
