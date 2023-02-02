import { createContext, useReducer, useEffect } from "react";
import estrellasApi from "../api/estrellasApi";
import { ModelResponse } from "../interfaces/ModelResponse";
import { apiEstrellaReducer, ApiEstrellaState } from "./apiEstrellaReducer";
import { ClientResponse } from '../interfaces/ClientResponse';
import { ServiceResponse, AddService } from '../interfaces/ServiceResponse';

interface apiEstrellaContextProps {
  models: ModelResponse[];
  clients: ClientResponse[];
  services: ServiceResponse[];
  isLoading: boolean;
  getModels: () => void;
  deleteModel: (selectModel: ModelResponse) => void;
  getClients: () => void;
  deleteClient: (selectClient: ClientResponse) => void;
  getServices: () => void;
  deleteService: (selectService: ServiceResponse) => void;
  addService: (newService: ServiceResponse ) => any;
}

const initialState: ApiEstrellaState = {
  models: [],
  clients: [],
  services: [],
  isLoading: true,
};

export const ApiEstrellaContext = createContext({} as apiEstrellaContextProps);

export const ApiEstrellaProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(apiEstrellaReducer, initialState);

  const getModels = async () => {
    try {
      const models = await estrellasApi.get<ModelResponse>("/models.json");
      const responseModelsArray: ModelResponse[] = Object.entries(
        models.data
      ).map(([id, obj]) => ({ id, ...obj }));
      dispatch({ type: "get_models", payload: responseModelsArray });
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteModel = async(selectModel: ModelResponse) => {
    try {
      const { model, id } = selectModel;
      await estrellasApi.delete<ModelResponse>(
        `/models/${id}.json`,
        dispatch({ type: "delete_model", payload: model })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const getClients = async () => {
    try {
      const clients = await estrellasApi.get<ClientResponse>("/clients.json");
      const responseClientsArray: ClientResponse[] = Object.entries(
        clients.data
      ).map(([id, obj]) => ({ id, ...obj }));

      const clientsOrder = responseClientsArray.sort((a, b) => {
        if(a.fecha == b.fecha) {
          return 0; 
        }
        if(a.fecha < b.fecha) {
          return -1;
        }
        return 1
      })

      dispatch({ type: "get_clients", payload: clientsOrder });
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteClient = async(selectClient: ClientResponse) => {
    try {
      const { id } = selectClient;
      await estrellasApi.delete<ClientResponse>(
        `/clients/${id}.json`,
        dispatch({ type: "delete_client", payload: id })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const getServices = async () => {
    try {
      const services = await estrellasApi.get<ServiceResponse>("/services.json");
      const responseServicesArray: ServiceResponse[] = Object.entries(
        services.data
      ).map(([id, obj]) => ({ id, ...obj }));
      dispatch({ type: "get_services", payload: responseServicesArray });
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteService = async(selectService: ServiceResponse) => {
    try {
      const { service, precio } = selectService;
      const dataToSave = { service, precio }
      await estrellasApi.delete<ServiceResponse>(
        `/services/${selectService.id}.json`,
        dispatch({ type: "delete_service", payload: dataToSave.service })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const addService = async( newService: ServiceResponse ) => {
    try {
      
      const { data } = await estrellasApi.get(`/services.json`)
      const services = []
      for( let id of Object.keys( data ) ){
          services.push({
              id,
              ...data[id]
          })
      }
 
      if(!services.some( e => e.service.toUpperCase() === newService.service.toUpperCase() )){

          await estrellasApi.post(`services.json`, newService)

          return { ok: true }
      }else{
          return { ok: false }
      }

    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <ApiEstrellaContext.Provider
      value={{
        ...state,
        getModels,
        deleteModel,
        getClients,
        deleteClient,
        getServices,
        deleteService,
        addService,
      }}
    >
      {children}
    </ApiEstrellaContext.Provider>
  );
};
