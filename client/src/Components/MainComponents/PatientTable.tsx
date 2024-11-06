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
import {
  MainDemoTitles,
  AdditionalInfoTitles,
  AdditionalInfoButtonText,
  AdditionalInfoDetails,
} from "../constants";
import { Styled } from "./MainComponentStyles/patientTableStyles";

const columns = [
  {
    accessorKey: "firstName",
    header: "First Name",
    size: 20,
    cell: (data) => <div>{data.getValue()}</div>,
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    size: 20,
    cell: (data) => <div>{data.getValue()}</div>,
  },
  {
    id: "dob",
    accessorKey: "dob",
    header: "Date of Birth",
    size: 10,
    cell: (data) => <div>{data.getValue()}</div>,
    sortingFn: (a, b, columnId) => {
      const yearA = a.getValue(columnId).slice(-4);
      const yearB = b.getValue(columnId).slice(-4);
      return yearA - yearB;
    },
  },
  {
    accessorKey: "primaryCity",
    header: "Primary City",
    size: 15,
    cell: (data) => <div>{data.getValue()}</div>,
  },
  {
    accessorKey: "intakeStatus",
    header: "Intake Status",
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
  patientData: Patient[];
  setGetUpdatedData: (boolean) => void;
  allUniversalAdditionalInfoFields: { [x: string]: string };
}

const PatientTable: React.FC<Props> = ({
  patientData,
  setGetUpdatedData,
  allUniversalAdditionalInfoFields,
}) => {
  const data: any = React.useMemo(() => patientData ?? [], [patientData]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);

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
    getFilteredRowModel: getFilteredRowModel(),
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
    <Styled.Container aria-label="Patient Table Container">
      <Styled.Add>
        <PopOver
          title={AdditionalInfoTitles.add}
          buttonText={AdditionalInfoButtonText.allAdd}
          triggerType="button"
          aria-label="Add Additional Info Field to All Patients"
          setGetUpdatedData={setGetUpdatedData}
          allUniversalAdditionalInfoFields={allUniversalAdditionalInfoFields}
          details={AdditionalInfoDetails.allAdd}
          fieldNames={Object.keys(allUniversalAdditionalInfoFields)}
        />
        <PopOver
          title={AdditionalInfoTitles.delete}
          buttonText={AdditionalInfoButtonText.allDelete}
          triggerType="button"
          setGetUpdatedData={setGetUpdatedData}
          aria-label="Delete Additional Info Field to All Patients"
          allUniversalAdditionalInfoFields={allUniversalAdditionalInfoFields}
          details={AdditionalInfoDetails.allDelete}
          fieldNames={Object.keys(allUniversalAdditionalInfoFields)}
        />
        <PopOver
          title={MainDemoTitles.add}
          buttonText="+ New Patient"
          setGetUpdatedData={setGetUpdatedData}
          triggerType="button"
          aria-label="Add New Patient"
          allUniversalAdditionalInfoFields={allUniversalAdditionalInfoFields}
        />
      </Styled.Add>
      <Styled.TableContainer>
        <Styled.Table aria-label="Patient Table">
          <Styled.THead aria-label="Table Head">
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
                                  aria-label="Sort Accending Button"
                                />
                              ),
                              desc: (
                                <CaretDownIcon
                                  viewBox="1 5 11 2"
                                  cursor="pointer"
                                  aria-label="Sort Deccending Button"
                                />
                              ),
                            }[header.column.getIsSorted() as string] ?? (
                              <CaretSortIcon
                                viewBox="1 5 10 4"
                                cursor="pointer"
                                aria-label="Not Sorted Button"
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
                <HoverCard.Root
                  key={`${row.original.id} ${Math.random() + 1}`}
                  aria-label="Patient Table Hover Card"
                >
                  <HoverCard.Trigger asChild>
                    <Styled.TrRow key={row.id} aria-label="Patient Table Row">
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
          aria-label="Select Page Size"
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
            aria-label="Go To Previous Page Button"
          >
            {"<"}
          </Styled.Button>
          <Styled.Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Go To Next Page Button"
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
      aria-label="Select"
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
          aria-label="Search Column Input"
          type="text"
          value={(columnFilterValue ?? "") as string}
          onChange={(value) => column.setFilterValue(value)}
          placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
          list={column.id + "list"}
        />
      ) : (
        <DebouncedInput
          aria-label="Search Column Input"
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
      aria-label="Search Column Input"
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default PatientTable;
