import { combineReducers } from 'redux'

//importing sub-reducers
import roomsReducer from './rooms/reducer'

//combining sub-reducers

const rootReducer = combineReducers({ rooms: roomsReducer })

export default rootReducer
