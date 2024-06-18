import React, { useRef, useState } from "react";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../common/IsLoadingHOC";
import { useNavigate } from "react-router-dom";
const AddMovie = (props) => {
  const formRef = useRef(null);
  const { setLoading } = props;
  const [imageUrl, setImageUrl] = useState("")

  const [file, setFile] = useState(null);
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
  });

  const handleChange = (e) => {
    const { name, type, checked, files } = e.target;

    if (type === "file") {
      const uploadedFile = files[0];

      const reader = new FileReader();

      reader.onload = () => {
        setFormData((prevState) => ({
          ...prevState,
          [name]: uploadedFile,
        }));
        setImageUrl(reader.result)
      };

      reader.readAsDataURL(uploadedFile);
    } else {
      const newValue = type === "checkbox" ? checked : e.target.value;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const formDataToSend = new FormData();

      formDataToSend.append("thumbnail", formData.thumbnail);

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

      const response = await authAxios().post("/movies/create-movie", formDataToSend);
      const resData = response.data;

      if (resData.status === 1) {
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
        });
        setImageUrl('');
        setLoading(false)
        formRef.current.reset();
      } else {
        toast.error(resData.message);
        console.log("Movie creation failed true:", resData.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false)
      console.log("Movie creation failed true:", error);

    }
  };

  const removeCastingItem = (indexToRemove) => {
    setFormData((prevState) => ({
      ...prevState,
      casting: prevState.casting.filter((_, index) => index !== indexToRemove),
    }));
  };
  const navigate = useNavigate();


  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await authAxios().post("/movies/import_movies", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response?.data?.status === 1) {
        navigate("/movies")
      }

    } catch (error) {
      console.error("Error uploading file", error);
    }
  };


  return (
    <>
      <div className="container mx-auto lg:pr-[50px] pr-[15px]">
        <div className="flex justify-between	items-center">
          <div>
            <h1 className="text-3xl font-bold my-8 text-white">Add Movie</h1>
          </div>
          <div>
            <span className="btn btn-primary btn-file">
              Bulk Upload <input type="file" onChange={handleFileChange} />
            </span>

          </div>
        </div>

        <div className="movies--add--form">
          <form
            onSubmit={handleSubmit}
            ref={formRef}
          >

            <div className="container--addmovie">
              <div className="movie-info-add">
                <div className="form--data">
                  <label className="block mb-2">
                    Thumbnail:

                    <div className="flex items-center">
                      {imageUrl ? (
                        <img src={imageUrl} alt="Uploaded Thumbnail" className="w-[100px] aspect-square rounded-[50px] object-cover object-center" />
                      ) : (
                        null
                      )}

                      <div>
                        <input
                          type="file"
                          name="thumbnail"
                          onChange={handleChange}
                          className="block w-full mt-1"
                          required
                        />
                      </div>
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
                    <label className="block mb-2" htmlFor={`add-Oscar`}>
                      Add to Oscar:
                      <input
                        type="checkbox"
                        name="addoscar"
                        id="add-Oscar"
                        checked={formData.addoscar}
                        onChange={handleChange}
                        className="block mt-1"
                      />
                    </label>
                    <label className="block mb-2" htmlFor={`addcomming-soon`}>
                      Coming Soon:
                      <input
                        type="checkbox"
                        id="addcomming-soon"
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
                    <div key={index} className="border border-gray-300 p-4 casting--item">
                      {/* <label className="block mb-2">
              Profile Image:
              <input
                type="text"
                name="profileImage"
                value={actor.profileImage}
                onChange={(e) => handleCastingChange(index, e)}
                className="block w-full mt-1"
                required
              />
            </label> */}

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
                      <div className="remove--item text-red-500 w-full cursor-pointer text-right" onClick={() => removeCastingItem(index)} >Remove</div>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="mt-5 rounded-0 text-white transition-all font-semibold bg-blue-700 hover:bg-white hover:text-blue-700 py-3 px-14 mr-2"
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
                className="mt-5 rounded-0 text-white transition-all font-semibold bg-blue-700 hover:bg-white hover:text-blue-700 py-3 px-14 mr-2"
              >
                Submit
              </button>
            </div>
          </form>

        </div>

      </div>
    </>
  );
};

export default IsLoadingHOC(AddMovie);
