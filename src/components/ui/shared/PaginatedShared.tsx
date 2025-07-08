import { Link } from "react-router-dom";

type ProductPaginationProps = {
  page: number;
  totalPages: number;
};

export default function PaginatedShared({
  page,
  totalPages,
}: ProductPaginationProps) {
  const visiblePages = 5;
  const half = Math.floor(visiblePages / 2);

  let startPage = Math.max(1, page - half);
  let endPage = Math.min(totalPages, page + half);

  if (page <= half) {
    endPage = Math.min(totalPages, visiblePages);
  }

  if (page + half >= totalPages) {
    startPage = Math.max(1, totalPages - visiblePages + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <nav className="flex justify-center py-10 gap-1">
      {page > 1 && (
        <Link
          to={`/visits-center-all?page=${page - 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-9"
        >
          &laquo;
        </Link>
      )}

      {startPage > 1 && (
        <>
          <Link
            to={`/visits-center-all?page=1`}
            className={`bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-9`}
          >
            1
          </Link>
          {startPage > 2 && (
            <span className="px-2 py-2 text-sm text-gray-500">...</span>
          )}
        </>
      )}

      {pages.map((currentPage) => (
        <Link
          key={currentPage}
          to={`/visits-center-all?page=${currentPage}`}
          className={`${
            page === currentPage
              ? "font-black text-white bg-green-600"
              : "bg-white"
          } px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-9`}
        >
          {currentPage}
        </Link>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-2 py-2 text-sm text-gray-500">...</span>
          )}
          <Link
            to={`/visits-center-all?page=${totalPages}`}
            className={`bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-9`}
          >
            {totalPages}
          </Link>
        </>
      )}

      {page < totalPages && (
        <Link
          to={`/visits-center-all?page=${page + 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-9"
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
}
