export function sortTableData<T>(
  data: T[],
  key: keyof T,
  sortBy: "asc" | "desc"
) {
  return [...data].sort((a, b) =>
    a[key] > b[key]
      ? sortBy === "asc"
        ? 1
        : -1
      : a[key] < b[key]
      ? sortBy === "asc"
        ? -1
        : 1
      : 0
  );
}

export function paginateTableData<T>(
  data: T[],
  page: number,
  pageSize: number
) {
  const start = (page - 1) * pageSize;
  return data.slice(start, start + pageSize);
}
