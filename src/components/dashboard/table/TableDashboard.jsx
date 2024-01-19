import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,  getKeyValue} from "@nextui-org/react"
import { memo,  useMemo, useState } from "react"
import { tableHeaderFilter } from "../tableHeaderFilter.mjs"
import { BottomTableComponent } from "./BottomTableComponent"
import { TopTableComponent } from "./TopTableComponent"
import { LoaderTable } from "./LoaderTable"

export const TableDashboard = memo( ({bags, selected, selectedKeys, setSelectedKeys}) => {

  const [page, setPage] = useState(1)
  const rowsPerPage = 10
  const pages = Math.ceil(bags.length / rowsPerPage)
  const tableHeader = tableHeaderFilter([...new Set(bags.map( e => {
    const {_id, ...data} = e
    return Object?.keys(data)
  }).flat() )])

  const items = useMemo(() => {
    
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return bags.slice(start, end)
    
  }, [page, bags, selected, bags])

  if(bags?.length == 0 || tableHeader == [] ) return (<LoaderTable />)
  // console.log(bags?.filter(e => ?.includes(e._id)))
  
  return (
    <div>
      <Table 
        aria-label="Example table with client side pagination"
        
        topContentPlacement="outside"
        
        bottomContent={
          <BottomTableComponent bags={bags} page={page} pages={pages} selectedKeys={selectedKeys} setPage={setPage} />
        }
        bottomContentPlacement="outside"
        
        selectionMode="multiple"
        onSelectionChange={setSelectedKeys}
        selectedKeys={selectedKeys}
        >
        <TableHeader>
          {tableHeader?.map(e => (<TableColumn key={e[0]}>{e[1]}</TableColumn>) )}
        </TableHeader>
        <TableBody emptyContent={'No hay datos disponibles'}  items={items}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
            
            )}
        </TableBody>
      </Table>
    </div>
  )
})
