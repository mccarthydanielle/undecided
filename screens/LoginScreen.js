import React from 'react';
import { connect } from 'react-redux';
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Button,
  TextInput,
  Text
} from 'react-native';
// import { startLogin } from '../actions/auth';

class LoginPage extends React.Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
    this.practiceButtonClick = this.practiceButtonClick.bind(this)
  }

  practiceButtonClick() {
    console.log("I'm pressing the button!")
  }

  render() {
    return (
      <ScrollView>
        <Text h1>Undecided</Text>
        <Text h4>Let us make the decision for you.</Text>
        <Text h4>What is your name?</Text>
        <View>
          <Button
            title="Sign in with Google"
            onPress={this.practiceButtonClick}
            accessibilityLabel="Sign in with Google"
          />
        </View>

      </ScrollView>
    )
  }
};

// const mapDispatchToProps = (dispatch) => ({
//   startLogin: () => dispatch(startLogin())
// });

// export default connect(undefined, mapDispatchToProps)(LoginPage);
export default LoginPage
