import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PacmanIndicator } from 'react-native-indicators';
import { Button } from 'react-native-elements';

export default class IdeaChosen extends Component {
  constructor() {
    super()
    this.state = {
      animating: true,
      open: false
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
          <View style={styles.winner}>
            <Text style={styles.winnerText}>The decision is: </Text>
            <Text style={styles.winnerText}>{decision}!</Text>
            <Text style={styles.winnerText}>{decisionUser} made this decision.</Text>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  winner: {
    backgroundColor: '#a2ba1a',
    height: 400,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  winnerText: {
    color: 'white',
    fontSize: 30,
    margin: 10
  },
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

