"use client";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  handler: (page: number) => Promise<void>;
}

export default function Pagination({
  currentPage,
  lastPage,
  handler,
}: PaginationProps) {
  function getPagination(
    currentPage: number,
    totalPages: number,
  ): (number | string)[] {
    const pages: (number | string)[] = [];

    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
      pages.push(totalPages);
    } else if (end === totalPages - 1) {
      pages.push(totalPages);
    }

    return pages;
  }

  const pages = getPagination(currentPage, lastPage);

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === lastPage;

  /**
   * Handles page change + scroll to top
   */
  const handlePageChange = async (page: number) => {
    // safety guards
    if (page < 1 || page > lastPage) return;
    if (page === currentPage) return;

    await handler(page);

    // scroll after navigation
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex gap-2 h-10">
      {/* PREVIOUS */}
      <button
        disabled={isPrevDisabled}
        onClick={() => handlePageChange(currentPage - 1)}
        className={`rounded-lg max-w-10 aspect-square flex items-center justify-center border
          ${
            isPrevDisabled
              ? "bg-light-gray text-medium-gray border-border-gray cursor-not-allowed"
              : "bg-primary-purple text-white border-primary-purple"
          }`}
      >
        <svg width="15" height="23" viewBox="0 0 15 23" fill="none">
          <path
            d="M7.24077 4.78977L8.2635 5.80114L4.71236 9.35227L13.6328 9.35227L13.6328 10.8295L4.71236 10.8295L8.26349 14.375L7.24077 15.392L1.93963 10.0909L7.24077 4.78977Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* PAGE NUMBERS */}
      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`dots-${index}`}
            className="w-10 flex items-center justify-center"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageChange(page as number)}
            className={`border rounded-md flex items-center justify-center w-full max-w-10 aspect-square
              ${
                currentPage === page
                  ? "border-primary-purple bg-primary-purple text-white"
                  : "border-border-gray bg-white text-primary-purple"
              }`}
          >
            {page}
          </button>
        ),
      )}

      {/* NEXT */}
      <button
        disabled={isNextDisabled}
        onClick={() => handlePageChange(currentPage + 1)}
        className={`rounded-lg max-w-10 aspect-square flex items-center justify-center border
          ${
            isNextDisabled
              ? "bg-light-gray text-medium-gray border-border-gray cursor-not-allowed"
              : "bg-primary-purple text-white border-primary-purple"
          }`}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M13.8538 8.35403L9.35375 12.854C9.25993 12.9478 9.13268 13.0006 9 13.0006C8.86732 13.0006 8.74007 12.9478 8.64625 12.854C8.55243 12.7602 8.49972 12.633 8.49972 12.5003C8.49972 12.3676 8.55243 12.2403 8.64625 12.1465L12.2931 8.50028H2.5C2.36739 8.50028 2.24021 8.4476 2.14645 8.35383C2.05268 8.26006 2 8.13289 2 8.00028C2 7.86767 2.05268 7.74049 2.14645 7.64672C2.24021 7.55296 2.36739 7.50028 2.5 7.50028H12.2931L8.64625 3.85403C8.55243 3.76021 8.49972 3.63296 8.49972 3.50028C8.49972 3.3676 8.55243 3.24035 8.64625 3.14653C8.74007 3.05271 8.86732 3 9 3C9.13268 3 9.25993 3.05271 9.35375 3.14653L13.8538 7.64653C13.9002 7.69296 13.9371 7.74811 13.9623 7.80881C13.9874 7.86951 14.0004 7.93457 14.0004 8.00028C14.0004 8.06599 13.9874 8.13105 13.9623 8.19175C13.9371 8.25245 13.9002 8.30759 13.8538 8.35403Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
}
