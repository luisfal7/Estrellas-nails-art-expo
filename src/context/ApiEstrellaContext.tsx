import { createContext, useReducer, useEffect } from "react";
import estrellasApi from "../api/estrellasApi";
import { ModelResponse } from "../interfaces/ModelResponse";
import { apiEstrellaReducer, ApiEstrellaState } from "./apiEstrellaReducer";
import { ClientResponse } from '../interfaces/ClientResponse';
import { ServiceResponse } from '../interfaces/ServiceResponse';

interface apiEstrellaContextProps {
  models: ModelResponse[];
  clients: ClientResponse[];
  services: ServiceResponse[];
  getModels: () => void;
  deleteModel: (selectModel: ModelResponse) => void;
  getClients: () => void;
  getServices: () => void;
}

const initialState: ApiEstrellaState = {
  models: [],
  clients: [],
  services: [],
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
      dispatch({ type: "get_clients", payload: responseClientsArray });
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

  return (
    <ApiEstrellaContext.Provider
      value={{
        ...state,
        getModels,
        deleteModel,
        getClients,
        getServices,
      }}
    >
      {children}
    </ApiEstrellaContext.Provider>
  );
};
