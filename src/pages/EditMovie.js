import React, { useEffect, useState } from "react";
import { authAxios, withoutAuthAxios } from "../config/config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IsLoadingHOC from "../common/IsLoadingHOC";

const EditMovie = (props) => {
  const { setLoading } = props;
  const navigate = useNavigate();
  const id = useSelector((state) => state?.auth?.movies);
  const [formData, setFormData] = useState({
    thumbnail: "",
    title: "",
    rating: 0,
    description: "",
    timing: "",
    language: "",
    country: "",
    genre: "",
    category: "",
    release: "",
    trailerURL: "",
    addBanner: false,
    addoscar: false,
    addComingSoon: false,
    casting: [
      {
        profileImage: "",
        name: "",
        designation: "",
      },
    ],
    isNewFileUploaded: false,
  });

  const handleChange = async (e) => {
    const { name, type, checked, files, value } = e.target;
    if (type === "file") {
      if (files.length > 0) {
        const uploadedFile = files[0];
        const reader = new FileReader();
        reader.onload = () => {
          setFormData((prevState) => ({
            ...prevState,
            [name]: uploadedFile,
            thumbnailPreview: reader.result,
            isNewFileUploaded: true,
          }));
        };
        reader.readAsDataURL(uploadedFile);
      }
    } else {
      const newValue = type === "checkbox" ? checked : value;
      setFormData((prevState) => ({
        ...prevState,
        [name]: newValue,
      }));
    }
  };

  const handleCastingChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCasting = [...formData.casting];
    updatedCasting[index][name] = value;
    setFormData((prevState) => ({
      ...prevState,
      casting: updatedCasting,
    }));
  };

  const fetchMovies = async () => {
    try {
      const response = await withoutAuthAxios().get(
        `/movies/get-movie-by-id/${id}`
      );
      const resData = response.data;
      if (resData.status === 1) {
        const movieData = resData.data;
        movieData.release = movieData.release
          ? new Date(movieData.release).toISOString().split("T")[0]
          : "";
        setFormData(movieData);
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const updateMovie = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();

    if (formData.isNewFileUploaded) {
      formDataToSend.append("thumbnail", formData.thumbnail);
    } else {
      formDataToSend.append("thumbnail", formData.thumbnail);
    }

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "thumbnail" && key !== "casting") {
        formDataToSend.append(key, value);
      }
    });

    formData.casting.forEach((actor, index) => {
      Object.entries(actor).forEach(([actorKey, actorValue]) => {
        formDataToSend.append(`casting[${index}][${actorKey}]`, actorValue);
      });
    });

    try {
      const response = await authAxios().post(`/movies/update-movie/${id}`, formDataToSend);
      const resData = response.data;

      if (resData.status === 1) {
        toast.success(resData.message);
        setLoading(false);
      } else {
        toast.error(resData.message);
        console.log("Movie update failed:", resData.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const removeCastingItem = (indexToRemove) => {
    setFormData((prevState) => ({
      ...prevState,
      casting: prevState.casting.filter((_, index) => index !== indexToRemove),
    }));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto lg:pr-[50px] pr-[15px]">
      <h1 className="text-3xl font-bold my-8">Edit Movie</h1>
      <div className="movies--add--form">
        <form onSubmit={updateMovie}>
          <div className="container--addmovie">
            <div className="movie-info-add">
              <div className="form--data">
                <label className="block mb-2">
                  Thumbnail:
                  <div className="flex items-center flex-wrap">
                    <>
                      {formData.isNewFileUploaded ? (
                        <img
                          src={formData.thumbnailPreview}
                          alt="Thumbnail Preview"
                          className="w-[100px] aspect-square rounded-[50px] object-cover object-center"
                        />
                      ) : formData.thumbnail ? (
                        <>
                          {formData.thumbnail.startsWith('http') || formData.thumbnail.startsWith('https') ? (
                            <img
                              src={formData.thumbnail}
                              alt="Thumbnail"
                              className="w-[100px] aspect-square rounded-[50px] object-cover object-center"
                            />
                          ) : (
                            <img
                              src={`${process.env.REACT_APP_BASEURL}/${formData.thumbnail}`}
                              alt="Thumbnail"
                              className="w-[100px] aspect-square rounded-[50px] object-cover object-center"
                            />
                          )}
                          {/* <span className="ml-2">{formData.thumbnail}</span> */}
                        </>
                      ) : (
                        "No file chosen"
                      )}
                      <div>
                        <input
                          type="file"
                          name="thumbnail"
                          onChange={handleChange}
                          className="block w-full mt-1"
                          style={{ display: "none" }}
                        />
                        <button
                          type="button"
                          className="bg-blue-500 text-white py-1 px-3 ml-2"
                          onClick={() => document.getElementsByName('thumbnail')[0].click()}
                        >
                          Change
                        </button>
                      </div>
                    </>
                  </div>
                </label>

                <label className="block mb-2">
                  Title:
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="block w-full mt-1"
                    required
                  />
                </label>

                <label className="block mb-2">
                  Rating:
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="block w-full mt-1"
                  />
                </label>

                <label className="block mb-2">
                  Description:
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="block w-full mt-1"
                    required
                  />
                </label>

                <label className="block mb-2">
                  Timing:
                  <input
                    type="text"
                    name="timing"
                    value={formData.timing}
                    onChange={handleChange}
                    className="block w-full mt-1"
                    required
                  />
                </label>

                <label className="block mb-2">
                  Language:
                  <input
                    type="text"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="block w-full mt-1"
                    required
                  />
                </label>

                <label className="block mb-2">
                  Country:
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="block w-full mt-1"
                    required
                  />
                </label>

                <label className="block mb-2">
                  Genre:
                  <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    className="block w-full mt-1"
                    required
                  />
                </label>

                <label className="block mb-2">
                  Category:
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="block w-full mt-1"
                    required
                  >
                    <option value="">Select Category</option>
                    {["Movies", "TV Shows", "Web Series"].map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block mb-2">
                  Release:
                  <input
                    type="date"
                    name="release"
                    value={formData.release}
                    onChange={handleChange}
                    className="block w-full mt-1"
                    required
                  />
                </label>
                <div className="banner--add">
                  <label className="block mb-2" htmlFor={`add-banner`}>
                    Add Banner:
                    <input
                      type="checkbox"
                      name="addBanner"
                      id="add-banner"
                      checked={formData.addBanner}
                      onChange={handleChange}
                      className="block mt-1"
                    />
                  </label>
                  <label className="block mb-2">
                    Add to Oscar:
                    <input
                      type="checkbox"
                      name="addoscar"
                      checked={formData.addoscar}
                      onChange={handleChange}
                      className="block mt-1"
                    />
                  </label>
                  <label className="block mb-2">
                    Coming Soon:
                    <input
                      type="checkbox"
                      name="addComingSoon"
                      checked={formData.addComingSoon}
                      onChange={handleChange}
                      className="block mt-1"
                    />
                  </label>
                </div>
                <label className="block mb-2">
                  Trailer URL:
                  <input
                    type="text"
                    name="trailerURL"
                    value={formData.trailerURL}
                    onChange={handleChange}
                    className="block w-full mt-1"
                    required
                  />
                </label>
              </div>
            </div>

            <div className="casting-info-add relative">
              <div className="absolute w-full pb-[50px] casting--list--container">
                {formData.casting.map((actor, index) => (
                  <div key={index} className="mt-4 border border-gray-300 p-4 rounded casting--item">
                    <label className="block mb-2">
                      Name:
                      <input
                        type="text"
                        name="name"
                        value={actor.name}
                        onChange={(e) => handleCastingChange(index, e)}
                        className="block w-full mt-1"
                        required
                      />
                    </label>

                    <label className="block mb-2">
                      Designation:
                      <input
                        type="text"
                        name="designation"
                        value={actor.designation}
                        onChange={(e) => handleCastingChange(index, e)}
                        className="block w-full mt-1"
                        required
                      />
                    </label>
                    <div className="remove--item text-red-500 w-full cursor-pointer text-right" onClick={() => removeCastingItem(index)}>Remove</div>
                  </div>
                ))}

                <button
                  type="button"
                  className="mt-4 bg-blue-500 text-white min-w-[200px] py-2 px-4 rounded"
                  onClick={() =>
                    setFormData((prevState) => ({
                      ...prevState,
                      casting: [
                        ...prevState.casting,
                        { profileImage: "", name: "", designation: "" },
                      ],
                    }))
                  }
                >
                  Add Casting
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-[10px]">
            <button
              type="submit"
              className="mt-4 bg-black text-white min-w-[200px] py-2 px-4 rounded"
              onClick={updateMovie}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IsLoadingHOC(EditMovie);
