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
      owner: newRoom.owner,
      people: newRoom.owner
    }
    database.ref(`rooms/${room.name}`).set(room).then(() => {
      database.ref(`rooms/${room.name}/prompt`).set(room.prompt).then(() => {
        database.ref(`rooms/${room.name}/owner`).set(room.owner).then(() => {
          database.ref(`rooms/${room.name}/people/${room.people}`).set(room.people)
        })
      })
    })
    dispatch(afterRoomCreate(room.name))
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
export const joinRoom = data => {
  return (dispatch, getState) => {
    const newUserData = {
      roomName: data.room,
      user: data.userName
    }
    database.ref(`rooms/${newUserData.roomName}/people/${newUserData.user}`).set(data.userName)
    dispatch(afterJoinRoom(newUserData.roomName))
  }
}

/*==========submitting an idea ===========*/
//action
export const SUBMIT_IDEA = 'SUBMIT_IDEA'

//action creator
export const afterSubmitIdea = idea => ({
  type: SUBMIT_IDEA,
  idea
})

//thunk
export const submitIdea = (user, idea, roomName) => {
  return (dispatch, getState) => {
    const newIdea = {
      idea: idea,
      user: user
    }

    database.ref(`rooms/${roomName}/people/${user}/idea/${idea}`).set(idea)
    dispatch(afterSubmitIdea(newIdea))
  }
}

/*==========get room info===========*/
//action
export const GET_ROOM_INFO = 'GET_ROOM_INFO'

//action creator
export const afterGettingRoomInfo = room => ({
  type: GET_ROOM_INFO,
  room
})

//thunk

export const getRoom = roomName => {
  return (dispatch, getState) => {
    let roomInfo = {};
    database.ref(`rooms/${roomName}`).once('value', (snapshot) => {
      roomInfo = snapshot.val()
    }).then(() => dispatch(afterGettingRoomInfo(roomInfo)))
  }
}

/*===========random chooser===============*/
//action
//action creator
//thunk
/*======destroying a room===============*/
//action
//action creator
//thunk


