import axios from "axios";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const DeleteBtn = ({ id, resource, secondResource, data, deleteCallback }) => {
    const Navigate = useNavigate();
    const { authenticated, setAlert } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = async () => {
        setIsLoading(true);

        let token;
        if (authenticated) {
            token = localStorage.getItem("token");
        }

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
                }
            } catch (err) {
                console.log(err);
            }
        };

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

        if (data?.length > 0) {
            await deleteEnrolments();
            await deleteResource();
        } else {
            await deleteResource();
        }

        setIsLoading(false);
    };

    return (
        <button className="btn text-l bg-neutral-800" onClick={onDelete}>
            {isLoading ? "Deleting." : "Delete"}
        </button>
    );
};

export default DeleteBtn;
