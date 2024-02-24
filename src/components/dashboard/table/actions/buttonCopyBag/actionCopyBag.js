export const actionCopyBag = ({bag}) => {
  if(bag == false) return

  const dataFormated = [bag]?.map((e, i) => {
      delete e?._id
      delete e?.socketID
      delete e?.userRef
      delete e?.modeLive
      delete e?.isLiveLoading
      delete e?.online
      delete e?.liveData

      const dataCopied = Object.entries(e).filter(e => e[1] != false).map(info => `\n=== ${info[0]}: ${info[1]}`) + '\n\n'
      return dataCopied.replaceAll(',', '')
  })
  return navigator.clipboard.writeText(dataFormated[0])
}

