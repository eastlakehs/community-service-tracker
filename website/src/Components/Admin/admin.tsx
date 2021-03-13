import React from "react";
import AdminUsersTable from "../Table/adminUsersTable";
import { useDispatch } from "react-redux" 
import { setSignInState } from "../../Redux/signedInSlice";

export const Admin: React.FunctionComponent<{
}> = ({ }) => {
    const dispatch = useDispatch(); 
    const testData = [
        {
            email: 's-dsudzilouski@lwsd.org',
            firstName: 'Daniel',
            lastName: 'Sudzilouski',
            graduationYear: '2021'
        },
        {
            email: 's-jizhang@lwsd.org',
            firstName: 'Jason',
            lastName: 'Zhang',
            graduationYear: '2021'
        },
        {
            email: 's-bsmith@lwsd.org',
            firstName: 'Bob',
            lastName: 'Smith',
            graduationYear: '2023'
        },
        {
            email: 's-jjones@bellvuecollege.edu',
            firstName: 'John',
            lastName: 'Jones',
            graduationYear: '2020'
        }
    ]
    /** 
     * Once a student has been selected, we shouild navigate as if they were a regular student 
     */
    const handleView = (userId: string) => {

        // pretend that we are another user
        // admit accounts have permissions for any read/write
        dispatch(setSignInState({
            signedIn: true,
            userEmail: userId
        }))
        // navigate to user page 

    }

    return (
        <div className="mb-auto">
            <AdminUsersTable data={testData} handleView={handleView} />
        </div>
    );
};

