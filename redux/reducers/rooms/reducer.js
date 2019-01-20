import { CREATE_ROOM, JOIN_ROOM, SUBMIT_IDEA, GET_ROOM_INFO, GUEST_ADDED, MAKE_DECISION } from "../rooms/actions"

const intitialState = {
  roomName: "",
  users: [],
  ideas: [],
  room: {},
  decision: ''
}

export default (state = intitialState, action) => {
  switch (action.type) {

    case CREATE_ROOM:
      return {
        ...state, roomName: action.room.name
      }

    case JOIN_ROOM:
      return {
        ...state, roomName: action.room
      }

    case SUBMIT_IDEA:

      return { ...state, ideas: [...state.ideas, action.idea] }

    case GET_ROOM_INFO:
      return {
        ...state, room: action.room,
        users: action.room.users,
        ideas: action.room.ideas
      }

    case GUEST_ADDED:
      return { ...state }

    case MAKE_DECISION:
      return { ...state, decision: action.decision }

    default: return state
  }
}
