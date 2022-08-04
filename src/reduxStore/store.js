import {combineReducers , createStore} from 'redux'
import reducer from './reducer'

const rootReducer =combineReducers({
    reducer:reducer
})
const store = createStore(rootReducer)
export default store