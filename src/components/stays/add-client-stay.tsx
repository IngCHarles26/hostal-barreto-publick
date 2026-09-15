'use client'

import { FaPlus, FaSearch, FaUserPlus } from "react-icons/fa"
import { CenterDialog, DialogContent, DialogFooterSave, DialogHeader, FilterSelectInput } from "../general"
import { useLoadingStore, useMessageStore, useStayStore } from "@/store"
import { TypeDocuments } from "@/generated/prisma/enums"
import { getAge, replaceSpace, replaceSubLine } from "@/lib/shared"
import { useState } from "react"
import { dialogClient } from "../clients"
import { ClientInStayRelationInterface, ClientList } from "@/lib/index.interface"
import { SAaddClientsToActiveStay, SAgetClientByDocument } from "@/lib/server"
import { filterString, onlyString, noSpace, onlyNumber, closeDialog } from "@/lib/client"

const dialogId = 'new-client-in-stay'


interface Props{
  clientList: ClientInStayRelationInterface[]
  currentRoom: number
  stayId: number
}

export const AddClientStay = ({clientList,currentRoom,stayId}:Props) => {
  const [stayData, setStayData] = useState({typeDocument:'DNI',numberDocument:''});
  const [newClientList, setNewClientList] = useState<ClientList[]>([]);
  const {stSetStaticMsg,stSetLoadingMsg} = useMessageStore()
  const {isSaving,setSavingST} = useLoadingStore()
  
  
  const handleSearch =  () => {
    const {typeDocument,numberDocument} = stayData
    
    if ( !typeDocument ) return stSetStaticMsg('Selecciona un tipo de documento')

    if ( numberDocument.length < 6 ) 
      return stSetStaticMsg('El Documento debe de ser de mas de 6 caracteres');

    if ( typeDocument === 'DNI' && numberDocument.length !== 8 )
      return stSetStaticMsg('El DNI debe tener 8 numeros')

    const clientInList = newClientList.some( el => el.numberDocument === numberDocument && el.typeDocument === typeDocument)
    const clientInStay = clientList.some( ({client:el}) => el.numberDocument === numberDocument && el.typeDocument === typeDocument)

    if ( clientInList || clientInStay )
      return stSetStaticMsg('El cliente ya se encuentra en la lista');

    searchClient(typeDocument as TypeDocuments,numberDocument)
  }
  
  const searchClient = async (typeDocument:TypeDocuments,numberDocument:string) => {
    if(isSaving) return
    stSetLoadingMsg('buscando')

    const newTypeDoc = replaceSpace(typeDocument) as TypeDocuments
    
    setSavingST(true)
    let {success,message,client} = await SAgetClientByDocument(newTypeDoc,numberDocument)
    setSavingST(false)

    setStayData(prev => ({...prev, numberDocument:''}))
    stSetStaticMsg(message,success)
    if ( !success || !client ) return;
    
    
    if( newClientList.some( el => el.id === client.id) ) return stSetStaticMsg('El cliente ya esta en la lista')
      
    const flag = client.country.flag
    const age = getAge(client.born)
    setNewClientList(prev => [...prev, {...client,typeDocument, numberDocument,flag,age}])
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      stSetStaticMsg('')
      
      const name = e.target.name as keyof typeof stayData
      const value = e.target.value
  
      let newValue = value
 
      if (name === 'numberDocument'){
        const typeDoc = stayData.typeDocument
        newValue = filterString(newValue,{onlyString,noSpace,onlyNumber})
        const lenValue = newValue.length
  
        if ( newValue.length < 6) stSetStaticMsg('EL Documento debe tener al menos 6 caracteres');
        newValue = filterString(newValue,{maxLimit:15})
  
        if (typeDoc === 'DNI') {
          newValue = filterString(newValue,{maxLimit:8,onlyNumber})
          if(newValue.length === 8) searchClient('DNI',newValue)
          if (newValue.length < 8)  stSetStaticMsg('EL DNI debe tener 8 numeros sasa');
        }
        else if ( typeDoc === 'Carnet Extranjeria') {
          newValue = filterString(newValue,{maxLimit:12})
          if ( lenValue < 9 ) stSetStaticMsg('EL Carnet de Extranjeria debe tener al menos 9 caracteres');
        }
        else if ( typeDoc === 'Pasaporte') newValue = filterString(newValue,{maxLimit:15})
      }
  
      if (name === 'typeDocument'){
        if (value === 'DNI') 
          setStayData( prev => ({ ...prev, 
            numberDocument:prev.numberDocument.slice(0,8) 
          }));
        else  if (value === 'Carnet_Extranjeria')
          setStayData( prev => ({ ...prev, 
            numberDocument:prev.numberDocument.slice(0,12) 
          }));
      }
  
      setStayData(prev => ({...prev, [name]: newValue}))
  }
    
  const handleCLick = async () => {
    closeDialog(dialogId)

    if(isSaving) return
    
    stSetLoadingMsg('Guardando')
    
    setSavingST(true)
    const newClientIds = newClientList.map( el => el.id)
    const success = await SAaddClientsToActiveStay(stayId,newClientIds)
    setSavingST(false)
    
    const message = success ? 'Clientes agregados correctamente' : 'No se pudo agregar a los clientes'

    stSetStaticMsg(message,success)

    setNewClientList([])
  }

  const deleteFromList = (id:string) => {
    setNewClientList(prev => prev.filter( el => el.id !== id))
  }
      
  
  return (
    <>
      <button popoverTarget={dialogId} className="bg-gray-01 text-white px-4 rounded-xl font-bold text-base ml-auto py-2">
        <FaUserPlus className="size-6"/>
      </button>

      <CenterDialog id={dialogId}>
        <DialogContent maxWRem={40}>
          <DialogHeader
            Icon={FaUserPlus}
            title={`Nuevo cliente HAB ${currentRoom}`}
            subTitle="Ingresa los el documento del nuevo cliente (*obligatorio)"
          />
          

          <div className="px-4 flex items-center gap-2 h-10 md:h-10.5">
          
            <FilterSelectInput
              id="select_type_document_stay"
              options={Object.keys(TypeDocuments).map( el => replaceSubLine(el) )}
              nameInput='numberDocument'
              nameSelect='typeDocument'
              onChangeInput={handleChange}
              onChangeSelect={handleChange}
              valueInput={stayData.numberDocument}
              valueSelect={stayData.typeDocument}
            />

            <button 
              className="bg-primary text-white px-2 md:px-4 rounded-xl font-bold text-base md:text-xl flex items-center gap-1 h-full"
              onClick={handleSearch}
            >
              <FaSearch className="size-4"/>
            </button>



            <button popoverTarget={dialogClient} className="bg-gray-01 text-white px-2 md:px-4 rounded-xl font-bold text-base flex items-center gap-1 h-full ml-auto">
              <FaPlus className="size-4"/>
              <span className="hidden md:block uppercase text-base">Nuevo</span>
            </button>

          </div>
          
          <div className='px-4 mt-5'>
            { newClientList.map( client => (
              <div 
                key={'posible-client-stay'+client.id}
                className='w-full flex items-center font-bold capitalize px-2 py-1'
              >
                <p className='w-1/4 uppercase'> {client.typeDocument.slice(0,3)} {client.numberDocument} </p>
                <p className='w-auto'>{client.flag} {client.firstName} {client.lastName} </p>
                <p className='ml-auto text-right text-nowrap'>{client.age} años</p>
                <button 
                  className='ml-2 uppercase px-3 py-1 bg-orange-1 text-white rounded-xl'
                  onClick={() => deleteFromList(client.id)}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          <DialogFooterSave
            id={dialogId }
            saveClick={handleCLick}
          />
        </DialogContent>
      </CenterDialog>
    
    </>
  )
}
