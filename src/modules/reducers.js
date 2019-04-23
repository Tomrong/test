import { combineReducers } from 'redux'

import list from './ListMovie/reducer'
export default combineReducers({
    list: list
})
