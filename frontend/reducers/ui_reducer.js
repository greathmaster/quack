import modalReducer from "./modal_reducer"
import infobarReducer from "./infobar_reducer.js"
import {combineReducers} from "redux"

const uiReducer = combineReducers({
	modal: modalReducer,
	// infobar: infobarReducer
})
export default uiReducer;