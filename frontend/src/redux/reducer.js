import { SEARCHQUERY, ALLSEARCHWORD, ADDWORD } from './type';
const initialState = {
    searchWords: null,
    searchWord: null,
    newWord: null
};

const SearchReducer = (state = initialState, action) => {
    const { type, payload } = action;
    let newState = { ...state };
    switch (type) {
        case SEARCHQUERY:
            newState.searchWord = payload.searchWord;
            if (newState.searchWords) {
                newState.searchWords.push(payload.searchWord);
            }
            return newState;
        case ALLSEARCHWORD:
            newState.searchWords = payload.searchWords;
            return newState;
        case ADDWORD:
            newState.newWord = payload.newWord;
            if (newState.searchWords) {
                newState.searchWords.push(payload.newWord);
            }
            return newState;
        default:
            return state;
    }
}


export default SearchReducer;