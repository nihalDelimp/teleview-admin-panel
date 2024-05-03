import { GrNext, GrPrevious } from "react-icons/gr";

const Pagination = ({ postsPerPage, totalPosts, currentPage, paginate }) => {
    const pageNumbers = [];

    console.log(totalPosts,'totalPosts')
    console.log(postsPerPage,'postsPerPage')
    console.log(currentPage,'currentPage')
    console.log(paginate,'paginate')

    for (let i = 0; i < Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i + 1);
    }

    const indexOfLastPost = Math.min(currentPage * postsPerPage, totalPosts);
    let indexOfFirstPost = Math.min(indexOfLastPost - postsPerPage + 1, totalPosts);
    indexOfFirstPost = Math.max(indexOfFirstPost, 1);
    const currentPosts = pageNumbers.slice(indexOfFirstPost - 1, indexOfLastPost);

    return (
        <>
            <div className="pagination--container flex justify-between gap-[10px] items-center py-7 px-3">
            {pageNumbers && pageNumbers?.length > 0 && (
                    <div className="pagination--action flex items-center gap-[10px]">
                        <div
                            className="pagination--buttons prev"
                            onClick={() => {
                                if (currentPage !== 1) {
                                    paginate(currentPage - 1);
                                }
                            }}
                        >
                            <button
                                type="button"
                                className={` ${currentPage === 1 ? 'cursor-not-allowed' : ''} text-black px-5 pl-0`}
                            >
                                <span className="flex items-center gap-[10px]"><GrPrevious  /> Prev</span>
                            </button>
                        </div>

                        <div className="flex">
                            {pageNumbers?.map(number => (
                                <div key={number} className={` w-[30px] aspect-square rounded-[5px] flex items-center justify-center text-black cursor-pointer ${currentPage === number ? 'bg-black text-white' : ''}`} onClick={() => paginate(number)}>
                                    {number}
                                </div>
                            ))}
                        </div>

                        <div
                            className="pagination--buttons next"
                            onClick={() => {
                                if (currentPage !== pageNumbers.length) {
                                    paginate(currentPage + 1);
                                }
                            }}
                        >
                            <button
                                type="button"
                                className={` ${currentPage === pageNumbers.length ? 'cursor-not-allowed' : ''} text-black px-5`}
                            >
                                <span className="flex items-center gap-[10px]">Next <GrNext /></span>
                            </button>
                        </div>
                    </div>
                )}


                {totalPosts > 0 && (
                    <div style={{ marginBottom: '10px', color: 'black' }}>
                        Showing {indexOfFirstPost} to {indexOfLastPost} of {totalPosts} Entries
                    </div>
                )}

            </div>
        </>
    );
};

export default Pagination;
