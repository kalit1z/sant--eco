import Link from "next/link";
import React from "react";

const Pagination = ({ section, currentPage, totalPages }) => {
  const indexPageLink = currentPage === 2;
  const hasPrevPage = currentPage > 1;
  const hasNextPage = totalPages > currentPage;

  const getPageList = () => {
    const visiblePages = 3;
    const pageList = [];
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageList.push(i);
    }

    if (startPage > 1) {
      pageList.unshift("...");
    }
    if (endPage < totalPages) {
      pageList.push("...");
    }

    return pageList;
  };

  const pageList = getPageList();

  return (
    <>
      {totalPages > 1 && (
        <nav
          className="mb-4 flex justify-center space-x-2"
          aria-label="Pagination"
        >
          {/* previous */}
          <Link
            href={
              indexPageLink
                ? `${section ? "/" + section : "/"}`
                : `${section ? "/" + section : ""}/page/${currentPage - 1}`
            }
            className={`rounded-lg border border-primary px-3 py-2 text-dark ${
              !hasPrevPage ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <span className="sr-only">Précédent</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>

          {/* page index */}
          {pageList.map((page, i) => (
            <React.Fragment key={`page-${i}`}>
              {page === currentPage ? (
                <span
                  aria-current="page"
                  className="rounded-lg border border-primary bg-primary px-4 py-2 text-white"
                >
                  {page}
                </span>
              ) : page === "..." ? (
                <span className="px-4 py-2">...</span>
              ) : (
                <Link
                  href={
                    page === 1
                      ? `${section ? "/" + section : "/"}`
                      : `${section ? "/" + section : ""}/page/${page}`
                  }
                  className="rounded-lg border border-primary px-4 py-2 text-dark"
                >
                  {page}
                </Link>
              )}
            </React.Fragment>
          ))}

          {/* next page */}
          <Link
            href={`${section ? "/" + section : ""}/page/${currentPage + 1}`}
            className={`rounded-lg border border-primary px-3 py-2 text-dark ${
              !hasNextPage ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <span className="sr-only">Suivant</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </nav>
      )}
    </>
  );
};

export default Pagination;