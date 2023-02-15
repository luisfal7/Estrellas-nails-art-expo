import { ModelResponse } from "../interfaces/ModelResponse";
import { ClientResponse, Service } from "../interfaces/ClientResponse";
import { ServiceResponse } from "../interfaces/ServiceResponse";
import { StockResponse } from "../interfaces/StockResponse";
import { ExpenseResponse } from "../interfaces/ExpenseResponse";

export interface ApiEstrellaState {
  models: ModelResponse[];
  clients: ClientResponse[];
  services: ServiceResponse[];
  lastClient: ClientResponse | null;
  stock: StockResponse[];
  expense: ExpenseResponse[];
  profitGroos: number;
  profitCurrent: number;
  isLoading: boolean;
}

type ApiEstrellaAction =
  | { type: "get_models"; payload: ModelResponse[] }
  | { type: "delete_model"; payload: string }
  | { type: "add_model"; payload: ModelResponse }
  | {
      type: "get_clients";
      payload: {
        clientsOrderDate: ClientResponse[];
        lastClient: ClientResponse;
      };
    }
  | { type: "delete_client"; payload: string }
  | { type: "get_services"; payload: ServiceResponse[] }
  | { type: "add_service"; payload: ServiceResponse }
  | { type: "delete_service"; payload: string }
  | { type: "modif_service"; payload: ServiceResponse }
  | { type: "get_stock"; payload: StockResponse[] }
  | { type: "delete_stock_item"; payload: StockResponse }
  | { type: "add_item_stock"; payload: StockResponse }
  | {
      type: "add_service_client";
      payload: { client: ClientResponse; newService: Service };
    }
  | { type: "add_item_expense"; payload: ExpenseResponse }
  | { type: "get_expense"; payload: ExpenseResponse[] }
  | { type: "delete_expense_item"; payload: ExpenseResponse }
  | { type: "modif_expense"; payload: ExpenseResponse }
  | { type: "modif_item_stock"; payload: StockResponse }
  | {
      type: "delete_service_client";
      payload: { client: ClientResponse; selectService: Service };
    }
  | {
      type: "add_quantity_service_client";
      payload: { client: ClientResponse; selectService: Service };
    }
  | {
      type: "minus_quantity_service_client";
      payload: { client: ClientResponse; selectService: Service };
    };

export const apiEstrellaReducer = (
  state: ApiEstrellaState,
  action: ApiEstrellaAction
): ApiEstrellaState => {
  switch (action.type) {
    case "get_models":
      return { ...state, models: action.payload, isLoading: false };

    case "delete_model":
      return {
        ...state,
        models: state.models.filter((e) => e.model !== action.payload),
        isLoading: false,
      };

    case "add_model":
      return {
        ...state,
        models: [...state.models, action.payload],
        isLoading: false,
      };

    case "get_clients":
      return {
        ...state,
        clients: action.payload.clientsOrderDate,
        lastClient: action.payload.lastClient,
        profitGroos: [
          ...action.payload.clientsOrderDate,
          action.payload.lastClient,
        ]
          .map((e) => e.service)
          .flat()
          .map((d) => d.precio)
          .reduce((pv, cv) => parseInt(pv) + parseInt(cv), 0),
        isLoading: false,
      };

    case "delete_client":
      return {
        ...state,
        lastClient:
          state.lastClient?.id === action.payload ? null : state.lastClient,
        clients: state.clients.filter((e) => e.id !== action.payload),
        profitGroos:
          state.profitGroos -
          state.clients
            .filter((e) => e.id === action.payload)[0]
            .service.map((d) => d.precio)
            .reduce((pv, cv) => parseInt(pv) + parseInt(cv), 0),
        isLoading: false,
      };

    case "get_services":
      return { ...state, services: action.payload, isLoading: false };

    case "add_service":
      return {
        ...state,
        services: [...state.services, action.payload],
        isLoading: false,
      };

    case "delete_service":
      return {
        ...state,
        services: state.services.filter((e) => e.service !== action.payload),
        isLoading: false,
      };

    case "modif_service":
      return {
        ...state,
        services: state.services.map((e) =>
          e.id === action.payload.id ? (e = action.payload) : e
        ),
        isLoading: false,
      };

    case "get_stock":
      return { ...state, stock: action.payload, isLoading: false };

    case "delete_stock_item":
      return {
        ...state,
        stock: state.stock.filter((e) => e !== action.payload),
        isLoading: false,
      };

    case "add_item_stock":
      return {
        ...state,
        stock: [...state.stock, action.payload],
        isLoading: false,
      };

    case "add_service_client":
      return {
        ...state,
        clients: state.clients.map((e) =>
          e.id === action.payload.client.id
            ? { ...e, service: [...e.service, action.payload.newService] }
            : e
        ),
        profitGroos:
          state.profitGroos + parseInt(action.payload.newService.precio),
        isLoading: false,
      };

    case "add_quantity_service_client":
      const precio = () => {
        switch (action.payload.selectService.id) {
          case "-NLa2pqZjnzx5PeHlcuT":
            return parseInt(action.payload.selectService.precio) + 200;

          case "-NNMrmW-HcerSLAmqt24":
            return parseInt(action.payload.selectService.precio) + 200;

          case "-NNMrupL-q15zOwfPiqr":
            return parseInt(action.payload.selectService.precio) + 100;

          default:
            return parseInt(action.payload.selectService.precio);
        }
      };
      return {
        ...state,
        clients: state.clients.map((e) =>
          e.id === action.payload.client.id && action.payload.client.id !== state.lastClient?.id
            ? {
                ...e,
                service: e.service.map((d) =>
                  d.id === action.payload.selectService.id
                    ? {
                        ...d,
                        cantidad: (parseInt(d.cantidad) + 1).toString(),
                        precio: precio().toString(),
                      }
                    : d
                ),
              }
            : e
        ),
        lastClient:
          state.lastClient?.id === action.payload.client.id
            ? {
                ...state.lastClient,
                service: state.lastClient.service.map((e) =>
                  e.id === action.payload.selectService.id
                    ? {
                        ...e,
                        cantidad: (parseInt(e.cantidad) + 1).toString(),
                        precio: precio().toString(),
                      }
                    : e
                ),
              }
            : state.lastClient,

        profitGroos:
          state.profitGroos + parseInt(action.payload.selectService.precio),
        isLoading: false,
      };

    case "minus_quantity_service_client":
      const precioMinus = () => {
        switch (action.payload.selectService.id) {
          case "-NLa2pqZjnzx5PeHlcuT":
            return parseInt(action.payload.selectService.precio) - 200;

          case "-NNMrmW-HcerSLAmqt24":
            return parseInt(action.payload.selectService.precio) - 200;

          case "-NNMrupL-q15zOwfPiqr":
            return parseInt(action.payload.selectService.precio) - 100;

          default:
            return parseInt(action.payload.selectService.precio);
        }
      };
      return {
        ...state,
        clients: state.clients.map((e) =>
          e.id === action.payload.client.id && action.payload.client.id !== state.lastClient?.id
            ? {
                ...e,
                service: e.service.map((d) =>
                  d.id === action.payload.selectService.id
                    ? {
                        ...d,
                        cantidad:
                          parseInt(d.cantidad) <= 1
                            ? String(1)
                            : (parseInt(d.cantidad) - 1).toString(),
                        precio:
                          parseInt(d.cantidad) <= 1
                            ? d.precio
                            : precioMinus().toString(),
                      }
                    : d
                ),
              }
            : e
        ),
        lastClient:
          state.lastClient?.id === action.payload.client.id
            ? {
                ...state.lastClient,
                service: state.lastClient.service.map((e) =>
                  e.id === action.payload.selectService.id
                    ? {
                        ...e,
                        cantidad:
                          parseInt(e.cantidad) <= 1
                            ? String(1)
                            : (parseInt(e.cantidad) - 1).toString(),
                        precio:
                          parseInt(e.cantidad) <= 1
                            ? e.precio
                            : precioMinus().toString(),
                      }
                    : e
                ),
              }
            : state.lastClient,
        profitGroos:
          parseInt(action.payload.selectService.cantidad) <= 1
            ? state.profitGroos
            : state.profitGroos - parseInt(action.payload.selectService.precio),
        isLoading: false,
      };

    case "delete_service_client":
      return {
        ...state,
        clients: state.clients.map((e) =>
          e.id === action.payload.client.id
            ? {
                ...e,
                service: e.service.filter(
                  (e) => e.id !== action.payload.selectService.id
                ),
              }
            : e
        ),
        profitGroos:
          state.profitGroos - parseInt(action.payload.selectService.precio),
        isLoading: false,
      };

    case "add_item_expense":
      return {
        ...state,
        expense: [...state.expense, action.payload],
        isLoading: false,
      };

    case "get_expense":
      return { ...state, expense: action.payload, isLoading: false };

    case "delete_expense_item":
      return {
        ...state,
        expense: state.expense.filter((e) => e !== action.payload),
        isLoading: false,
      };

    case "modif_expense":
      return {
        ...state,
        expense: state.expense.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
        isLoading: false,
      };

    case "modif_item_stock":
      return {
        ...state,
        stock: state.stock.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
        isLoading: false,
      };

    default:
      return state;
  }
};
