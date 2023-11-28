import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = ({ authenticated, onAuthenticated }) => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [form, setForm] = useState({});

  const handleClick = () => {
    axios
      .post(`https://college-api.vercel.app/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
      })
      .then((response) => {
        console.log(response);
        onAuthenticated(true, response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
        console.log(err.response.data.email);
        setError(err.response.data.email);
      });
  };

  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginClick = () => {
    navigate('/Login');
  };

  return (
	
    <div className="flex items-center justify-center h-screen ">
		
      <div className=" p-8 rounded shadow-2xl w-full max-w-md bg-dar">
        <div className="text-4xl text-center mb-4 text-white">Register!</div>

        <div className="mb-4">
          <label className="block ">Name:</label>
          <input
            onChange={handleForm}
            type="text"
            name="name"
            value={form.name}
          />
        </div>

        <div className="mb-4">
          <label className="block ">Email:</label>
          <input
            onChange={handleForm}
            type="text"
            name="email"
            value={form.email}
          />
        </div>

        <div className="mb-4">
          <label className="block ">Password:</label>
          <input
            onChange={handleForm}
            type="password"
            name="password"
            value={form.password}
          />
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="flex justify-between">
          <button onClick={handleClick} className="bg-red-500  btn btn-sm  text-white">
            Submit
          </button>

          <button onClick={handleLoginClick} className=" btn btn-sm bg-red-500 text-white">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
