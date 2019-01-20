import React from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  KeyboardAvoidingView
} from 'react-native';

import { createRoom, joinRoom } from '../redux/reducers/rooms/actions'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Undecided!',
  };
  constructor(props) {
    super(props)
    this.state = {
      createRoomName: "",
      joinRoomName: '',
      newRoomPurpose: '',
      newRoomUserName: '',
      joinRoomUserName: '',
      createError: "",
      joinError: "",
      yesCreateError: false
    }
    this.handleCreateRoom = this.handleCreateRoom.bind(this)
    this.validateCreateRoom = this.validateCreateRoom.bind(this)
    this.showCreateError = this.showCreateError.bind(this)
    this.showJoinError = this.showJoinError.bind(this)
  }

  handleCreateRoom() {
    const { navigate } = this.props.navigation;
    navigate('Room',
      { roomName: this.state.joinRoomName, user: this.state.joinRoomUserName }
    )
  }


  async validateCreateRoom() {
    const newRoom = {
      name: this.state.createRoomName,
      prompt: this.state.newRoomPurpose,
      owner: this.state.newRoomUserName
    }
    await this.props.createNewRoom(newRoom, this.showCreateError)

    // if (this.state.createError === 'Room name not available!') {
    // this.setState({
    //   createError: ""
    // })
    console.log('lala')
    // } else if (this.state.createError === "") {
    //   this.handleCreateRoom()
    // }
    // console.log("this.state.createError", this.state.createError)

    // if (this.state.createError === "") {
    //   this.handleCreateRoom()
    // } else {
    //   this.setState({
    //     createError: "",
    //     createRoomName: ""
    //   })
    // }
    // }
  }

  showCreateError = (createError) => {
    this.setState({
      createError
    });
  }

  showJoinError = (joinError) => {
    this.setState({
      joinError
    });
  }


  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ScrollView>
          {/* create room button */}
          <View style={styles.sectionContainer}>
            <View>
              <Text style={styles.homePageHeaders}>Create a New Room</Text>
            </View>
            <View>
              <TextInput
                style={styles.homePageInputs}
                onChangeText={(text) => this.setState({ createRoomName: text })}
                value={this.state.createRoomName}
                placeholder="Enter New Room Name"
              />
              <Text style={styles.errorText}>{this.state.createError}</Text>
              <TextInput
                style={styles.homePageInputs}
                onChangeText={(text) => this.setState({ newRoomPurpose: text })}
                value={this.state.newRoomPurpose}
                placeholder="What is the purpose of this room?"
              />
              <TextInput
                style={styles.homePageInputs}
                onChangeText={(text) => this.setState({ newRoomUserName: text })}
                value={this.state.newRoomUserName}
                placeholder="What is your name?"
              />
            </View>
            <View style={styles.homePageButtons}>
              <Button
                onPress={this.validateCreateRoom}
                title="Create Room"
                accessibilityLabel="Create Room"
                color="white"
                style={styles.homePageButtons}
              />
            </View>
          </View>

          {/* end of create room button */}

          {/* join room input & button */}
          <View style={styles.sectionContainer}>
            <View>
              <Text style={styles.homePageHeaders}>Enter Existing Room</Text>
            </View>
            <View>
              <TextInput
                style={styles.homePageInputs}
                onChangeText={(text) => this.setState({ joinRoomName: text })}
                value={this.state.joinRoomName}
                placeholder="Input name of existing room"
              />
              <TextInput
                style={styles.homePageInputs}
                onChangeText={(text) => this.setState({ joinRoomUserName: text })}
                value={this.state.joinRoomUserName}
                placeholder="What is your name?"
              />

            </View>

            <View style={styles.homePageButtons}>
              <Button
                onPress={this.validateCreateRoom}
                title="Join Room"
                accessibilityLabel="Join Room"
                color="white"
              />
            </View>
          </View>


          {/* end of join room input & button */}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

}

const mapDispatchToProps = (dispatch) => ({
  createNewRoom: (room, error) => dispatch(createRoom(room, error)),
  joinRoom: (data) => dispatch(joinRoom(data, showJoinError))
})


export default connect(null, mapDispatchToProps)(HomeScreen)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  homePageButtons: {
    backgroundColor: '#d9f441',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    margin: 10
  },
  homePageButtonText: {
    color: 'white'
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  homePageHeaders: {
    textAlign: 'center',
    fontSize: 25,
    padding: 10,
    fontFamily: 'ubuntu'
  },
  homePageInputs: {
    margin: 5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  errorText: {
    color: 'red'
  }
});

