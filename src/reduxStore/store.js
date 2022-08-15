import {combineReducers , createStore} from 'redux'
import reducer from './reducer'
import CartReducer from './Cart'

const rootReducer =combineReducers({
    reducer:reducer,
    CartReducer:CartReducer,
})
const store = createStore(rootReducer)
export default store