import { combineReducers } from 'redux'

//importing sub-reducers
import roomsReducer from './rooms/reducer'

//combining sub-reducers

const rootReducer = combineReducers({ room: roomsReducer })

export default rootReducer
