import { createContext, useReducer, useEffect } from "react";
import estrellasApi from "../api/estrellasApi";
import { ModelResponse } from "../interfaces/ModelResponse";
import { apiEstrellaReducer, ApiEstrellaState } from "./apiEstrellaReducer";
import { ClientResponse, Service } from "../interfaces/ClientResponse";
import { ServiceResponse } from "../interfaces/ServiceResponse";
import { StockResponse } from "../interfaces/StockResponse";
import { ExpenseResponse } from "../interfaces/ExpenseResponse";

interface apiEstrellaContextProps {
  models: ModelResponse[];
  clients: ClientResponse[];
  services: ServiceResponse[];
  lastClient: ClientResponse | null;
  stock: StockResponse[];
  expense: ExpenseResponse[];
  profitGroos: number;
  profitCurrent: number;
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
  getStock: () => void;
  deleteStockItem: (selectItem: StockResponse) => void;
  addItemStock: (newItem: StockResponse) => Promise<{ ok: boolean }>;
  addServiceClient: (
    client: ClientResponse,
    newService: Service
  ) => Promise<{ ok: boolean; message: string }>;
  deleteServiceClient: (client: ClientResponse, selectService: Service) => void;
  addQuantityServiceClient: (
    client: ClientResponse,
    selectService: Service
  ) => void;
  minusQuantityServiceClient: (
    client: ClientResponse,
    selectService: Service
  ) => void;
  addItemExpense: (
    newItem: ExpenseResponse
  ) => Promise<{ ok: boolean; message: string }>;
  getExpense: () => void;
  deleteExpenseItem: (selectItem: ExpenseResponse) => void;
  modifExpense: (
    selectItem: ExpenseResponse
  ) => Promise<{ ok: boolean; message: string }>;
  modifItemStock: (
    selectItemStock: StockResponse
  ) => Promise<{ ok: boolean; message: string }>;
}

const initialState: ApiEstrellaState = {
  models: [],
  clients: [],
  services: [],
  lastClient: null,
  stock: [],
  expense: [],
  profitGroos: 0,
  profitCurrent: 0,
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
      const clientsApi = await estrellasApi.get<ClientResponse>(
        "/clients.json"
      );
      const responseClientsArray: ClientResponse[] = Object.entries(
        clientsApi.data
      ).map(([id, obj]) => ({ id, ...obj }));

      const lastClient = responseClientsArray.slice(
        responseClientsArray.length - 1,
        responseClientsArray.length
      )[0];

      const clientsOrderDate = responseClientsArray.sort((a, b) => {
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

      const clients = {
        clientsOrderDate,
        lastClient,
      };

      dispatch({ type: "get_clients", payload: clients });
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteClient = async (selectClient: ClientResponse) => {
    try {

      const clientsApi = await estrellasApi.get<ClientResponse>(
        "/clients.json"
      );
      const responseClientsArray: ClientResponse[] = Object.entries(
        clientsApi.data
      ).map(([id, obj]) => ({ id, ...obj }));

      let lastClient = responseClientsArray.slice(
        responseClientsArray.length - 1,
        responseClientsArray.length
      )[0];

      if(selectClient.id === lastClient.id){
        lastClient = responseClientsArray[responseClientsArray.length - 2]
      }

      const selectClientDelete = {
        selectClient,
        lastClient
      }

      await estrellasApi.delete<ClientResponse>(
        `/clients/${selectClient.id}.json`, selectClientDelete.selectClient.id
        );
      dispatch({ type: "delete_client", payload: selectClientDelete })
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
      if (
        !state.services.some(
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
      const newService = state.services.some(
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
      if (
        !state.stock.some(
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

  const addServiceClient = async (
    client: ClientResponse,
    newService: Service
  ) => {
    try {
      await estrellasApi.put(
        `/clients/${client.id}/service/${client.service.length}.json`,
        newService
      );

      const clientNewService = {
        client,
        newService,
      };

      dispatch({ type: "add_service_client", payload: clientNewService });

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

  const deleteServiceClient = async (
    client: ClientResponse,
    selectService: Service
  ) => {
    try {
      const clientDeleteService = {
        client,
        selectService,
      };

      dispatch({ type: "delete_service_client", payload: clientDeleteService });

      const editServices = state.clients
        .filter((e) => e.id === client.id)[0]
        .service.filter((e) => e.id !== selectService.id);

      await estrellasApi.put(
        `/clients/${client.id}/service.json`,
        editServices
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const addQuantityServiceClient = async (
    client: ClientResponse,
    selectService: Service
  ) => {
    try {
      const clientService = {
        client,
        selectService,
      };

      const indexService = state.clients
        .filter((e) => e.id === client.id)[0]
        .service.map((e) => e.id)
        .indexOf(selectService.id);

      const precio = () => {
        switch (selectService.id) {
          case "-NLa2pqZjnzx5PeHlcuT":
            return parseInt(selectService.precio) + 200
            
          case "-NNMrmW-HcerSLAmqt24":
            return parseInt(selectService.precio) + 200
  
          case "-NNMrupL-q15zOwfPiqr":
            return parseInt(selectService.precio) + 100
        
          default:
            return parseInt(selectService.precio)
        }
      }
        
       await estrellasApi.put(
        `/clients/${client.id}/service/${indexService}.json`,         
          {
            ...selectService,
            cantidad: (parseInt(selectService.cantidad) + 1).toString(),
            precio: precio().toString()
          }
        );
        
      dispatch({ type: "add_quantity_service_client", payload: clientService })
        
    } catch (error) {
      console.log({ error });
    }
  };

  const minusQuantityServiceClient = async (
    client: ClientResponse,
    selectService: Service
  ) => {
    try {
      const clientService = {
        client,
        selectService,
      };

      const indexService = state.clients
        .filter((e) => e.id === client.id)[0]
        .service.map((e) => e.id)
        .indexOf(selectService.id);

      const precio = () => {
        switch (selectService.id) {
          case "-NLa2pqZjnzx5PeHlcuT":
            return parseInt(selectService.precio) - 200
            
          case "-NNMrmW-HcerSLAmqt24":
            return parseInt(selectService.precio) - 200
  
          case "-NNMrupL-q15zOwfPiqr":
            return parseInt(selectService.precio) - 100
        
          default:
            return parseInt(selectService.precio)
        }
      }

      await estrellasApi.put(
        `/clients/${client.id}/service/${indexService}.json`,
        {
          ...selectService,
          cantidad: parseInt(selectService.cantidad) <= 1 ? String(1) : (parseInt(selectService.cantidad) - 1).toString(),
          precio: parseInt(selectService.cantidad) <= 1 ? selectService.precio : precio().toString()
        }
      );

      dispatch({
        type: "minus_quantity_service_client",
        payload: clientService,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const getExpense = async () => {
    try {
      const expense = await estrellasApi.get<ExpenseResponse>("/expense.json");
      const responseExpenseArray: ExpenseResponse[] = Object.entries(
        expense.data
      ).map(([id, obj]) => ({ id, ...obj }));
      dispatch({ type: "get_expense", payload: responseExpenseArray });
    } catch (error) {
      console.log({ error });
    }
  };

  const addItemExpense = async (newItem: ExpenseResponse) => {
    try {
      if (!state.expense.some((e) => e === newItem)) {
        await estrellasApi.post(`expense.json`, newItem);
        dispatch({ type: "add_item_expense", payload: newItem });
        return {
          ok: true,
          message: "El item de gastos se ha cargado correctamente",
        };
      } else {
        return { ok: false, message: "¡El item de gastos ya existente!" };
      }
    } catch (error) {
      console.log({ error });
      return { ok: false, message: "Error al agregar servicio" };
    }
  };

  const deleteExpenseItem = async (selectItem: ExpenseResponse) => {
    try {
      await estrellasApi.delete<ExpenseResponse>(
        `/expense/${selectItem.id}.json`,
        selectItem
      );
      dispatch({ type: "delete_expense_item", payload: selectItem });
    } catch (error) {
      console.log({ error });
    }
  };

  const modifExpense = async (selectItem: ExpenseResponse) => {
    try {
      const newItem = state.expense.some((e) => e === selectItem);

      if (!newItem) {
        await estrellasApi.put(`/expense/${selectItem.id}.json`, selectItem);

        dispatch({ type: "modif_expense", payload: selectItem });

        return {
          ok: true,
          message: "El item de gasto se ha modificado correctamente",
        };
      } else {
        return { ok: false, message: "¡El item de gasto ya existente!" };
      }
    } catch (error) {
      console.log({ error });
      return { ok: false, message: "Error en la carga del servicio" };
    }
  };

  const modifItemStock = async (selectItemStock: StockResponse) => {
    try {
      const newItem = state.stock.some((e) => e === selectItemStock);

      if (!newItem) {
        await estrellasApi.put(
          `/stock/${selectItemStock.id}.json`,
          selectItemStock
        );

        dispatch({ type: "modif_item_stock", payload: selectItemStock });

        return {
          ok: true,
          message: "El item de stock se ha modificado correctamente",
        };
      } else {
        return { ok: false, message: "¡El item de stock ya existente!" };
      }
    } catch (error) {
      console.log({ error });
      return { ok: false, message: "Error en la carga del servicio" };
    }
  };

  useEffect(() => {
    getClients();
    getExpense()
  }, []);

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
        getStock,
        deleteStockItem,
        addItemStock,
        addServiceClient,
        deleteServiceClient,
        addQuantityServiceClient,
        minusQuantityServiceClient,
        addItemExpense,
        getExpense,
        deleteExpenseItem,
        modifExpense,
        modifItemStock,
      }}
    >
      {children}
    </ApiEstrellaContext.Provider>
  );
};
