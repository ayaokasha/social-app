import React, { useContext, useState } from "react";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import UploadPic from "./UploadPic";

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setUserData, userData } =
    useContext(AuthContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
//! Avatar state for nav doesn't work
  const [avatarSrc, setAvatarSrc] = useState(
    localStorage.getItem("avatar") || userData?.photo || ""
  );

  function logOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(null);
    setUserData(null);
    navigate("/login");
  }

  return (
    <>
      <HeroNavbar>
        <NavbarBrand>
          <NavLink to="/">
            <p className="font-bold text-inherit">Social App</p>
          </NavLink>
        </NavbarBrand>

        <NavbarContent as="div" justify="end">
          {isLoggedIn ? (
            <>
              <Badge color="danger" content="99+" shape="circle">
                <Button
                  isIconOnly
                  aria-label="more than 99 notifications"
                  radius="full"
                  variant="light"
                ></Button>
              </Badge>

              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name={userData?.name || "User"}
                    size="sm"
                    src={avatarSrc}
                  />
                </DropdownTrigger>

                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <NavLink to={"/profile"}>
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold">
                        {userData?.email || "user@example.com"}
                      </p>
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem key="Upload Photo" onClick={onOpen}>
                    Upload Photo
                  </DropdownItem>

                  <DropdownItem key="Change Password">
                    Change Password
                  </DropdownItem>

                  <DropdownItem key="logout" color="danger" onClick={logOut}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          ) : (
            <div className="flex gap-4">
              <NavbarItem>
                <NavLink to="/register">Sign Up</NavLink>
              </NavbarItem>
              <NavbarItem>
                <NavLink to="/login">Login</NavLink>
              </NavbarItem>
            </div>
          )}
        </NavbarContent>
      </HeroNavbar>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Upload Profile Photo</ModalHeader>
              <ModalBody>
                <UploadPic
                  onUpload={(newImageUrl) => {
                    setUserData((prev) => ({ ...prev, photo: newImageUrl }));
                    setAvatarSrc(newImageUrl);
                    localStorage.setItem("avatar", newImageUrl);
                    onClose();
                  }}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
