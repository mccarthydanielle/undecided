import React from 'react';
import { Container, StyleSheet, View, Text } from 'react-native';


export class IdeaCard extends React.Component {
  render() {
    return <View style={styles.card}>
      {Object.values(this.props.ideas).map((idea, i) => {
        if (idea !== "") {
          return (
            <View style={styles.idea} key={i}>
              <Text>{idea}</Text>
            </View>)
        }
      }
      )}
    </View>
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

