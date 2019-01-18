import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { HeaderBackButton } from 'react-navigation';
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


export default class RoomScreen extends React.Component {
  static navigationOptions = {
    title: 'Undecided!'
  };
  constructor(props) {
    super(props)
    this.state = {
      owner: false,
      submittedIdea: false,
      allUsers: {},
      ideas: {},
      prompt: '',
      userIdea: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.contentContainer}>

          <View>
            <Text>This room was created by OWNER NAME</Text>
          </View>
          <View>
            <Text>This is the prompt</Text>
          </View>
          <View style={styles.container}>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={(text) => this.setState({ userIdea: text })}
              value={this.state.createRoomName}
              placeholder="Enter your idea."
            />
            <TouchableOpacity
              style={styles.button}
              onPress={this.onPress}
            >
              <Text> Submit Idea. </Text>
            </TouchableOpacity>
          </View>
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
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
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
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
