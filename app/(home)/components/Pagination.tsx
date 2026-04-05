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

    // calculate window
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    // add consecutive pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // add dots + last page if needed
    if (end < totalPages - 1) {
      pages.push("...");
      pages.push(totalPages);
    } else if (end === totalPages - 1) {
      // avoid unnecessary dots
      pages.push(totalPages);
    }

    return pages;
  }

  const pages = getPagination(currentPage, lastPage);

  return (
    <div className="flex gap-2">
      {pages.map((page) => (
        <button
          onClick={() => handler(Number(page))}
          key={page}
          className={`${currentPage === page ? "border-primary-purple bg-primary-purple text-white" : "border-border-gray bg-white text-primary-purple"} border rounded-md flex items-center justify-center w-full max-w-10 aspect-square cursor-pointer`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
