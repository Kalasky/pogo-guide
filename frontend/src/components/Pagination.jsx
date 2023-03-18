import React from 'react'

const Pagination = ({ pageCount, currentPage, onPageChange, marginPagesDisplayed = 2, pageRangeDisplayed = 5 }) => {
  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber)
  }

  const pages = []
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i)
  }

  const startPage = Math.max(1, currentPage - Math.floor(pageRangeDisplayed / 2))
  const endPage = Math.min(pageCount, startPage + pageRangeDisplayed - 1)
  const visiblePages = pages.slice(startPage - 1, endPage)

  return (
    <div className="flex justify-center space-x-4 mt-8">
      <button
        className={`py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-200${
          currentPage === 1 ? ' opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ←
      </button>
      {visiblePages.map((page) => (
        <button
          key={page}
          className={`py-2 px-4 rounded-lg cursor-pointer${
            currentPage === page ? ' bg-gray-300 text-white' : ' hover:bg-gray-200'
          }`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={`py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-200${
          currentPage === pageCount ? ' opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === pageCount}
      >
        →
      </button>
    </div>
  )
}

export default Pagination
