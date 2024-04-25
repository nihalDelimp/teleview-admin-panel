import React, { useState } from "react";
import { authAxios, withoutAuthAxios } from "../config/config";
import { toast } from "react-toastify";
// import { toast } from 'react-toastify';

const EditMovie = () => {
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
    casting: [
      {
        profileImage: "",
        name: "",
        designation: "",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // For checkboxes, toggle the checked state
    const newValue = type === "checkbox" ? !formData[name] : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    await authAxios()
      .post("/movies/create-movie", formData)
      .then((response) => {
        const resData = response.data;
        console.log(resData);

        if (resData.status === 1) {
          console.log("Movie created successfully:", response.data);
          toast.success(resData.message);
          setFormData({
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
            casting: [
              {
                profileImage: "",
                name: "",
                designation: "",
              },
            ],
          });
        } else {
          toast.error(resData.message);
          console.log("Movie created successfully:", resData.message);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  return (
    <>
      <h1>Movies</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto mt-8 movies--add--form"
      >
        <label className="block mb-2">
          Thumbnail:
          <input
            type="text"
            name="thumbnail"
            onChange={handleChange}
            className="block w-full mt-1"
            required
          />
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

        <label className="block mb-2">
          Add Banner:
          <input
            type="checkbox"
            name="addBanner"
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

        {/* Casting Section */}
        {formData.casting.map((actor, index) => (
          <div key={index} className="mt-4 border border-gray-300 p-4 rounded">
            <label className="block mb-2">
              Profile Image:
              <input
                type="text"
                name="profileImage"
                value={actor.profileImage}
                onChange={(e) => handleCastingChange(index, e)}
                className="block w-full mt-1"
                required
              />
            </label>

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
          </div>
        ))}

        <div className="flex items-center justify-between gap-[10px]">
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

          <button
            type="submit"
            className="mt-4 bg-black text-white min-w-[200px] py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default EditMovie;
