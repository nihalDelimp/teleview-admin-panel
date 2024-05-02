import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setAccessToken, saveUser } from "../Redux/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { withoutAuthAxios } from "../config/config";
import IsLoadingHOC from "../common/IsLoadingHOC";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Login = (props) => {
  const { setLoading } = props;
  const [passwordShow, setPasswordShow] = useState(false);

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
    setLoading(true);
    e.preventDefault();
    const payload = details;
    await withoutAuthAxios()
      .post(`/auth/login`, payload)
      .then((response) => {
        const resData = response.data;
        if (resData.status === 1) {
          navigate("/add-movie");
          dispatch(setAccessToken(resData.data.token));
          dispatch(saveUser(resData.data));
          setLoading(false);
        } else {
          toast.error(resData.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="bg--image"></div>
      <div className="flex items-center min-h-screen p-4 lg:justify-center z-[2] relative login-container">
        <div className="flex flex-col overflow-hidden bg-transparent rounded-md shadow-lg flex-row flex-1 max-w-[400px] mx-auto">
          <div className="p-5 bg-[#0000007a] md:flex-1">
            <h3 className="my-4 text-2xl font-semibold text-white">
              Account Login
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm font-[500] text-gray-200"
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
                  autoFocus
                  className="px-4 py-2 transition duration-300 border border-gray-500 bg-black text-white rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div className="flex flex-col space-y-1 relative">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-[500] text-gray-200"
                  >
                    Password
                  </label>
                </div>
                <input
                  onChange={handleChangeInputValue}
                  value={details.password}
                  name="password"
                  type={ passwordShow === false ? "password" : 'text'}
                  id="password"
                  required
                  className="px-4 py-2 transition duration-300 border border-gray-500 bg-black text-white rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />

                <span className="view--password" onClick={() => setPasswordShow(!passwordShow)}>
                  {passwordShow === false ? <BsEyeSlash /> : <BsEye />}
                </span>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 text-sm font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
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
