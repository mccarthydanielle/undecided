import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import { IdeaCard } from '../components/IdeaCard'



export default class NoDecision extends React.Component {
  render() {
    const { ideas, user, owner, submittedIdea, submitError } = this.props
    return (
      <View >
        {/* list of ideas */}
        <View>
          {ideas.length ?
            <View style={{
              borderRadius: 4,
              borderWidth: 0.5,
              borderColor: '#d6d7da',
            }}>
              <Text style={styles.homePageHeaders}>Submitted Ideas</Text>
              <IdeaCard ideas={ideas} />
            </View>
            :
            <Text style={styles.homePageHeaders}>No ideas have been submitted.</Text>
          }
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
            <Text style={styles.error}>{submitError}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={this.props.handleIdeaSubmit}
            >
              <Text> Submit Idea. </Text>
            </TouchableOpacity>
          </View> :
          // showing what the users idea is after submission
          <View style={styles.border}>
            <Text style={styles.roomScreenText}>Your idea was: {this.props.room.peopleAndIdeas[user]}</Text>
          </View>
        }

        {/* checking if the user is the owner - deciding whether to show picker button */}
        <View style={{ alignItems: 'center' }}>
          {user === owner && ideas.length >= 2 ?
            <View style={styles.container}>

              <Button primary
                onPress={this.props.handleDeciding}
              >
                <Text style={styles.decideButtonText}>Decide!</Text>
              </Button>

            </View> :
            null}
        </View>
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
  border: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    margin: 10
  },
  decideButtonText: {
    color: 'white',
    margin: 5
  },
  container: {
    paddingHorizontal: 10,
    margin: 10,

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
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 40,
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
  },
  error: {
    color: 'red',
    margin: 5
  }

});
