import { toFixedAtTwoDecimalPlaces } from "@/app/lib/utils";
import { TableRowDynamic } from "./table.schema";

interface TableProps<
  T extends Record<string, unknown>,
  Keys extends keyof T = keyof T
> {
  data: TableRowDynamic<T>[];
  sortBy?: Keys;
  sortDir?: "asc" | "desc";
  columns: readonly Keys[];
  limit?: number;
  hiddenColumns?: readonly Keys[];
  onToggleSortBy?: (key: Keys) => void;
}

function TableComponent<
  T extends Record<string, unknown>,
  Keys extends keyof T
>({
  data,
  // limit,
  columns,

  hiddenColumns,
  onToggleSortBy,
}: TableProps<T, Keys>) {
  if (!data || data.length === 0) return <p>No data available</p>;

  const visibleColumns = columns.filter(
    (col): col is Keys => !hiddenColumns?.includes(col)
  );
  // type predicate tells TypeScript that after the filter, col is still of type Keys

  return (
    <table className="min-w-full text-sm text-left border-collapse">
      <thead className="bg-gray-800 text-gray-200">
        <tr>
          {visibleColumns.map((col, index) => (
            <th
              key={index}
              className="py-3 px-4 font-semibold cursor-pointer"
              onClick={() => onToggleSortBy?.(col)}>
              {String(col).toUpperCase()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-gray-300">
        {data.map((row, index) => {
          return (
            <tr
              key={index}
              className="border-b border-gray-200 bg-gray-600 text-gray-100 transition-colors">
              {visibleColumns.map((col, index) => (
                <td key={index} className="py-3 px-4">
                  {toFixedAtTwoDecimalPlaces(col as string, row[col]) ?? ""}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableComponent;
