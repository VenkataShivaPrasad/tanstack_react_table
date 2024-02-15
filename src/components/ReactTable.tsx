import { ColumnDef, ColumnFiltersState, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { data, User } from "../data"
import { useState } from "react"
import { RiArrowUpDownFill } from "react-icons/ri"


const columns: ColumnDef<User>[] = [
  {
    header: "First Name",
    accessorKey: "first_name"
  },
  {
    header: "Last Name",
    accessorKey: "last_name"
  },
  {
    header: "Email",
    accessorKey: "email"
  },
  {
    header: "Gender",
    accessorKey: "gender"
  },
  {
    header: ({ column }) => {
      return (
        <span id="sorting-span" onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc")
        }}>
          Date Created
          <RiArrowUpDownFill />
        </span>
      )
    },
    accessorKey: "date_created"
  },
]


const ReactTable = () => {

  const [sorting, SetSorting] = useState<SortingState>([])
  const [columnFilters, SetColumnFilters] = useState<ColumnFiltersState>([])
  

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: SetSorting,
    onColumnFiltersChange: SetColumnFilters,
    state: {
      sorting,
      columnFilters
    }

  })


  return (
    <div>
      <div className="table">
        <input
          id="search-input"
          placeholder="search by first name"
          value={table.getColumn("first_name")?.getFilterValue() as string || ""}
          onChange={(e) => {
            table.getColumn("first_name")?.setFilterValue(e.target.value)
          }}
        />
      </div>
      <table className="table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons">
        <button onClick={() => {
          table.previousPage()
        }}
          disabled={!table.getCanPreviousPage()}
        >Prev</button>
        <span>
          {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </span>
        <button onClick={() => {
          table.nextPage()
        }}
          disabled={!table.getCanNextPage()}
        >Next</button>

      </div>
    </div>
  )
}

export default ReactTable
