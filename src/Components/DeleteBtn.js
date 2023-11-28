import axios from "axios";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";



const DeleteBtn = ({id,resource,deleteCallback}) => {

	let token = localStorage.getItem("token");

const Navigate = useNavigate();
const {authenticated, onAuthenticated }= useAuth();
const [isLoading,setIsLoading] = useState(false);




    const onDelete = () =>{
        // delete not always working
        axios
        .delete(`https://college-api.vercel.app/courses/${id}`,
        {headers: { Authorization: `Bearer ${token}` }},
        )
        .then((response) => {

            let data = (response.data)
            console.log(data)
            deleteCallback(id)
            Navigate(`/courses`,{Id:id,
            });

        })
        .catch((err) => {

            console.log(err.response.data);

        });

    }


    return(
        <button className="btn text-l bg-neutral-800" onClick={onDelete}>
            {(isLoading)? "Deleting." : "Deleted"}
        </button>
    )
}
export default DeleteBtn;