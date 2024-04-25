import React from "react";
import { useDispatch } from "react-redux";
import { setpage } from "../Redux/reducers/authSlice";

const Pagination = ({ page, totalPageCount  }) => {

  const dispatch = useDispatch()


  const handlePreviousPage = () => {
    if (page > 0) {
      dispatch(setpage(page - 1));
    }
  };

  const handleNextPage = () => {
    if (page < totalPageCount - 1) {
      dispatch(setpage(page + 1));
    }
  };

  const getPageNumbers = () => {
    const pagesToShow = 5;
    const startPage = Math.max(0, page - pagesToShow);
    const endPage = Math.min(totalPageCount - 1, startPage + pagesToShow * 2);
  
    const adjustedStartPage = Math.max(0, endPage - pagesToShow * 2);
  
    return Array.from({ length: endPage - adjustedStartPage + 1 }, (_, i) => adjustedStartPage + i + 1);
  };
  return (
    <div className="container--base !pb-[clamp(20px,4vw,60px)]">
      <div className="pagination--table flex justify-center items-center sm:flex-row flex-col gap-[10px]">
        <button
          className="cursor-pointer rounded-[8px] border border-[#8F8F8F] text-[#1C1C1C] sm:max-w-[125px] px-[15px] w-full min-h-[40px] hover:bg-[#786BD2] hover:text-white hover:border-[#786BD2] sm:order-1 order-2"
          onClick={handlePreviousPage}
        >
          Previous
        </button>

        <div className="pagination--number sm:order-2 order-1">
          <ul className="flex gap-[10px]">
            {getPageNumbers().map((pageNumber) => (
              <li
                key={pageNumber}
                className={`w-[40px] cursor-pointer aspect-square rounded-[10px] flex items-center justify-center border text-[#1C1C1C] ${
                  pageNumber === page ? 'bg-[#786BD2] border-[#786BD2] text-white' : 'bg-white border-[#8F8F8F] hover:bg-[#786BD2] hover:border-[#786BD2] hover:text-white'
                }`}
                onClick={() => dispatch(setpage(pageNumber))}
              >
                {pageNumber}
              </li>
            ))}
          </ul>
        </div>

        <button
          className="cursor-pointer rounded-[8px] border border-[#8F8F8F] text-[#1C1C1C] sm:max-w-[125px] px-[15px] w-full min-h-[40px] hover:bg-[#786BD2] hover:text-white hover:border-[#786BD2] sm:order-3 order-3"
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
