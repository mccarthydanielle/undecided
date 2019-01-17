import * as firebase from 'firebase';
import { config } from '../secrets'

firebase.initializeApp(config)

const database = firebase.database();

export { firebase, database }
