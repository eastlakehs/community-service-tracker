import React from "react";
import { StringField, FormSubmitButton } from "../Components/Entry/entry"
import Helmet from "../Components/Header/helmet";

const Profile: React.FunctionComponent<{}> = () => {
    const setValue = () => {

    }
    return (
        <>
            <Helmet
                title="Profile"
                description="Page for editing and viewing your profile."
            />
            <div className="mb-auto">
                <form className="w-full max-w-lg container mx-auto px-4 sm:px-8 items-center">
                    <StringField name="First Name" placeholder="John" value="" setValue={setValue} />
                    <StringField name="Last Name" placeholder="Smith" value="" setValue={setValue} />
                    <StringField name="Graduation Year" placeholder="2022" value="" setValue={setValue} />
                    <FormSubmitButton
                        buttonText={"Save Profile"}
                        onSubmit={async () => {

                        }}
                    />
                </form>
            </div>
        </>
    )
};

export default Profile;
