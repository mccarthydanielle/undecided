import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  Text,
  Button
} from 'react-native';

import { createRoom } from '../redux/reducers/rooms/actions'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Undecided!',
  };
  constructor(props) {
    super(props)
    this.state = {
      createRoomName: '',
      joinRoomName: '',
      newRoomPurpose: '',
      newRoomUserName: '',
      joinRoomUserName: ''
    }
    this.testFunc = this.testFunc.bind(this)
    this.handleCreateRoom = this.handleCreateRoom.bind(this)
  }

  testFunc() {
    console.log('heyyy')
  }

  handleCreateRoom() {
    this.props.createNewRoom({
      name: this.state.createRoomName,
      prompt: this.state.newRoomPurpose,
      owner: this.state.newRoomUserName
    })

    this.props.navigation.navigate('ChatScreen')
  }

  handleJoinRoom() {

  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
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
                // onPress={this.handleCreateRoom}
                onPress={() => navigate('Rooms')}
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
                onPress={this.testFunc}
                title="Join Room"
                accessibilityLabel="Join Room"
                // need to change this onPress to join room
                // onPress={this.props.createNewRoom({ name: roomName })}
                color="white"
              />
            </View>
          </View>

          {/* end of join room input & button */}
        </ScrollView>
      </View>
    );
  }

}

const mapDispatchToProps = (dispatch) => ({
  createNewRoom: (room) => dispatch(createRoom(room))
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
  }
});

