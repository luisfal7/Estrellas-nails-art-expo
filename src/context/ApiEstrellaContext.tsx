import { createContext, useReducer, useEffect } from "react";
import estrellasApi from "../api/estrellasApi";
import { ModelResponse } from "../interfaces/ModelResponse";
import { apiEstrellaReducer, ApiEstrellaState } from "./apiEstrellaReducer";

interface apiEstrellaContextProps {
    models: ModelResponse[];
    getModels: () => void;
}

const initialState: ApiEstrellaState = {
    models: []
}

export const ApiEstrellaContext = createContext({} as apiEstrellaContextProps);

export const ApiEstrellaProvider = ({children}: any) => {

    const [state, dispatch] = useReducer(apiEstrellaReducer, initialState)

    const getModels = async() => {

        try {

            const models = await estrellasApi.get<ModelResponse>('/models.json')
            const responseModelsArray:ModelResponse[] = Object.entries(models.data).map(([id, obj]) => ({id, ...obj}))
            dispatch({ type: 'get_models', payload: responseModelsArray})
    
        } catch (error) {
            console.log({error})   
        }

    }

    return(
        <ApiEstrellaContext.Provider value={{
            ...state,
            getModels,
        }}>
            { children }
        </ApiEstrellaContext.Provider>
    )

}