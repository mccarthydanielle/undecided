import React from 'react';
import { avatars } from '../assets/avatars/roomScreenAvatars'
import NoDecision from '../components/NoDecision'
import IdeaChosen from '../components/IdeaChosen'
import { connect } from 'react-redux';
import {
  ScrollView,
  Text,
  View,
  StyleSheet
} from 'react-native';
import { ListItem, List, Avatar, Divider } from 'react-native-elements'

import { submitIdea, getRoom, userJoinedRoomEvent, userSubmittedIdeaEvent, makeDecision, ownerMakingDecision } from '../redux/reducers/rooms/actions'
class RoomScreen extends React.Component {
  static navigationOptions = {
    title: 'Undecided!'
  };
  constructor(props) {
    super(props)
    this.state = {
      submittedIdea: false,
      userIdea: '',
      submitError: ''
    }
    this.handleIdeaSubmit = this.handleIdeaSubmit.bind(this)
    this.handleDeciding = this.handleDeciding.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  async componentDidMount() {
    const { roomName } = this.props.navigation.state.params
    await this.props.getRoom(roomName)
    this.props.listenForUsers(roomName)
    this.props.listenForIdeas(roomName)
    this.props.listenForDecision(roomName)

  }

  handleInputChange(text) {
    this.setState({ userIdea: text, submitError: "" })
  }

  handleIdeaSubmit() {
    if (this.state.userIdea.length === 0) {
      this.setState({
        submitError: 'Please enter valid idea!'
      })
    } else {
      const { user, roomName } = this.props.navigation.state.params
      this.setState({ submittedIdea: true })
      this.props.submitIdea(user, this.state.userIdea, roomName)
    }
  }

  handleDeciding() {
    const { roomName } = this.props.navigation.state.params
    this.props.makeDecision(roomName)
  }

  render() {
    const { users, ideas, decision, peopleAndIdeas } = this.props
    const { owner } = this.props.room
    const { user } = this.props.navigation.state.params
    let decisionUser = "";

    if (decision.length > 0) {
      Object.keys(peopleAndIdeas).some((key) => peopleAndIdeas[key] === decision ? decisionUser = key : null)
    }

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
          <Divider />
          {/* has the decision been made? */}

          {this.props.decision.length === 0 ?
            <NoDecision
              ideas={ideas}
              room={this.props.room}
              user={user}
              owner={owner}
              submittedIdea={this.state.submittedIdea}
              submissionInput={this.state.userIdea}
              handleInputChange={this.handleInputChange}
              handleIdeaSubmit={this.handleIdeaSubmit}
              handleDeciding={this.handleDeciding}
              submitError={this.state.submitError}
            />
            : <IdeaChosen decision={this.props.decision} decisionUser={decisionUser} />
          }

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
  decision: state.room.decision,
  peopleAndIdeas: state.room.peopleAndIdeas
})

const mapDispatchToProps = (dispatch) => ({
  getRoom: (roomName) => dispatch(getRoom(roomName)),
  submitIdea: (user, idea, roomName) => dispatch(submitIdea(user, idea, roomName)),
  listenForUsers: (roomName) => dispatch(userJoinedRoomEvent(roomName)),
  listenForIdeas: (roomName) => dispatch(userSubmittedIdeaEvent(roomName)),
  makeDecision: (roomName) => dispatch(makeDecision(roomName)),
  listenForDecision: (roomName) => dispatch(ownerMakingDecision(roomName))
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomScreen)


const styles = StyleSheet.create({
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
    margin: 5
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
