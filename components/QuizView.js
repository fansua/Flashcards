import React, { Component } from 'react'
import { StyleSheet,View, Text, TouchableNativeFeedback, Animated } from 'react-native'
import { red,white} from '../utils/colors'
import {setLocalNotification, clearLocalNotification} from '../utils/helpers'
import { connect } from 'react-redux'


class QuizView extends Component {

  state = {
          deck: this.props.decks[this.props.navigation.state.params.deckTitle],
          deckTitle: this.props.navigation.state.params.deckTitle,
          questionIndex: 0,
          isQuestion: true,
          question: '',
          answer: '',
          questionTotal: 0,
          correctTotal: 0,
          viewScore: false
      }

  componentWillMount() {
          this.animatedValue = new Animated.Value(0);
          this.value = 0;
          this.animatedValue.addListener(({ value }) => {
              this.value = value;
          })
          this.frontInterpolate = this.animatedValue.interpolate({
              inputRange: [0, 180],
              outputRange: ['0deg', '180deg'],
          })
          this.backInterpolate = this.animatedValue.interpolate({
              inputRange: [0, 180],
              outputRange: ['180deg', '360deg']
          })
      }

  componentDidMount() {
       const { deck } = this.state
       if (typeof deck !== undefined && deck.questions !== undefined && deck.questions.length) {
           let questionObject = deck.questions[this.state.questionIndex]
           const { question, answer } = questionObject
           this.setState({question,answer, questionTotal: deck.questions.length,
               questionIndex: 0,isQuestion: true,scoreCorrect: 0, scoreView: false})
       }
   }


  toggleQuestionAnswer() {
        if (this.value >= 90) {
            this.setState({
                isQuestion: true
            })
            Animated.spring(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
        } else {
            this.setState({
                isQuestion: false
            })
            Animated.spring(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
        }
    }

scoreQuestion(isCorrect) {
        const { deck } = this.state
        let questionIndex = this.state.questionIndex + 1
        let score = this.state.scoreCorrect
        if (isCorrect) {
            score += 1;
        }
        this.setState({ scoreCorrect: score })

        if (questionIndex < deck.questions.length) {
            let questionObject = deck.questions[questionIndex]
            const { question, answer } = questionObject

            if (this.value >= 90) { //reset flip
                Animated.spring(this.animatedValue, {
                    toValue: 0,
                    friction: 8,
                    tension: 10
                }).start();
            }
            this.setState({ question, answer, questionIndex, isQuestion: true })
        }
        else {
            this.setState({ question: '',answer: '', questionIndex: 0,isQuestion: true,scoreView: true })
            clearLocalNotification().then(setLocalNotification)
        }
    }

    restartQuiz() {
        const { deck } = this.state
        if (typeof deck !== undefined && deck.questions !== undefined && deck.questions.length) {
            let questionObject = deck.questions[0]
            const { question, answer } = questionObject
            this.setState({question,answer,questionIndex: 0,isQuestion: true,scoreCorrect: 0,scoreView: false
            })}
    }

    goBackToDeck() {
        this.setState({question: '',answer: '',questionIndex: 0,isQuestion: true,scoreCorrect: 0,scoreView: false
        })
        this.props.navigation.goBack();
    }





  render() {
      const  deckTitle  = this.props.navigation.state.params.deckTitle
       const deck = this.props.decks[deckTitle]
      const { question, answer, questionTotal} =  this.state

      const frontAnimatedStyle = {
            transform: [{ rotateY: this.frontInterpolate }]
        }
        const backAnimatedStyle = {
            transform: [{ rotateY: this.backInterpolate }]
        }

        const score = this.state.scoreCorrect
        let scoreLabel = `You got ${score} of ${questionTotal} questions correct`
        if(score < 0){
            const correctedScore = questionTotal + score
            scoreLabel = `You got ${correctedScore} of ${questionTotal} questions correct`
        }

    return (
      <View style={styles.container}>
              {this.state.scoreView && (
                  <View>
                      <Text style={styles.title}>Quiz Complete</Text>
                      <Text style={styles.title}>{scoreLabel}</Text>
                      <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                          <TouchableNativeFeedback onPress={() => this.restartQuiz()}>
                            <View style={[styles.btn, styles.invertedBtn]}>
                              <Text style={styles.btnText}>Start Again</Text>
                            </View>
                          </TouchableNativeFeedback>
                          <TouchableNativeFeedback onPress={() => this.goBackToDeck()}>
                            <View>
                              <Text style={styles.btnText}>Go to deck</Text>
                            </View>
                          </TouchableNativeFeedback>
                      </View>
                  </View>
              )}
              {!this.state.scoreView && (
                  <View>
                      <Text>{`${this.state.questionIndex + 1} of ${this.state.questionTotal}`}</Text>
                      <View>
                          <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                              <Text style={styles.title}>{question}</Text>
                          </Animated.View>
                          <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                              <Text style={styles.title}>{answer}</Text>
                          </Animated.View>
                      </View>
                      <TouchableNativeFeedback onPress={() => this.toggleQuestionAnswer()}>
                        <View style={[styles.btn, styles.invertedBtn]}>
                          {this.state.isQuestion && (
                              <Text style={styles.btnText}>Show Answer</Text>
                          )}
                          {!this.state.isQuestion && (
                              <Text style={styles.btnText}>Show Question</Text>
                          )}
                        </View>
                      </TouchableNativeFeedback>
                      <View >
                          <TouchableNativeFeedback onPress={() => this.scoreQuestion(true)}>
                            <View style={[styles.btn, styles.invertedBtn]}>
                              <Text style={styles.btnText}>Correct</Text>
                            </View>
                          </TouchableNativeFeedback>
                          <TouchableNativeFeedback onPress={() => this.scoreQuestion(false)}>
                            <View style={[styles.btn, styles.invertedBtn]}>
                              <Text style={styles.btnText}>Incorrect</Text>
                            </View>
                          </TouchableNativeFeedback>
                      </View>
                  </View>
              )}
          </View>
      );

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
   fontSize:20
 },
 number: {
   color: 'rgba(0,0,0,0.54)'
 },
 btn: {
   padding: 80,
   paddingTop: 20,
   paddingBottom: 20,
   marginTop: 16,
   borderRadius: 2,
   borderWidth: 60
 },
 invertedBtn: {
   borderColor: red
 },
 btnText: {
   fontSize: 8
 }
})

function mapStateToProps(decks){
  return{decks}
}

export default connect(mapStateToProps,null) (QuizView)
