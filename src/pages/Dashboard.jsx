import { useContext, useState } from 'react'
import { Layout } from '../components/Layout'
import { DropDownBanks } from '../components/dashboard/DropDownBanks'
import { TableDashboard } from '../components/dashboard/table/TableDashboard'
import { ScamContext } from '../context/ScamContext'
import ReactHowler from 'react-howler';
import { TopTableComponent } from '../components/dashboard/table/TopTableComponent'

export const Dashboard = () => {
  const { selected, filteredSelected, bags, notification, setNotification } = useContext(ScamContext)
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [modeSelector, setModeSelector] = useState(false)
  return (
    <Layout>
      {
        notification ?
          (
            <ReactHowler
                src='https://assets.mixkit.co/sfx/preview/mixkit-gaming-lock-2848.mp3'
                playing={true}
                onEnd={() => setNotification(false)}
            />
          ) : null
      }
      <div className='p-[1.5rem]  flex items-center justify-center'>
        <div className='w-[1024px] backdrop-blur-sm flex flex-col gap-10  '>
          <div className='flex justify-between w-full items-center'>
            <h1 className=' text-white font-bold text-4xl'>{selected?.filter(e => e.selected == true)[0]?.nameBank ?? 'No hay datos'}</h1>
            <div className='w-[200px]'>
              <DropDownBanks selected={selected} filteredSelected={filteredSelected} />
            </div>
          </div>
          <TopTableComponent setUserSelected={setSelectedKeys} modeSelector={modeSelector} setModeSelector={setModeSelector}  bags={bags} userSelected={selectedKeys} />
          <TableDashboard mode={modeSelector} selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} selected={selected} bags={bags} />
          </div>
      </div>
    </Layout>
  )
}
