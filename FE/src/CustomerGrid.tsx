import { useMemo, type CSSProperties } from 'react'
import { AgGridReact } from 'ag-grid-react'
import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
  type GetRowIdParams,
  type SelectionChangedEvent,
} from 'ag-grid-community'
import type { Customer } from './schemas'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

ModuleRegistry.registerModules([AllCommunityModule])

type CustomerGridProps = {
  customers: Customer[]
  onSelectedIdsChange: (ids: number[]) => void
}

const containerStyle: CSSProperties = {
  width: '100%',
  height: 360,
  border: '1px solid #ccc',
  backgroundColor: '#ffffff',
  borderRadius: 4,
  overflow: 'hidden',
}

function CustomerGrid({ customers, onSelectedIdsChange }: CustomerGridProps) {
  const columnDefs = useMemo<ColDef<Customer>[]>(
    () => [
      {
        headerName: '',
        checkboxSelection: true, // Show checkbox in each row
        headerCheckboxSelection: true, // Master checkbox in header
        width: 50,
        // Let AG Grid handle checkbox alignment; we only need consistent text alignment.
      },
      {
        headerName: 'First Name',
        field: 'firstName',
        flex: 1,
        headerStyle: { textAlign: 'left' },
        cellStyle: { textAlign: 'left' },
      },
      {
        headerName: 'Last Name',
        field: 'lastName',
        flex: 1,
        headerStyle: { textAlign: 'left' },
        cellStyle: { textAlign: 'left' },
      },
      {
        headerName: 'Chocolate',
        field: 'numChocolate',
        flex: 1,
        headerStyle: { textAlign: 'left' },
        cellStyle: { textAlign: 'left' },
      },
      {
        headerName: 'Vanilla',
        field: 'numVanilla',
        flex: 1,
        headerStyle: { textAlign: 'left' },
        cellStyle: { textAlign: 'left' },
      },
      {
        headerName: 'Strawberry',
        field: 'numStrawberry',
        flex: 1,
        headerStyle: { textAlign: 'left' },
        cellStyle: { textAlign: 'left' },
      },
    ],
    [],
  )

  const getRowId = (params: GetRowIdParams<Customer>) => String(params.data.id)
  const onSelectionChanged = (event: SelectionChangedEvent<Customer>) => {
    const selectedIds = event.api
      .getSelectedRows()
      .map((row) => row.id)
      .filter((id): id is number => id !== undefined)

    onSelectedIdsChange(selectedIds)
  }

  return (
    <div className="ag-theme-alpine" style={containerStyle}>
      <AgGridReact<Customer>
        rowData={customers}
        columnDefs={columnDefs}
        rowSelection="multiple"
        getRowId={getRowId}
        onSelectionChanged={onSelectionChanged}
      />
    </div>
  )
}

export default CustomerGrid
