import { CrudActionType } from "service/actionType"

export const getAddDetails = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ 
            type: CrudActionType.addFormData, 
            payload: data
         })
    })
}

export const getEditDetails = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ 
            type: CrudActionType.editFormData,
             payload: data 
            })
    })
}

export const getDetails = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({
             type: CrudActionType.getFormData 
            })
    })
}

export const getDeleteDetails = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ 
            type: CrudActionType.deleteFormData, 
            payload: data 
        })
    })
}