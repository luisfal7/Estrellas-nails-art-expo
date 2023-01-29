import React, {useEffect} from 'react'
import estrellasApi from "../api/estrellasApi"
import { useState } from 'react';
import { ClientResponse } from '../interfaces/ClientResponse';
import { ModelResponse } from '../interfaces/ModelResponse';
import { ServiceResponse } from '../interfaces/ServiceResponse';

interface Props {      
    clients: ClientResponse[];
    models: ModelResponse[];
    services: ServiceResponse[];
}

export const useEstrellas = () => {

    const [isLoading, setIsLoading] = useState(true)

    const [stateEstrellas, setStateEstrellas] = useState<Props>({
        clients:[],
        models:[],
        services:[]
    })

    const getEstrellas = async() => {

        const clients = estrellasApi.get<ClientResponse>('/clients.json');
        const models = estrellasApi.get<ModelResponse>('/models.json');
        const services = estrellasApi.get<ServiceResponse>('/services.json');

        const response = await Promise.all([
            clients,
            models,
            services,
        ])
        
        const responseClientsArray: ClientResponse[] = Object.entries(response[0].data).map(([id, obj]) => ({id, ...obj}) )
        const responseModelsArray: ModelResponse[] = Object.entries(response[1].data).map(([id, obj]) => ({id, ...obj}) )
        const responseServicesArray: ServiceResponse[] = Object.entries(response[2].data).map(([id, obj]) => ({id, ...obj}) )
  
        setStateEstrellas({
            clients: responseClientsArray,
            models: responseModelsArray,
            services: responseServicesArray,
        })

        setIsLoading(false)
    }

    const deleteModel = async( selectModel: ModelResponse ) => {

        const { model, id } = selectModel

        await estrellasApi.delete<any, any, any>( `/models/${ id }.json`, model )

        return { ok: true }
    }

    useEffect(() => {
        getEstrellas();
      }, []);

  return {
    ...stateEstrellas,
    isLoading,
    deleteModel,
  }
}

