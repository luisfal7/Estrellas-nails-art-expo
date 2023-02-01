import { ModelResponse } from "../interfaces/ModelResponse";
import { ClientResponse } from '../interfaces/ClientResponse';
import { ServiceResponse } from '../interfaces/ServiceResponse';

export interface ApiEstrellaState {
    models: ModelResponse[];
    clients: ClientResponse[];
    services: ServiceResponse[];
    isLoading: boolean;
}

type ApiEstrellaAction =
| { type: 'get_models', payload: ModelResponse[] }
| { type: 'delete_model', payload: string }
| { type: 'get_clients', payload: ClientResponse[] }
| { type: 'delete_client', payload: string }
| { type: 'get_services', payload: ServiceResponse[] }
| { type: 'add_service', payload: ServiceResponse }
| { type: 'delete_service', payload: string }

export const apiEstrellaReducer = (state: ApiEstrellaState, action: ApiEstrellaAction):ApiEstrellaState => {

    switch (action.type) {
        case 'get_models':
            return {...state, models: action.payload, isLoading: false}

        case 'delete_model':
            return {...state, models: state.models.filter(e => e.model !== action.payload)}
        
        case 'get_clients':
            return {...state, clients: action.payload, isLoading: false}
        
        case 'delete_client':
            return {...state, clients: state.clients.filter(e => e.id !== action.payload)}

        case 'get_services':
            return {...state, services: action.payload}
        
        case 'add_service':
            return {...state, services: [...state.services, action.payload]}

        case 'delete_service':
            return {...state, services: state.services.filter(e => e.service !== action.payload)}
        

        default:
            return state;
    }

}