import React from "react";

const Body = () => {
    return (
        <div>
            <div className={"flex justify-center"}>
                <img className={"py-10 w-1/3 lg:w-1/6"} src={require("../../Images/wolflogo.png")} alt={""} />
            </div>
            <div className={"flex justify-center"}>
                <h1 className={"text-xl sm:text-3xl lg:text-5xl"}>EASTLAKE COMMUNITY SERVICE PORTAL</h1>
            </div>
        </div>
    );
};

export default Body;