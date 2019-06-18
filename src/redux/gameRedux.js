import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { generateGameData, checkComplete } from '../utils/gameHelper'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  generateGameDataRequest: null,
  changeValueItemRequest: ['index'],
  finishGameRequest: ['time', 'callback'],
})

export const GameTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: generateGameData(),
  isComplete: false,
})

/* ------------- Reducers ------------- */
const generateGameDataRequest = (state) => (
  state.merge({ data: generateGameData() })
)

const changeValueItemRequest = (state, { index }) => {
  const data = state.data ? state.data.asMutable() : []
  if (data[index].isAutoGen) { return state }

  data[index] = data[index].merge({ value: (data[index].value + 1) % 3 })
  const isComplete = checkComplete(data)

  return state.merge({ data, isComplete })
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GENERATE_GAME_DATA_REQUEST]: generateGameDataRequest,
  [Types.CHANGE_VALUE_ITEM_REQUEST]: changeValueItemRequest,
})
