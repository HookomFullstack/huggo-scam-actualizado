export const actionCopyBag = ({bag}) => {
  if(bag == false) return

  const dataFormated = [bag]?.map((data, i) => {
      
      const {_id, socketID, userRef, modeLive, isLiveLoading, online, liveData, ...user} = data    

      const dataCopied = Object.entries(user).filter(e => e[1] != false).map(info => `\n=== ${info[0]}: ${info[1]}`) + '\n\n'
      return dataCopied.replaceAll(',', '')
  })
  return navigator.clipboard.writeText(dataFormated[0])
}

