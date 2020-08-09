import React from "react";

const Body = () => {
    return (
        <div className={"flex-1"}>
            <div className={"flex justify-center"}>
                <img className={"py-10 w-1/3 lg:w-1/6"} src={require("../../Images/wolflogo.png")} alt={""} />
            </div>
            <div className={"flex flex-col justify-center"}>
                <h1 className={"text-center text-white py-3 text-4xl sm:text-4xl lg:text-5xl xl:text-6xl"}>EASTLAKE COMMUNITY SERVICE PORTAL</h1>
                <h2 className={"text-center text-white py-3 text-base sm:text-xl lg:text-2xl xl:text-3xl"}>Login to track service activities</h2>
                <h3 className={"text-center font-light text-white py-3 text-sm sm:text-base lg:text-lg xl:text-xl"}>First time here? Sign up with your lwsd account</h3>
            </div>
        </div>
    );
};

export default Body;