import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PacmanIndicator } from 'react-native-indicators';
import { decisionMade } from '../redux/reducers/rooms/actions';

export default class IdeaChosen extends Component {
  constructor() {
    super()
    this.state = {
      animating: true
    }
    this.closeActivityIndicator = this.closeActivityIndicator.bind(this)
  }
  componentDidMount() {
    this.closeActivityIndicator()
  }

  closeActivityIndicator() {
    return setTimeout(() => {
      this.setState({ animating: false })
    }, 3000)
  }

  render() {
    const animating = this.state.animating
    const { decision, decisionUser } = this.props
    return (
      <View>
        {animating ?
          <View style={styles.container}>
            <Text style={styles.decidingText}>Deciding...</Text>
            <PacmanIndicator
              animating={animating}
            />
          </View>
          :
          <Text>The deccision is ... {decision}. {decisionUser} made this decision! </Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  decidingText: {
    textAlign: 'center',
    fontSize: 25,
    padding: 5,
    fontFamily: 'cabin-bold'
  }
})

