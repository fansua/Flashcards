import React, { Component } from 'react'
import { StyleSheet,View,Text,FlatList,TouchableNativeFeedback} from 'react-native'
import { connect } from 'react-redux'
import * as api from '../utils/FlashcardsAPI'
import {getDecks} from '../actions'
import { red, white } from '../utils/colors'

class DeckList extends Component {


  componentDidMount(){
     api.loadDefaultToDB(this.props.decks)

  }

  navigateItem = (item) =>{
    this.props.navigation.navigate('DeckView',{deckTitle:item.title})
  }

  renderItem = ({item}) => {
    return (
      <TouchableNativeFeedback onPress={()=> this.navigateItem(item) }>
        <View  style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.number}>{`${item.questions.length} Cards`}</Text>
        </View>

      </TouchableNativeFeedback>
    )
  }

  render() {

    const {decks} = this.props

    return (
      <View style={styles.container}>
        <FlatList
         data = { decks !== undefined && Object.values(decks) }
         renderItem= {this.renderItem}
         keyExtractor = {(item,index)  => index.toString()}
         />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      justifyContent: 'center',
    flexDirection: 'row'
  },
  item: {
    backgroundColor: white,
    borderBottomColor: red,
    borderBottomWidth: 2,
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 20,
    justifyContent: 'center'
  },
  number: {
    color: 'rgba(0,0,0,0.54)',
    justifyContent: 'center'
  }
})


function mapStateToProps(decks){
  return{decks}
}

export default connect(mapStateToProps,null) (DeckList)
