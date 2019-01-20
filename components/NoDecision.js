import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { IdeaCard } from '../components/IdeaCard'


export default class NoDecision extends React.Component {
  render() {
    const { ideas, user, owner, submittedIdea } = this.props
    return (
      <View>
        {/* list of ideas */}
        <View style={styles.getStartedContainer}>
          <Text style={styles.homePageHeaders}>Submitted Ideas.</Text>
          {ideas ?
            <IdeaCard ideas={ideas} />
            : null}
        </View>

        {/* checking whether or not the user has submitted an idea and altering the view */}

        {!submittedIdea ?
          // showing submission input
          <View style={styles.container}>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={(text) => this.props.handleInputChange(text)}
              value={this.props.submissionInput}
              placeholder="Enter your idea."
            />
            <TouchableOpacity
              style={styles.button}
              onPress={this.props.handleIdeaSubmit}
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
              onPress={this.props.handleDeciding}
              title="Decide!"
              accessibilityLabel="Decide"
            />
          </View> :
          null}
      </View>
    )
  }
}



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
