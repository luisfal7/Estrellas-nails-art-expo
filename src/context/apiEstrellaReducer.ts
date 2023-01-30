import { ModelResponse } from "../interfaces/ModelResponse";
import { ClientResponse } from '../interfaces/ClientResponse';
import { ServiceResponse } from '../interfaces/ServiceResponse';

export interface ApiEstrellaState {
    models: ModelResponse[];
    clients: ClientResponse[];
    services: ServiceResponse[];
}

type ApiEstrellaAction =
| { type: 'get_models', payload: ModelResponse[] }
| { type: 'delete_model', payload: string }
| { type: 'get_clients', payload: ClientResponse[] }
| { type: 'get_services', payload: ServiceResponse[] }

export const apiEstrellaReducer = (state: ApiEstrellaState, action: ApiEstrellaAction):ApiEstrellaState => {

    switch (action.type) {
        case 'get_models':
            return {...state, models: action.payload}

        case 'delete_model':
            return {...state, models: state.models.filter(e => e.model !== action.payload)}
        
        case 'get_clients':
            return {...state, clients: action.payload}

        case 'get_services':
            return {...state, services: action.payload}

        default:
            return state;
    }

}