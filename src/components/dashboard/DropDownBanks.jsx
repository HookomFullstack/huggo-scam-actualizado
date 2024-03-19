import {Select, SelectItem} from '@nextui-org/react';
import { memo } from 'react';
import { LoaderDropDownBanks } from './skeleton/LoaderDropDownBanks';

export const DropDownBanks = memo(({selected, filteredSelected}) => {

    if(selected.length === 0) return (<LoaderDropDownBanks />)

    return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        size='sm'
        label="Escoge el scam"
        selectionMode='single'
        disallowEmptySelection={true}
        onSelectionChange={(e) => filteredSelected([...e][0] ?? '')}
        defaultSelectedKeys={[selected[0]?.nameBank]}
        className="max-w-xs"
      >
        {selected.length == 0 ? '' : selected?.map(({nameBank}) => (
          <SelectItem key={nameBank} textValue={nameBank}>
            {nameBank}  
          </SelectItem>
        ))}
      </Select>
    </div>
  )
})
