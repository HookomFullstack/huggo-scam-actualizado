import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, DropdownSection, cn } from '@nextui-org/react';
import { memo } from 'react';
// import { DeleteDocumentIcon } from '../../../assets/actionsDropdownIcons/DeleteDocumentIcon';
import { btnDownload } from './buttonsController/btnDownload';
import { LoaderTopTableComponent } from './skeleton/LoaderTopTableComponent';

export const TopTableComponent = memo(({bags, userSelected, setUserSelected, setModeSelector, modeSelector }) => {
  
  if(bags?.length == 0) return <LoaderTopTableComponent />
  return (
    <div className="bg-[#27272A] flex gap-3 rounded px-4 py-2">
      <Dropdown
      classNames={{
        // base: "before:bg-default-200", // change arrow background
        // content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
      }}
      >
        <DropdownTrigger>
          <Button 
            variant="shadow"
            color='primary'
            
            className='w-[100px]'
          >
            Acciones
          </Button>
        </DropdownTrigger>

        <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
          <DropdownSection title={'exportaciones'} >
            <DropdownItem
              key="export"
              onClick={() => btnDownload({bags, userSelected})}
            >
              Exportar 
            </DropdownItem>
            {/* <DropdownItem
              key="exportAndDelete"
              className="text-danger"
              color="danger"
              description="guarda en formato txt y elimina"
              startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}

              // startContent={<AddNoteIcon className={iconClasses} />}
            >
              Exportar y eliminar
            </DropdownItem> */}
          </DropdownSection>

          <DropdownSection
            title={'Modalidades'}
          >
            
            <DropdownItem
              onClick={() => {
                setModeSelector(!modeSelector)
                setUserSelected(new Set([]))
              }}
            >
            {modeSelector ? 'Modo Acciones' : 'Modo selector'}
            </DropdownItem>
          
          </DropdownSection>
          {/* <DropdownSection title='Colores'>

            <DropdownItem
              key="e"
              shortcut="⇧E"
              onClick={() => console.log('hola')}
              // startContent={<AddNoteIcon className={iconClasses} />}
            >
              Exportar 
            </DropdownItem>
          </DropdownSection> */}

        </DropdownMenu>
      </Dropdown>
      {/* <Button  onPress={() => setModeTrash(e => !e)} color={modeTrash ? 'secondary' : 'default'}>Modo papelera</Button> */}
    </div>
  )
})
