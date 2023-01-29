import { ModelResponse } from "../interfaces/ModelResponse";

export interface ApiEstrellaState {
    models: ModelResponse[];
}

type ApiEstrellaAction =
| { type: 'get_models', payload:ModelResponse[]; }

export const apiEstrellaReducer = (state: ApiEstrellaState, action: ApiEstrellaAction):ApiEstrellaState => {

    switch (action.type) {
        case 'get_models':
            return {...state, models: action.payload}

        default:
            return state;
    }

}