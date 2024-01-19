import { Pagination } from '@nextui-org/react'

export const BottomTableComponent = ({bags, selectedKeys, page, setPage, pages}) => {
  return (
    <div className="flex w-full justify-center container items-center">
        <span className="w-full text-small text-default-400">
            {selectedKeys === "all"
            ? "Todos los usuarios seleccionados"
            : `${selectedKeys.size} de ${bags.length} seleccionados`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          className='w-full'
          page={page}
          total={pages}  
          onChange={(page) => setPage(page)}
        />
        <span className="w-full text-small text-default-400 text-right">Hay {bags.length} usuarios</span>
    </div>
  )
}
