import React from 'react';
import { Container, StyleSheet, View, Text } from 'react-native';


export class IdeaCard extends React.Component {
  render() {

    if (this.props.ideas && typeof this.props.ideas[this.props.ideas.length - 1] === "string") {
      return <View style={styles.card}>
        {this.props.ideas.map((idea, i) => {
          if (idea !== "") {
            return (
              <View key={i} style={styles.idea}>
                <Text>{idea}</Text>
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
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  idea: {
    width: 50,
    height: 50,
    backgroundColor: 'powderblue'
  }
})

