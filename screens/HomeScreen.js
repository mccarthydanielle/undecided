import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Button,
  TextInput
} from 'react-native';

import { createRoom } from '../redux/reducers/rooms/actions'

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      createRoomName: '',
      joinRoomName: '',
      newRoomPurpose: ''
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
      prompt: this.state.newRoomPurpose
    })

    this.props.navigation.navigate('ChatScreen')
  }

  handleJoinRoom() {

  }

  render() {
    return (
      <View style={styles.container}>
        {/* create room button */}
        <View>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(text) => this.setState({ createRoomName: text })}
            value={this.state.roomInput}
            placeholder="Enter New Room Name"
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(text) => this.setState({ newRoomPurpose: text })}
            value={this.state.roomInput}
            placeholder="What is the purpose of this room?"
          />
        </View>
        <View style={styles.homePageButtons}>
          <Button
            onPress={this.handleCreateRoom}
            title="Create Room"
            accessibilityLabel="Create Room"
          />
        </View>

        {/* end of create room button */}

        {/* join room input & button */}

        <View>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(text) => this.setState({ joinRoomName: text })}
            value={this.state.roomInput}
            placeholder="Input name of existing room"
          />

        </View>

        <View style={styles.homePageButtons}>
          <Button
            title="Join Room"
            accessibilityLabel="Join Room"
            // need to change this onPress to join room
            // onPress={this.props.createNewRoom({ name: roomName })}
            onPress={this.testFunc}
          />
        </View>

        {/* end of join room input & button */}

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
    backgroundColor: '#fff'
  },

  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  homePageButtons: {
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
