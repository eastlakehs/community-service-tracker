import React from "react";
import Profile from "../Components/Profile/profile";
import Helmet from "../Components/Header/helmet";

const ProfileController = () => {
    return (
        <>
            <Helmet
                title="Profile"
                description="Page for editing and viewing your profile."
            />
            <Profile />
        </>
    );
};

export default ProfileController;
