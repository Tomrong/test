import { SAVE_DATA } from './actions'
const initialState = {}

export default function(state = initialState, action) {
    switch (action.type) {
        case SAVE_DATA:
          return Object.assign({}, state, { list: action.payload })
        default:
          return state
      }
}
