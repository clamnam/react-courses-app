import axios from "axios";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const DeleteBtn = ({ id, resource, secondResource, data, deleteCallback }) => {
    // sets state variables and assign usenavigate to Navigate
    const Navigate = useNavigate();
    const { authenticated, setAlert } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = async () => {

        // state variable to define when the page starts and stops loading
        setIsLoading(true);

        // defines and sets session token given that the user is authenticated by authcontext
        let token;
        if (authenticated) {
            token = localStorage.getItem("token");
        }


        // async used so that you can add an await
        // here the await is used so that it sets alert only after the delete runs
        const deleteEnrolments = async () => {
            try {
                for (let x = 0; x < data.length; x++) {
                    console.log(data[x]);

                    await axios.delete(
                        `https://college-api.vercel.app/${secondResource}/${data[x].id}`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    setAlert(`Enrolment ${data[x].id} deleted successfully`);
                    deleteCallback(id);

                }
            } catch (err) {
                console.log(err);
            }
        };
        // async used so that you can add an await
        // here the await is used so that it sets alert only after the delete runs

        const deleteResource = async () => {
            try {
                await axios.delete(`https://college-api.vercel.app/${resource}/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(`Resource ${resource}/${id} deleted successfully`);
                setAlert(`${resource} deleted successfully`);
                deleteCallback(id);
                Navigate(`/${resource}`);
            } catch (err) {
                console.log(err);
            }
        };

        // conditionally deletes either the resource and enrolments or just the resource if they are assigned any enrolments
        if (data?.length > 0) {
            await deleteEnrolments();
            await deleteResource();
        } else {
            await deleteResource();
        }

        setIsLoading(false);
    };
    // defines the component
    return (
        <button className="btn text-l bg-neutral-800" onClick={onDelete}>
            {isLoading ? "Deleting." : "Delete"}
        </button>
    );
};

export default DeleteBtn;
