import React, { Component } from 'react'
import { StyleSheet, View, Text,TouchableNativeFeedback} from 'react-native'
import { connect } from 'react-redux'
import { red } from '../utils/colors'

class DeckView extends Component {

  static navigationOptions = ({navigation}) => {
    const {deckTitle} = navigation.state.params
    return {title: deckTitle}
  }

  navigateAddCard = ( deckTitle) => {
    this.props.navigation.navigate("QuestionView", {deckTitle})
  }

  navigatesStartQuiz = (deckTitle) => {
    this.props.navigation.navigate("QuizView", {deckTitle})
  }

  render() {
    const {deckTitle} = this.props.navigation.state.params
    const deck = this.props.decks[deckTitle]
    const {decks} = this.props


    return (
      <View style={styles.container}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text>{`${deck.questions.length} Cards`}</Text>
          <TouchableNativeFeedback onPress={() => this.navigateAddCard(deck.title)}>
            <View  style={[styles.button, styles.invertButton]}>
              <Text style={styles.buttonTex}>Add Card</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={ () => this.navigatesStartQuiz(deck.title)}>
            <View style={[styles.button, styles.invertButton]}>
              <Text style={styles.buttonTex}>Start Quiz</Text>
            </View>
          </TouchableNativeFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'#fff'
  },
  title:{
    fontSize:32
  },
  button:{
    padding:40,
    paddingTop:5,
    paddingBottom:10,
    borderRadius:4,
    borderWidth:2,
    marginTop:24
  },
  buttonTex:{
    fontSize:20
  },
  invertButton:{
    borderColor:red
  }
})

function mapStateToProps(decks){
  return{decks}
}

export default connect(mapStateToProps,null) (DeckView)
