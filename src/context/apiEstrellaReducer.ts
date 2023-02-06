import { ModelResponse } from "../interfaces/ModelResponse";
import { ClientResponse } from "../interfaces/ClientResponse";
import { ServiceResponse } from "../interfaces/ServiceResponse";

export interface ApiEstrellaState {
  models: ModelResponse[];
  clients: ClientResponse[];
  services: ServiceResponse[];
  isLoading: boolean;
}

type ApiEstrellaAction =
  | { type: "get_models"; payload: ModelResponse[] }
  | { type: "delete_model"; payload: string }
  | { type: "add_model"; payload: ModelResponse }
  | { type: "get_clients"; payload: ClientResponse[] }
  | { type: "delete_client"; payload: string }
  | { type: "get_services"; payload: ServiceResponse[] }
  | { type: "add_service"; payload: ServiceResponse }
  | { type: "delete_service"; payload: string }
  | { type: "modif_service"; payload: ServiceResponse };

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

    case "delete_client":
      return {
        ...state,
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

    default:
      return state;
  }
};
