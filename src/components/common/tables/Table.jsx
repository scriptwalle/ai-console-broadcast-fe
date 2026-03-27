import React from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../buttons/Button';
import Input from '../forms/Input';
import Select from '../forms/Select';

const Table = ({
  columns,
  data,
  loading = false,
  searchable = false,
  searchTerm = '',
  onSearchChange,
  searchPlaceholder = 'Search...',
  filters,
  emptyMessage = 'No data available',
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-4 ${className}`} {...props}>
      {/* Header with search and filters */}
      {(searchable || filters) && (
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          {searchable && (
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => onSearchChange?.(e.target.value)}
                inputClassName="pl-10"
              />
            </div>
          )}

          {filters && (
            <div className="flex gap-2 flex-wrap">
              {filters}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={column.key || index}
                    className={`
                      px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider
                      ${column.headerClassName || ''}
                    `.trim()}
                    style={{ width: column.width }}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-12 text-center text-slate-500 dark:text-slate-400"
                  >
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mr-2" />
                      Loading...
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-12 text-center text-slate-500 dark:text-slate-400"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data.map((row, rowIndex) => (
                  <tr
                    key={row.id || rowIndex}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
                  >
                    {columns.map((column, colIndex) => (
                      <td
                        key={column.key || colIndex}
                        className={`
                          px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100
                          ${column.cellClassName || ''}
                        `.trim()}
                      >
                        {column.render
                          ? column.render(row[column.key], row, rowIndex)
                          : row[column.key]
                        }
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Pagination component
export const TablePagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  className = '',
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="text-sm text-slate-700 dark:text-slate-300">
        Showing {startItem} to {endItem} of {totalItems} results
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          icon={ChevronLeft}
        >
          Previous
        </Button>

        {getPageNumbers().map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          icon={ChevronRight}
          iconPosition="right"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Table;