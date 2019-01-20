import React from 'react';
import { avatars } from '../assets/avatars/roomScreenAvatars'
import { IdeaCard } from '../components/IdeaCard'
import { connect } from 'react-redux';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Button

} from 'react-native';
import { ListItem, List, Avatar } from 'react-native-elements'

import { submitIdea, getRoom, userJoinedRoomEvent, userSubmittedIdeaEvent } from '../redux/reducers/rooms/actions'
class RoomScreen extends React.Component {
  static navigationOptions = {
    title: 'Undecided!'
  };
  constructor(props) {
    super(props)
    this.state = {
      submittedIdea: false,
      userIdea: ''
    }
    this.handleIdeaSubmit = this.handleIdeaSubmit.bind(this)
    this.handleDeciding = this.handleDeciding.bind(this)
  }

  async componentDidMount() {
    const { roomName } = this.props.navigation.state.params
    await this.props.getRoom(roomName)
    this.props.listenForUsers(roomName)
    this.props.listenForIdeas(roomName)

  }

  handleIdeaSubmit() {
    const { user, roomName } = this.props.navigation.state.params
    this.setState({ submittedIdea: true })
    this.props.submitIdea(user, this.state.userIdea, roomName)
  }

  handleDeciding() {
    console.log('Im deciding!')
  }

  render() {
    const { users, ideas } = this.props
    const { owner } = this.props.room
    const { user } = this.props.navigation.state.params
    return (
      <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View >
            <View>
              <Text>
                <Text style={styles.roomScreenWelcomeText}>Welcome to the </Text>
                <Text style={styles.roomScreenWelcomeSpecialText}>{this.props.room.name}</Text>
                <Text style={styles.roomScreenWelcomeText}> room!</Text>
              </Text>
            </View>
            <View>
              <Text>
                <Text style={styles.roomScreenText}>This room was created by</Text>
                <Text style={styles.roomScreenSpecialText}> {this.props.room.owner}</Text>
              </Text>
            </View>
            <View>
              <Text style={styles.roomScreenPromptText}>{this.props.room.prompt}</Text>
            </View>
          </View>

          {/* list of ideas */}
          <View style={styles.getStartedContainer}>
            <Text style={styles.homePageHeaders}>Submitted Ideas.</Text>
            {ideas ?
              <IdeaCard ideas={ideas} />
              : null}
          </View>

          {/* checking whether or not the user has submitted an idea and altering the view */}

          {!this.state.submittedIdea ?
            // showing submission input
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
            // showing what the users idea is after submission
            <View>
              <Text>Your idea was: {this.props.room.peopleAndIdeas[user]}</Text>
            </View>
          }

          {/* checking if the user is the owner - deciding whether to show picker button */}
          {user === owner ?
            <View>
              <Button
                onPress={this.handleDeciding}
                title="Decide!"
                accessibilityLabel="Decide"
              />
            </View> :
            null}

          {/* list of users */}

          <View style={styles.container}>
            <Text style={styles.homePageHeaders}>Who else is in the room?</Text>
          </View>

          <List style={styles.userListStyle}>
            {users ? users.map((user, i) => {
              let avatar = avatars[i]
              return (
                <ListItem
                  hideChevron={true}
                  key={i}
                  title={user}
                  avatar={
                    <Avatar
                      rounded
                      icon={{ name: avatar, type: 'font-awesome' }}
                    />
                  }
                />
              );
            }) : null
            }
          </List>
        </ScrollView>
      </View >
    );
  }
}

const mapStateToProps = state => ({
  room: state.room.room,
  users: state.room.users,
  ideas: state.room.ideas,
  decision: state.room.decision
})

const mapDispatchToProps = (dispatch) => ({
  getRoom: (roomName) => dispatch(getRoom(roomName)),
  submitIdea: (user, idea, roomName) => dispatch(submitIdea(user, idea, roomName)),
  listenForUsers: (roomName) => dispatch(userJoinedRoomEvent(roomName)),
  listenForIdeas: (roomName) => dispatch(userSubmittedIdeaEvent(roomName))
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
    paddingHorizontal: 10,
    margin: 10
  },
  homePageHeaders: {
    textAlign: 'center',
    fontSize: 15,
    padding: 5,
    fontFamily: 'ubuntu'
  },
  userListStyle: {
    height: 40,
    margin: 10
  },
  roomScreenWelcomeText: {
    textAlign: 'center',
    fontSize: 25,
    padding: 5,
    fontFamily: 'ubuntu',

  },
  roomScreenWelcomeSpecialText: {
    textAlign: 'center',
    fontSize: 25,
    padding: 5,
    color: '#a2ba1a',
    fontFamily: 'cabin-bold'
  },
  roomScreenText: {
    textAlign: 'center',
    fontSize: 16,
    padding: 5,
  },
  roomScreenSpecialText: {
    textAlign: 'center',
    fontSize: 16,
    padding: 5,
    color: '#a2ba1a',
    fontFamily: 'cabin-reg'
  },
  roomScreenPromptText: {
    textAlign: 'center',
    fontSize: 20,
    padding: 5,
    margin: 10,
    color: '#a2ba1a',
    fontFamily: 'cabin-reg'
  }

});
