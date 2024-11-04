import * as React from "react";
import {
  Column,
  SortingState,
  ColumnFiltersState,
  RowData,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import * as HoverCard from "@radix-ui/react-hover-card";
import {
  CaretSortIcon,
  CaretDownIcon,
  CaretUpIcon,
} from "@radix-ui/react-icons";
import { PopOver } from "..";
import { getDisplayedRowsRange } from "../helpers";
import HoverCardContainer from "../SubComponents/HoverCard";
import { Patient } from "../../types";
import { MainDemoTitles } from "../constants";
import { Styled } from "../ComponentStyles/patientTableStyles";

const columns = [
  {
    accessorKey: "firstName",
    header: "First Name",
    size: 20,
    sortDescFirst: false,
    cell: (data) => <div>{data.getValue()}</div>,
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    sortDescFirst: false,
    size: 20,
    cell: (data) => <div>{data.getValue()}</div>,
  },
  {
    accessorKey: "dob",
    header: "Date of Birth",
    sortDescFirst: false,
    size: 10,
    cell: (data) => <div>{data.getValue()}</div>,
  },
  {
    accessorKey: "primaryCity",
    header: "Primary City",
    sortDescFirst: false,
    size: 15,
    cell: (data) => <div>{data.getValue()}</div>,
  },
  {
    accessorKey: "intakeStatus",
    header: "Intake Status",
    sortDescFirst: false,
    size: 50,
    cell: (data) => <div>{data.getValue()}</div>,
  },
];

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}

interface Props {
  patientData: Patient;
  setGetUpdatedData: (boolean) => void;
}

const PatientTable: React.FC<Props> = ({ patientData, setGetUpdatedData }) => {
  const data: any = React.useMemo(() => patientData ?? [], [patientData]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "lastName",
      desc: false,
    },
  ]);

  const table = useReactTable({
    columns,
    data,
    state: {
      pagination,
      columnFilters,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client-side filtering
    getSortedRowModel: getSortedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const rowRanges = getDisplayedRowsRange(
    table.getState().pagination.pageIndex + 1,
    pagination.pageSize,
    data.length
  );

  return (
    <Styled.Container>
      <Styled.AddPatient>
        <PopOver
          title={MainDemoTitles.add}
          buttonText="+ New Patient"
          setGetUpdatedData={setGetUpdatedData}
          triggerType="button"
        />
      </Styled.AddPatient>
      <Styled.TableContainer>
        <Styled.Table>
          <Styled.THead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Styled.Th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: (
                                <CaretUpIcon
                                  viewBox="1 5 11 2"
                                  cursor="pointer"
                                />
                              ),
                              desc: (
                                <CaretDownIcon
                                  viewBox="1 5 11 2"
                                  cursor="pointer"
                                />
                              ),
                            }[header.column.getIsSorted() as string] ?? (
                              <CaretSortIcon
                                viewBox="1 5 10 4"
                                cursor="pointer"
                              />
                            )}
                          </div>
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} />
                            </div>
                          ) : null}
                        </>
                      )}
                    </Styled.Th>
                  );
                })}
              </tr>
            ))}
          </Styled.THead>
          <Styled.TBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <HoverCard.Root key={`${row.original.id} ${Math.random() + 1}`}>
                  <HoverCard.Trigger asChild>
                    <Styled.TrRow key={row.id}>
                      <HoverCardContainer rowData={row.original as Patient} />
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <Styled.Td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Styled.Td>
                        );
                      })}
                    </Styled.TrRow>
                  </HoverCard.Trigger>
                </HoverCard.Root>
              );
            })}
          </Styled.TBody>
        </Styled.Table>
      </Styled.TableContainer>
      <Styled.PaginationSection>
        <span>Rows per page </span>
        <Styled.Select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </Styled.Select>
        <span>
          {`${rowRanges.start} -
            ${rowRanges.end}`}
        </span>
        <Styled.ButtonContainer>
          <Styled.Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Styled.Button>
          <Styled.Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Styled.Button>
        </Styled.ButtonContainer>
      </Styled.PaginationSection>
    </Styled.Container>
  );
};

const Filter = ({ column }: { column: Column<any, unknown> }) => {
  const { filterVariant } = column.columnDef.meta ?? {};

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = React.useMemo(
    () =>
      Array.from(column.getFacetedUniqueValues().keys()).sort().slice(0, 5000),
    [column.getFacetedUniqueValues(), filterVariant]
  );

  return filterVariant === "select" ? (
    <Styled.Select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      <option value="">All</option>
      {sortedUniqueValues.map((value) => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </Styled.Select>
  ) : (
    <>
      <datalist
        id={column.id + "list"}
        key={`${column.id} ${Math.random() + 1}`}
      >
        {sortedUniqueValues.map((value: any) => (
          <option value={value} key={`${value} ${Math.random() + 1}`} />
        ))}
      </datalist>
      {column.id === "intakeStatus" ? (
        <DebouncedInput
          type="text"
          value={(columnFilterValue ?? "") as string}
          onChange={(value) => column.setFilterValue(value)}
          placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
          list={column.id + "list"}
        />
      ) : (
        <DebouncedInput
          type="text"
          value={(columnFilterValue ?? "") as string}
          onChange={(value) => column.setFilterValue(value)}
          placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        />
      )}
      <div />
    </>
  );
};

// A typical debounced input react component
const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) => {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Styled.Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default PatientTable;
