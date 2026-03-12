import EmptyState from './EmptyState';

/**
 * Reusable data table.
 *
 * Props:
 * - columns: Array<{ key: string, header: ReactNode, cell: (row) => ReactNode, align?: 'left'|'center'|'right', width?: string|number }>
 * - rows: any[]
 * - getRowKey: (row) => string
 * - empty: { message?: string, description?: string, node?: ReactNode }
 * - className?: string (additional class on wrapper)
 * - pagination?: { page: number, limit: number, total: number, onPageChange: (page) => void }
 */
export default function DataTable({
  columns = [],
  rows = [],
  getRowKey = (row) => row?._id ?? row?.id,
  empty,
  className = '',
  pagination
}) {
  const hasRows = Array.isArray(rows) && rows.length > 0;
  const { page = 1, limit = 10, total = 0, onPageChange } = pagination || {};
  const totalPages = limit > 0 ? Math.ceil(total / limit) : 0;
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);
  const showPagination = pagination && totalPages > 0;

  const emptyNode = empty?.node || (
    <EmptyState
      message={empty?.message || 'No records found.'}
      description={empty?.description}
    />
  );

  return (
    <>
      <div className={`app-table-wrap ${className}`.trim()}>
        <table>
          <thead>
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  style={{
                    textAlign: c.align || 'left',
                    width: c.width
                  }}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hasRows ? (
              rows.map((row) => (
                <tr key={getRowKey(row)}>
                  {columns.map((c) => (
                    <td key={c.key} style={{ textAlign: c.align || 'left' }}>
                      {c.cell(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : null}
          </tbody>
        </table>
      </div>
      {showPagination && (
        <div className="app-table-pagination" role="navigation" aria-label="Table pagination">
          <span className="app-table-pagination-info">
            Showing {from}–{to} of {total}
          </span>
          <div className="app-table-pagination-buttons">
            <button
              type="button"
              className="btn btn-ghost-app"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              aria-label="Previous page"
            >
              Previous
            </button>
            <span className="app-table-pagination-page">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              className="btn btn-ghost-app"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {!hasRows && emptyNode}
    </>
  );
}

