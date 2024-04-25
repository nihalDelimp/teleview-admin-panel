import React, { useEffect, useState } from 'react';
import { authAxios, withoutAuthAxios } from '../config/config';
import { toast } from 'react-toastify';
import { IoPlaySharp } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import DeleteModal from '../modal/DeleteModal';
import { useDispatch } from 'react-redux';
import { setmovies } from '../Redux/reducers/authSlice';

const AllMovies = () => {
  const dispatch = useDispatch()
  const [movies, setMovies] = useState([]);
  const [deleteMovie, setDeleteMovie] = useState(false);

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

  const handleDeleteMovie = async (movieId) => {
    console.log(movieId);

    try {
      const response = await authAxios().post(`/movies/delete-movie/${movieId}`);
      const resData = response.data;
      if (resData.status === 1) {
        console.log(resData)
        fetchMovies()
        toast.success(resData.message)
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);
const handleEdit =(e)=>{
  console.log(e)
  dispatch(setmovies(e))
}
  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold my-8">All Movies</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies?.map((movie) => (
            <div key={movie._id} className="bg-white rounded-lg shadow-md p-2 hover:bg-black transition-all group">
              <img src={movie.thumbnail} alt={movie.title} className="mb-2 w-full rounded-lg h-[250px] object-cover object-center" />
              <div className='p-2'>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-white">{movie.title}</h2>
                <p className="text-gray-700 group-hover:text-white">{movie.description.substring(0, 50)}...</p>
                <p className="text-gray-600 mt-2 group-hover:text-white"><b>Rating:</b> {movie.rating}</p>

                <Link to={movie.trailerURL} target="_blank" rel="noopener noreferrer" className="py-2 px-5 bg-black text-white font-semibold rounded-full shadow-md flex items-center justify-center gap-[5px] mt-3 group-hover:text-black group-hover:bg-white"><IoPlaySharp /> Watch Trailer</Link>

                <div className='flex gap-[5px] my-3'>
                  <Link to='/edit-movie' className="py-2 px-1 text-gray-800 font-semibold flex items-center justify-center gap-[5px] group-hover:text-white" onClick={()=> handleEdit(movie._id)}>
                    <FaPen /> Edit
                  </Link>

                  <button
                    className="py-2 px-1 text-red-500 font-semibold flex items-center justify-center gap-[5px] group-hover:text-white"
                    onClick={() => handleDeleteMovie(movie._id)}
                  >
                    <RiDeleteBin6Line /> Delete
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {deleteMovie && (
        <DeleteModal />
      )}

    </>
  );
};

export default AllMovies;
