import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
export class IdeaCard extends React.Component {
  render() {

    if (this.props.ideas && typeof this.props.ideas[this.props.ideas.length - 1] === "string") {
      return <View style={styles.card}>
        {this.props.ideas.map((idea, i) => {
          if (idea !== "") {
            return (
              <View key={i} style={styles.idea}>
                <Text style={styles.ideaText}>{idea}</Text>
              </View>
            )
          }
        }
        )}
      </View>
    } else {
      return <View>
      </View>
    }
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  idea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#d6d7da',
    borderRadius: 4,
    borderWidth: 0.5,
    margin: 5,
    width: '30%',
    height: 50,
    backgroundColor: 'rgba(162, 186, 26, 0.4)'
  },
  ideaText: {
    margin: 3,
    flex: 1,
    textAlign: 'center',
    color: 'white'
  }
})

