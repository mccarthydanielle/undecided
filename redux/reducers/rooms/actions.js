import { database } from "../../../firebase/Fire"

/*======creating a room===============*/

//action
export const CREATE_ROOM = 'CREATE_ROOM'

//action creator
export const afterRoomCreate = room => ({
  type: CREATE_ROOM,
  room
})

//thunk

export const createRoom = (newRoom = {}, showCreateError) => {
  return (dispatch, getState) => {

    const room = {
      name: newRoom.name,
      prompt: newRoom.prompt
    }

    database.ref(`rooms/${room.name}`).set(room).then(() => {
      return database.ref(`rooms/${room.name}/prompt`).set(room.prompt)
    })
    dispatch(afterRoomCreate(room))

  }
}

/*======joining a room===============*/

/*======destroying a room===============*/

