import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,  getKeyValue, Chip} from "@nextui-org/react"
import { memo,  useMemo, useState } from "react"
import { tableHeaderFilter } from "../tableHeaderFilter.mjs"
import { BottomTableComponent } from "./BottomTableComponent"
import { LoaderTable } from "./skeleton/LoaderTable"
import { ActionsTable } from "./ActionsTable"

export const TableDashboard = memo( ({bags, selected, selectedKeys, setSelectedKeys, mode}) => {

  const [page, setPage] = useState(1)
  const rowsPerPage = 10
  const pages = Math.ceil(bags.length / rowsPerPage)
  const tableHeader = tableHeaderFilter([...new Set(bags.map( e => {
    const {_id, ...data} = e
    return Object?.keys(data)
  }).flat() )])

  if(mode == false) tableHeader.push( ['action', 'acciones']) 
  
  const items = useMemo(() => {
    
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return bags.slice(start, end)
  }, [page, bags, selected, bags])

  if(bags?.length == 0 || tableHeader == [] ) return (<LoaderTable />)
  
  return (
    <div>
      <Table 
        aria-label="Example table with client side pagination"
        
        topContentPlacement="outside"
        
        bottomContent={
          <BottomTableComponent bags={bags} page={page} pages={pages} selectedKeys={selectedKeys} setPage={setPage} />
        }
        bottomContentPlacement="outside"
        
        selectionMode={mode ? 'multiple' : 'none'}
        selectionBehavior={mode ? 'toggle' : 'replace'}
        onSelectionChange={setSelectedKeys}
        selectedKeys={selectedKeys}
        >
        <TableHeader>
          {tableHeader?.map(e => (<TableColumn key={e[0]}>{e[1]}</TableColumn>) )}
        </TableHeader>
        <TableBody emptyContent={'No hay datos disponibles'}  items={items}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => {
                if(columnKey == 'action' && mode == false) return <TableCell> <ActionsTable bag={item} /> </TableCell>
                if(columnKey == 'image') return <TableCell>{ <img className="w-[50px]" src={item?.image} /> }</TableCell>
                if (columnKey === 'online') {
                return (
                    <TableCell>
                      <Chip color={item?.online ? 'success' : 'danger'} className="text-white">{item?.online ? 'online' : 'ofline'}</Chip>
                    </TableCell>)
                }
                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
              }
            </TableRow>
            
            )}
          
        </TableBody>
      </Table>
    </div>
  )
})
