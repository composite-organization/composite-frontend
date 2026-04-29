const ITEMS_PER_PAGE = 5;

export const getPaginatedData = <T>(data: T[], currentPage: number) => {
  const totalItems = data?.length ?? 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems =
    data?.slice(startIndex, startIndex + ITEMS_PER_PAGE) ?? [];

  return {
    currentItems,
    totalPages,
    totalItems,
  };
};
