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
export const createRoom = (newRoom = {}, errorFn) => {
  return (dispatch, getState) => {
    const room = {
      name: newRoom.name,
      prompt: newRoom.prompt,
      owner: newRoom.owner,
      people: newRoom.owner,
      ideas: "ideas"
    }

    //checking whether the room exists
    database.ref('rooms').once('value', (snapshot) => {
      const rooms = [];
      snapshot.forEach((childSnapshot) => {
        rooms.push(childSnapshot.val().name)
      })
      if (!rooms.includes(room.name)) {
        database.ref(`rooms/${room.name}`).set(room).then(() => {
          database.ref(`rooms/${room.name}/prompt`).set(room.prompt).then(() => {
            database.ref(`rooms/${room.name}/owner`).set(room.owner).then(() => {
              database.ref(`rooms/${room.name}/people/${room.people}`).set(room.people).then(() => {
                database.ref(`rooms/${room.name}/ideas/`).set(room.ideas)
              })
            })
          })
        })
        dispatch(afterRoomCreate(room))
      } else {
        console.log('Room name not available!')
        return errorFn('Room name not available!')
      }
    })




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
  return (dispatch) => {
    const newUserData = {
      roomName: data.room,
      user: data.userName
    }
    database.ref(`rooms/${newUserData.roomName}/people/${newUserData.user}`).set(newUserData.user)
    dispatch(afterJoinRoom(newUserData))
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
      user: idea
    }

    database.ref(`rooms/${roomName}/people/${user}/idea`).set(idea)
    database.ref(`rooms/${roomName}/ideas/${user}`).set(idea)
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
  let newRoomObject = {}
  return (dispatch) => {
    database.ref(`rooms/${roomName}`).once('value', (snapshot) => {
      const roomInfo = snapshot.val()

      const users = Object.keys(roomInfo.people)
      let ideas = []
      if (typeof roomInfo.ideas === "object") ideas = Object.values(roomInfo.ideas)


      newRoomObject.name = roomInfo.name
      newRoomObject.owner = roomInfo.owner
      newRoomObject.prompt = roomInfo.prompt
      newRoomObject.peopleAndIdeas = roomInfo.people
      newRoomObject.users = users
      newRoomObject.ideas = ideas


    }).then(() => dispatch(afterGettingRoomInfo(newRoomObject)))
  }
}

/*===========listening to database for user joining room===============*/

export const userJoinedRoomEvent = (roomName) => {
  return (dispatch) => {
    database.ref(`rooms/${roomName}/people`).on('child_added', (snap) => {
      dispatch(getRoom(roomName))
    });
  }
}

export const userSubmittedIdeaEvent = (roomName) => {
  return (dispatch) => {
    database.ref(`rooms/${roomName}/ideas`).on('child_added', (snap) => {
      dispatch(getRoom(roomName))
    });
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
