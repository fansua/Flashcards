import React from 'react'
import { AsyncStorage } from 'react-native'

export const FLASHCARDS_STORAGE_KEY = 'flashcards:decks'


export function getDecks(){
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY,(err,result) =>{
    parsedResults = JSON.parse(result)
    return parsedResults
  })

}

export function getDeck(title){
  return getDecks().then( decks => decks(title))
}

export function saveDeckTitle(title){
  AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY,(err,result) =>{
     let results = JSON.parse(result)
     if(results.title === undefined){
       results[title] ={ title:title, questions: [] }
       AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(results), ()=> {
         AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY,(err,result) =>{
            let results = JSON.parse(result)
         });
       })
     }
   })
 }

export function addCardToDeck(title, flashcard){
  AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY,(err,result) =>{
     let results = JSON.parse(result)
     if(results[title].questions){
       results[title].questions.push(flashcard)
       AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(results), ()=> {
         AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY,(err,result) =>{
            let results = JSON.parse(result)
         });
       })
     }
   })
}

export function loadDefaultToDB(decks){
  AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks), ()=> {
    AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY,(err,result) =>{
       let results = JSON.parse(result)
    });
  })
}
