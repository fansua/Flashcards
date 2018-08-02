import React, { Component } from 'react'
import { StyleSheet,View, Text,KeyboardAvoidingView,TextInput,TouchableNativeFeedback} from 'react-native'
import * as api from '../utils/FlashcardsAPI'
import { connect } from 'react-redux'
import {addDeck} from '../actions'
import {saveDeckTitle} from '../utils/FlashcardsAPI'
import { NavigationActions } from 'react-navigation'
import { red, gray } from '../utils/colors'

class NewDeck extends Component {

  state = {
      title: ''
    }

    handleTextChange = title => {
      this.setState(() => ({title}))
    }

    handleSubmit = () => {
      if (this.state.title !== '') {
        const deckTitle = this.state.title
        this.props.uploadDeckTitleToStore(deckTitle)
        saveDeckTitle(deckTitle)
  }

      this.routeToNewDeck(this.state.title)
    }

    routeToNewDeck = (deckName) => {
      this.setState({title: ""})

      const resetAction = NavigationActions.navigate({
            routeName: 'DeckView',
            params: { deckTitle: deckName },
            action:NavigationActions.navigate({ routeName: 'DeckView'}),
        })
        this.props.navigation.dispatch(resetAction)
    }

  render() {
  const { title } = this.state
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container} >
          <Text style={styles.title} >What is the title of your new deck?</Text>
          <TextInput
            style={styles.userInput}
            underlineColorAndroid={'red'}
            value={title}
            placeholder="Deck Title"
            onChangeText={this.handleTextChange} />
          <TouchableNativeFeedback onPress={() => this.handleSubmit()}>
            <View style={[styles.button, styles.invertButton]}>
              <Text>Submit</Text>
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
    width: 375,
    height: 44,
    padding: 8,
    margin: 50
  },
  button: {
    padding: 80,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 16,
    borderRadius: 2,
    borderWidth: 2
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
    uploadDeckTitleToStore: (title) => dispatch(addDeck(title))
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (NewDeck)
