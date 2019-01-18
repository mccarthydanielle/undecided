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
      prompt: newRoom.prompt,
      owner: newRoom.owner
    }
    database.ref(`rooms/${room.name}`).set(room).then(() => {
      database.ref(`rooms/${room.name}/prompt`).set(room.prompt).then(() => {
        database.ref(`rooms/${room.name}/owner`).set(room.owner)
      })
    })
    dispatch(afterRoomCreate(room))
  }
}
/*======joining a room===============*/
//action
export const JOIN_ROOM = 'JOIN_ROOM'
//action creator
export const afterJoinRoom = room => ({
  type: JOIN_ROOM,
  room
})
//thunk
export const joinRoom = (data = {}) => {
  return (dispatch, getState) => {
    const state = getState();
    const user = {
      name: user.name,
      idea: '',
    }
    database.ref(`rooms/${data.roomName}`).once('value', (snapshot) => {
      const value = snapshot.val();
      const id = data.id;
      if (value === null) {
        console.log('Room not found!')
      }
    })
  }
}
/*==========submitting an idea ===========*/
//action
//action creator
//thunk
/*===========random chooser===============*/
//action
//action creator
//thunk
/*======destroying a room===============*/
//action
//action creator
//thunk


