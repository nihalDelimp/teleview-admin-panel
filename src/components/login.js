import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setAccessToken,saveUser } from "../Redux/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { withoutAuthAxios } from "../config/config";
import IsLoadingHOC from "../common/IsLoadingHOC";

function Login(props) {
  const { setLoading } = props;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      navigate("/Home");
    }
  }, []);

  const [details, setdetails] = useState({
    email: "",
    password: "",
  });
  const handleChangeInputValue = (e) => {
    const { name, value } = e.target;
    setdetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = details;
    await withoutAuthAxios()
      .post(`/auth/login`, payload)
      .then((response) => {
        const resData = response.data;
        if (resData.status == 1) {
          navigate("/add-movie");
          dispatch(setAccessToken(resData.data.token));
          dispatch(saveUser(resData.data.user));
        } else {
          toast.error(resData.message);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  return (
    <>
    <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <img
            class="w-full h-full object-cover"
            src="https://wallpapers.com/images/featured/lock-screen-6bxvm8jv0f8vlpri.jpg"
          />
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">
            Account Login
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label
                for="email"
                className="text-sm font-semibold text-gray-500"
              >
                Email address
              </label>
              <input
                onChange={handleChangeInputValue}
                value={details.email}
                name="email"
                type="email"
                required
                id="email"
                autofocus
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label
                  for="password"
                  className="text-sm font-semibold text-gray-500"
                >
                  Password
                </label>
              </div>
              <input
                onChange={handleChangeInputValue}
                value={details.password}
                name="password"
                type="password"
                id="password"
                required
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default IsLoadingHOC(Login);
