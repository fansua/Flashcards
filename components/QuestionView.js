import React, { Component } from 'react'
import {StyleSheet, View, Text,TouchableNativeFeedback,TextInput,KeyboardAvoidingView} from 'react-native'
import { connect } from 'react-redux'
import * as api from '../utils/FlashcardsAPI'
import {addCard} from '../actions'
import { red } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

class QuestionView extends Component {

  state = {
      question: '',
      answer: ''
    }

    handleQuestionChange = input => {
      this.setState(() => ({
        question: input
      }))
    }

    handleAnswerChange = input => {
      this.setState(() => ({
        answer: input
      }))
    }

    handleSubmit = () => {
      const { deckTitle } = this.props.navigation.state.params

      if (this.state.question !== '' || this.state.answer !== '') {
        const card = {question:this.state.question, answer:this.state.answer}
        api.addCardToDeck(deckTitle,card)
         this.props.uploadCardToStore(deckTitle,card)

      }
this.routeToNewDeck()
    }

    routeToNewDeck = () => {

      const resetAction = NavigationActions.navigate({
            routeName: 'decks',
            action:NavigationActions.navigate({ routeName: 'newDeck'}),
        })
        this.props.navigation.dispatch(resetAction)
    }

  render() {

    return (
      <KeyboardAvoidingView behavior='padding'  style={styles.container}>
        <Text style={styles.title}>Add a new card!</Text>
        <TextInput
          style={styles.userInput}
          placeholder='Enter Question'
          onChangeText={this.handleQuestionChange}/>
        <TextInput
          style={styles.userInput}
          placeholder='Enter Answer'
          onChangeText={this.handleAnswerChange}/>
        <TouchableNativeFeedback onPress={this.handleSubmit}>
          <View style={[styles.button, styles.invertButton]}>
            <Text>Add to Deck</Text>
          </View>
        </TouchableNativeFeedback>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24
  },
  userInput: {
    width: 200,
    height: 44,
    padding: 8,
    margin: 50
  },
  button: {
    padding: 120,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 16,
    borderRadius: 2,
    borderWidth: 40
  },
  invertButton: {
    borderColor: red
  }
})

function mapStateToProps(decks){
  return{decks}
}

function mapDispatchToProps (dispatch) {
  return {
    uploadCardToStore: (title,card) => dispatch(addCard(title,card)),

  }
}
export default connect(mapStateToProps,mapDispatchToProps) (QuestionView)
