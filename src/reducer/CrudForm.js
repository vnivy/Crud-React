import { CrudActionType } from "service/actionType"

const initialState = {
    listData: []
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case CrudActionType.getFormData:
            return {
                ...state,
            }
        case CrudActionType.addFormData:
            return {
                ...state,
                listData: state.listData.concat(payload)
            }
        case CrudActionType.editFormData:
            return {
                ...state,
                listData: state.listData.map(
                    (content, i) => content.id === payload.id ? {...content, 
                         fullName : payload.fullName, 
                         email : payload.email, 
                         age : payload.age,  
                         number : payload.number 
                    } : content)
            }
        case CrudActionType.deleteFormData:
            return {
                ...state,
                listData: state.listData.filter(item => item.id !== payload)
            }
        default:
            return state
    }
}