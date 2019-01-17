import { CREATE_ROOM } from "../rooms/actions"

const intitialState = []

export default (state = intitialState, action) => {
  switch (action.type) {

    case CREATE_ROOM:
      return [...state, action.room]

    default: return state
  }
}
