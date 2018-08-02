import React from 'react';
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import DeckView from './components/DeckView'
import QuizView from './components/QuizView'
import QuestionView from './components/QuestionView'
import { Constants } from 'expo'
import { red, white } from './utils/colors'
import {createStore} from 'redux'
import { Provider } from 'react-redux'
import { setLocalNotification } from './utils/helpers'
import reducer from './reducers'


const store = createStore(reducer)


function FlashcardsStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createMaterialTopTabNavigator({

    decks: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks'
      }
    },
    newDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck'
      }
    }
  })

 const AppHome = createStackNavigator({
  Home: { screen:Tabs },
  DeckView: {
    screen: DeckView
   },
  QuizView: {
    screen: QuizView,
    navigationOptions:{
      title: 'Quiz'
    }
   },
  QuestionView: {
     screen: QuestionView,
    navigationOptions:{
      title:'Add Card'
    }
    }
})


export default class App extends React.Component {
  componentDidMount(){
    setLocalNotification()
    //ToDO: <FlashcardsStatusBar backgroundColor={red} barStyle= 'light-content' />
  }
  render() {
    return (
       <Provider store={store}>
        <AppHome />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
