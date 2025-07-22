import React from 'react'
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb'

type PaginationPropsType = {
    currentPage: number;
    pagesToShow: number;
    numberOfPages: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination: React.FC<PaginationPropsType> = ({ currentPage, pagesToShow, numberOfPages, setCurrentPage }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    const changeCurrentPage = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }
    const handleNext = () => {
        if (currentPage < numberOfPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(numberOfPages, startPage + pagesToShow - 1);
    const displayPageNumber = Array.from({ length: endPage - startPage + 1 }, (_, number) => number + startPage)

    return (
        <>
            {/* Pagination */}
            <div className='sm:max-w-[850px] mt-3 py-2 px-5 flex justify-center sm:gap-2 border border-gray-300'>
                <button
                    aria-label="Go to previous page"
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`shadow-md border border-gray-300 px-2 py-1
                    ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                    <TbPlayerTrackPrev
                        size={22}
                        className='text-gray-600 font'
                    />
                </button>
                {displayPageNumber.map((pageNumber) => (
                    <button
                        aria-current="page"
                        onClick={() => changeCurrentPage(pageNumber)}
                        key={pageNumber}
                        className={`${currentPage === pageNumber ? 'bg-[#626a7a] text-white' : ''} 
                        shadow-md border border-gray-300 px-2 py-1 cursor-pointer`}>
                        {pageNumber}
                    </button>

                ))}
                <button
                    aria-label='Go to next page'
                    onClick={handleNext}
                    disabled={currentPage === numberOfPages}
                    className={`shadow-md border border-gray-300 px-2 py-1 
                    ${currentPage === numberOfPages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} `}>
                    <TbPlayerTrackNext
                        size={22}
                        className='text-gray-600'
                    />
                </button>
            </div>
        </>
    )
}

export default Pagination