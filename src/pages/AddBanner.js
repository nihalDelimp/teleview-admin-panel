import React, { useEffect, useState } from 'react';
import { withoutAuthAxios } from '../config/config';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { IoPlaySharp } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const AddBanner = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await withoutAuthAxios().get('/movies/get-all-movies');
      const resData = response.data;
      if (resData.status === 1) {
        setMovies(resData.data);
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleSubmit = async (movieId, addBanner) => {
    try {
      await withoutAuthAxios().post(`/movies/banner`, {
        "movieId": movieId,
        "addBanner": addBanner
      })
        .then((response) => {
          const resData = response.data;
          if (resData.status === 1) {
            toast.success(resData.message);
            fetchMovies();

          } else {
            toast.error(resData.message);
          }
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        });
    } catch (error) {
      toast.error("An error occurred while processing your request.");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-8">Add Banner</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies?.map((movie) => (
          <div key={movie._id} className="bg-white rounded-lg shadow-md p-2 hover:bg-black transition-all group">
            <img src={`${process.env.REACT_APP_BASEURL}/${movie.thumbnail}`}
            alt={movie.title} className="mb-2 w-full rounded-lg h-[250px] object-cover object-center" />
            <div className='p-2'>
              <h2 className="text-xl font-semibold mb-2 group-hover:text-white">{movie.title}</h2>
              <p className="text-gray-700 group-hover:text-white">{movie.description.substring(0, 50)}...</p>
              <p className="text-gray-600 mt-2 group-hover:text-white"><b>Rating:</b> {movie.rating}</p>

              <Link to={movie.trailerURL} target="_blank" rel="noopener noreferrer" className="py-2 px-5 bg-black text-white font-semibold rounded-full shadow-md flex items-center justify-center gap-[5px] mt-3 group-hover:text-black group-hover:bg-white"><IoPlaySharp /> Watch Trailer</Link>

              <div className='flex gap-[5px] my-3'>
                {movie.addBanner ? (
                  <button
                    className="py-2 px-1 text-red-500 font-semibold flex items-center justify-center gap-[5px] group-hover:text-white"
                    onClick={() => handleSubmit(movie?._id, false)}
                  >
                    <RiDeleteBin6Line /> Remove Banner
                  </button>
                ) : (
                  <button
                    className="py-2 px-1 text-black font-semibold flex items-center justify-center gap-[5px] group-hover:text-white"
                    onClick={() => handleSubmit(movie?._id, true)}
                  >
                    <RiDeleteBin6Line /> Add Banner
                  </button>
                )}

              </div>
            </div>
          </div>
          // <div key={movie._id} className="bg-white rounded-lg shadow-md p-6">
          //   <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
          //   <p className="text-gray-700">{movie.description}</p>
          //   <p className="text-gray-600 mt-2">Rating: {movie.rating}</p>
          //   <img src={movie.thumbnail} alt={movie.title} className="mt-4 w-full rounded-lg" />
          //   <a href={movie.trailerURL} target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-500 inline-block hover:underline">Watch Trailer</a>
          //   {movie.addBanner ? (
          //     <p style={{ cursor: 'pointer' }} onClick={() => handleSubmit(movie?._id, false)}>
          //       Remove Banner
          //     </p>
          //   ) : (
          //     <p style={{ cursor: 'pointer' }} onClick={() => handleSubmit(movie?._id, true)}>
          //       Add to Banner
          //     </p>
          //   )}
          // </div>
        ))}
      </div>
    </div>
  );
};

export default AddBanner;
