import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

import loSortBy from 'lodash/sortBy'
import { GameTypes } from './gameRedux'
import { genUID } from '../utils/commons'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  rankingRequest: null,
})

export const RankingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],
})

/* ------------- Reducers ------------- */
const finishGameRequest = (state, { time, callback }) => {
  const id = genUID()
  const game = { id, time, datetime: new Date() }
  let data = state.data || []
  data = data.concat(game)
  data = loSortBy(data, 'time')

  if (callback) { callback(game) }
  return state.merge({ data })
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [GameTypes.FINISH_GAME_REQUEST]: finishGameRequest,
})
