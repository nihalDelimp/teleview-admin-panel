import React, { useEffect, useState } from 'react';
import { withoutAuthAxios } from '../config/config';
import { toast } from 'react-toastify';

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
  <div key={movie._id} className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
    <p className="text-gray-700">{movie.description}</p>
    <p className="text-gray-600 mt-2">Rating: {movie.rating}</p>
    <img src={movie.thumbnail} alt={movie.title} className="mt-4 w-full rounded-lg" />
    <a href={movie.trailerURL} target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-500 inline-block hover:underline">Watch Trailer</a>
    {movie.addBanner ? (
      <p style={{ cursor: 'pointer' }} onClick={() => handleSubmit(movie?._id, false)}>
        Remove Banner
      </p>
    ) : (
      <p style={{ cursor: 'pointer' }} onClick={() => handleSubmit(movie?._id, true)}>
        Add to Banner
      </p>
    )}
  </div>
))}
      </div>
    </div>
  );
};

export default AddBanner;
