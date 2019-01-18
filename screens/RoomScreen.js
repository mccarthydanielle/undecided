import React from 'react';
import { connect } from 'react-redux';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';

import { submitIdea, getRoom } from '../redux/reducers/rooms/actions'
class RoomScreen extends React.Component {
  static navigationOptions = {
    title: 'Undecided!'
  };
  constructor(props) {
    super(props)
    this.state = {
      owner: false,
      submittedIdea: false,
      ideas: {},
      prompt: '',
      userIdea: '',
      roomName: '',
      ownerName: '',
      people: {},
    }
    this.handleIdeaSubmit = this.handleIdeaSubmit.bind(this)
  }

  handleIdeaSubmit() {
    const { user, roomName } = this.props.navigation.state.params
    this.setState({ submittedIdea: true })
    this.props.submitIdea(user, this.state.userIdea, roomName)
  }

  async componentDidMount() {
    const { roomName } = this.props.navigation.state.params
    this.props.getRoom(roomName)
    console.log('component mounted', this.props)
    // this.setState({
    //   roomName: this.props.room.name,
    //   ownerName: this.props.room.owner,
    //   people: this.props.room.people,

    // })
  }

  render() {
    console.log('rerendering', this.state)
    return (
      <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View>
            <Text>Room name: roomname</Text>
          </View>
          <View>
            <Text>This room was created by: ownername</Text>
          </View>
          <View>
            <Text>What are we deciding? prompt</Text>
          </View>

          {/* checking whether or not the user has submitted an idea and altering the view */}

          {!this.state.submittedIdea ?

            <View style={styles.container}>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(text) => this.setState({ userIdea: text })}
                value={this.state.createRoomName}
                placeholder="Enter your idea."
              />
              <TouchableOpacity
                style={styles.button}
                onPress={this.handleIdeaSubmit}
              >
                <Text> Submit Idea. </Text>
              </TouchableOpacity>
            </View> :
            <View>
              <Text>Your idea was: {this.props.userIdea}</Text>
            </View>
          }

          <View style={styles.getStartedContainer}>
            <Text>IDEAS</Text>
          </View>

          <View>
            <Text style={styles.getStartedText}>USERS</Text>
          </View>

        </ScrollView>
      </View >
    );
  }
}

const mapStateToProps = state => ({
  room: state.room
})

const mapDispatchToProps = (dispatch) => ({
  getRoom: (roomName) => dispatch(getRoom(roomName)),
  submitIdea: (user, idea, roomName) => dispatch(submitIdea(user, idea, roomName))
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomScreen)


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  }
});
