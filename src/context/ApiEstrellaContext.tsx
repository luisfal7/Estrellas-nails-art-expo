import { createContext, useReducer, useEffect } from "react";
import estrellasApi from "../api/estrellasApi";
import { ModelResponse } from "../interfaces/ModelResponse";
import { apiEstrellaReducer, ApiEstrellaState } from "./apiEstrellaReducer";
import { ClientResponse, Service } from '../interfaces/ClientResponse';
import { ServiceResponse } from "../interfaces/ServiceResponse";
import { StockResponse } from "../interfaces/StockResponse";

interface apiEstrellaContextProps {
  models: ModelResponse[];
  clients: ClientResponse[];
  services: ServiceResponse[];
  lastClient: ClientResponse | null;
  stock: StockResponse[];
  isLoading: boolean;
  getModels: () => void;
  deleteModel: (selectModel: ModelResponse) => void;
  getClients: () => void;
  deleteClient: (selectClient: ClientResponse) => void;
  getServices: () => void;
  deleteService: (selectService: ServiceResponse) => void;
  addService: (newService: ServiceResponse) => Promise<{ ok: boolean }>;
  modifService: (
    selectService: ServiceResponse
  ) => Promise<{ ok: boolean; message: string }>;
  addModel: (pickImage: string) => Promise<{ ok: boolean; message: string }>;
  lastClientResponse: () => Promise<void>;
  getStock: () => void;
  deleteStockItem: (selectItem: StockResponse) => void;
  addItemStock: (newItem: StockResponse) => Promise<{ ok: boolean }>;
  addServiceClient:(client: ClientResponse, newService: Service) => Promise<{ ok: boolean; message: string }>;
}

const initialState: ApiEstrellaState = {
  models: [],
  clients: [],
  services: [],
  lastClient: null,
  stock: [],
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

  const deleteModel = async (selectModel: ModelResponse) => {
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
        const fechaA = a.fecha.split("/");
        const diaA = parseInt(fechaA[0]);
        const mesA = parseInt(fechaA[1]) - 1;
        const yearA = parseInt(fechaA[2]);
        var fechaDateA = new Date(yearA, mesA, diaA);

        const fechaB = b.fecha.split("/");
        const diaB = parseInt(fechaB[0]);
        const mesB = parseInt(fechaB[1]) - 1;
        const yearB = parseInt(fechaB[2]);
        var fechaDateB = new Date(yearB, mesB, diaB);

        if (
          Date.parse(fechaDateA.toString()) ===
          Date.parse(fechaDateB.toString())
        ) {
          return 0;
        }
        if (
          Date.parse(fechaDateA.toString()) < Date.parse(fechaDateB.toString())
        ) {
          return -1;
        }
        return 1;
      });

      dispatch({ type: "get_clients", payload: clientsOrder });
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteClient = async (selectClient: ClientResponse) => {
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
      const services = await estrellasApi.get<ServiceResponse>(
        "/services.json"
      );
      const responseServicesArray: ServiceResponse[] = Object.entries(
        services.data
      ).map(([id, obj]) => ({ id, ...obj }));
      dispatch({ type: "get_services", payload: responseServicesArray });
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteService = async (selectService: ServiceResponse) => {
    try {
      const { service, precio } = selectService;
      const dataToSave = { service, precio };
      await estrellasApi.delete<ServiceResponse>(
        `/services/${selectService.id}.json`,
        dispatch({ type: "delete_service", payload: dataToSave.service })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const addService = async (newService: ServiceResponse) => {
    try {
      const services = await estrellasApi.get<ServiceResponse>(
        "/services.json"
      );

      const responseServicesArray: ServiceResponse[] = Object.entries(
        services.data
      ).map(([id, obj]) => ({ id, ...obj }));

      if (
        !responseServicesArray.some(
          (e) => e.service.toUpperCase() === newService.service.toUpperCase()
        )
      ) {
        await estrellasApi.post(`services.json`, newService);
        dispatch({ type: "add_service", payload: newService });
        return { ok: true };
      } else {
        return { ok: false };
      }
    } catch (error) {
      console.log({ error });
      return { ok: false, message: "Error al agregar servicio" };
    }
  };

  const modifService = async (selectService: ServiceResponse) => {
    try {
      const services = await estrellasApi.get<ServiceResponse>(
        "/services.json"
      );
      const responseServicesArray: ServiceResponse[] = Object.entries(
        services.data
      ).map(([id, obj]) => ({ id, ...obj }));

      const newService = responseServicesArray.some(
        (e) =>
          e.service.toUpperCase() === selectService.service.toUpperCase() &&
          e.precio === selectService.precio
      );

      if (!newService) {
        await estrellasApi.put(
          `/services/${selectService.id}.json`,
          selectService
        );

        dispatch({ type: "modif_service", payload: selectService });

        return {
          ok: true,
          message: "El servicio se ha modificado correctamente",
        };
      } else {
        return { ok: false, message: "¡El servicio ya existente!" };
      }
    } catch (error) {
      console.log({ error });
      return { ok: false, message: "Error en la carga del servicio" };
    }
  };

  const addModel = async (pickImage: string) => {
    try {
      const dataToSave: ModelResponse = {
        model: pickImage,
      };

      await estrellasApi.post(`models.json`, dataToSave);

      dispatch({ type: "add_model", payload: dataToSave });

      return {
        ok: true,
        message: "La imagen se ha subido correctamente",
      };
    } catch (error) {
      console.log({ error });
      return {
        ok: false,
        message:
          "Error en la carga de la imagen, vuelva a intentarlo mas tarde",
      };
    }
  };

  const lastClientResponse = async () => {
    try {
      const clients = await estrellasApi.get<ClientResponse>("/clients.json");
      const responseClientsArray: ClientResponse[] = Object.entries(
        clients.data
      ).map(([id, obj]) => ({ id, ...obj }));

      const lastClient = responseClientsArray.slice(
        responseClientsArray.length - 1,
        responseClientsArray.length
      )[0];
      dispatch({ type: "get_last_client", payload: lastClient });
    } catch (error) {
      console.log({ error });
    }
  };

  const getStock = async () => {
    try {
      const stock = await estrellasApi.get<StockResponse>("/stock.json");
      const responseStockArray: StockResponse[] = Object.entries(
        stock.data
      ).map(([id, obj]) => ({ id, ...obj }));
      dispatch({ type: "get_stock", payload: responseStockArray });
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteStockItem = async (selectItem: StockResponse) => {
    try {
      await estrellasApi.delete<StockResponse>(
        `/stock/${selectItem.id}.json`,
        dispatch({ type: "delete_stock_item", payload: selectItem })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const addItemStock = async (newItem: StockResponse) => {
    try {
      const stock = await estrellasApi.get<StockResponse>("/stock.json");

      const responseStockArray: StockResponse[] = Object.entries(
        stock.data
      ).map(([id, obj]) => ({ id, ...obj }));

      if (
        !responseStockArray.some(
          (e) =>
            e.categoria === newItem.categoria &&
            e.codigo === newItem.codigo &&
            e.contenidoNeto === newItem.contenidoNeto &&
            e.marca === newItem.marca &&
            e.subcategoria === newItem.subcategoria
        )
      ) {
        await estrellasApi.post(`stock.json`, newItem);
        dispatch({ type: "add_item_stock", payload: newItem });
        return { ok: true };
      } else {
        return { ok: false };
      }
    } catch (error) {
      console.log({ error });
      return { ok: false, message: "Error al agregar servicio" };
    }
  };

  const addServiceClient = async(client: ClientResponse, newService: Service) => {
    try {

      await estrellasApi.put(`/clients/${client.id}/service/${client.service.length}.json`, newService);

      const clientNewService = {
        client,
        newService
      }

      dispatch({ type: "add_service_client", payload: clientNewService })

      return {
        ok: true,
        message: "el nuevo servicio se agregado correctamente",
      };
    } catch (error) {
      console.log({ error });
      return {
        ok: false,
        message:
          "Error en la carga del nuevo servicio, vuelva a intentarlo mas tarde",
      };
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
        modifService,
        addModel,
        lastClientResponse,
        getStock,
        deleteStockItem,
        addItemStock,
        addServiceClient,
      }}
    >
      {children}
    </ApiEstrellaContext.Provider>
  );
};
