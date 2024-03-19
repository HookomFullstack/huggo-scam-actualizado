import {saveAs} from 'file-saver'

export const btnDownload = ({bags, userSelected}) => {
    
    let data = false
    if(userSelected == 'all' || [...userSelected].length == 0) data = bags
    if([...userSelected].length >= 1 && data == false) data = bags?.filter(e => [...userSelected]?.includes(e._id))
    const dataFormated = data.map((e, i) => {
        const {_id, socketID, userRef, liveData, modeLive, ...data} = e
        return Object.entries(data).filter(e => e[1] != false).map(info => `\n === ${info[0]}: ${info[1]}`) + '\n\n'
    })
    const blob = new Blob([String(dataFormated).replaceAll(',', '')], {type: "text/plain;charset=utf-8"})
    return saveAs(blob, `${data[0]?.nameBank}-${data?.length}.txt`)

}