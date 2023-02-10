import { ModelResponse } from "../interfaces/ModelResponse";
import { ClientResponse, Service } from "../interfaces/ClientResponse";
import { ServiceResponse } from "../interfaces/ServiceResponse";
import { StockResponse } from "../interfaces/StockResponse";
import { ExpenseResponse } from '../interfaces/ExpenseResponse';

export interface ApiEstrellaState {
  models: ModelResponse[];
  clients: ClientResponse[];
  services: ServiceResponse[];
  lastClient: ClientResponse | null;
  stock: StockResponse[];
  expense: ExpenseResponse[];
  isLoading: boolean;
}

type ApiEstrellaAction =
  | { type: "get_models"; payload: ModelResponse[] }
  | { type: "delete_model"; payload: string }
  | { type: "add_model"; payload: ModelResponse }
  | { type: "get_clients"; payload: ClientResponse[] }
  | { type: "get_last_client"; payload: ClientResponse }
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
      return { ...state, clients: action.payload, isLoading: false };

    case "get_last_client":
      return {
        ...state,
        lastClient: action.payload,
        isLoading: false,
      };

    case "delete_client":
      return {
        ...state,
        lastClient:
          state.lastClient?.id === action.payload ? null : state.lastClient,
        clients: state.clients.filter((e) => e.id !== action.payload),
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

    default:
      return state;
  }
};
