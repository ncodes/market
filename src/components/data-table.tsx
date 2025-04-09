"use client";

import { ColumnDef, Header, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "../libs/utils";
import IconQuestionMark from "./icons/IconQuestionMark";
import { ToolTip } from "./tool-tip";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  tableCellClassName?: string;
  tableRowClassName?: string;
  tableHeadClassName?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  className,
  tableCellClassName,
  tableRowClassName,
  tableHeadClassName,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  function getTip(header: Header<TData, unknown>) {
    return (header.column.columnDef.meta as { tooltip: string })?.tooltip ?? "";
  }

  return (
    <Table className={className}>
      <TableHeader className="">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow className={cn("tracking-wider", tableRowClassName)} key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className={cn("tracking-wider", tableHeadClassName)}>
                  <ToolTip tip={getTip(header)}>
                    <span className="flex items-center gap-1">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      {getTip(header) && <IconQuestionMark className={cn("size-4 cursor-pointer")} />}
                    </span>
                  </ToolTip>
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              className="group bg-gradient-to-r tracking-wider hover:bg-transparent hover:from-eerie-black hover:to-chinese-black"
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className={cn(tableCellClassName)}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
