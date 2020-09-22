import { SEARCHQUERY, ALLSEARCHWORD, ADDWORD } from './type';
import axios from 'axios'

export const searchData = (Word) => async (dispatch) => {
    try {
        const { data } = await axios(`http://localhost:3000/searchWord?searchWord=${Word}`);
        dispatch({
            type: SEARCHQUERY,
            payload: {
                searchWord: data
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: SEARCHQUERY,
            payload: {
                error: error.response.data.error
            }
        })
    }
}

export const allWord = () => async dispatch => {
    try {
        const { data } = await axios(`http://localhost:3000/searchWord/All`)
        dispatch({
            type: ALLSEARCHWORD,
            payload: { searchWords: data }
        })
    } catch (error) {
        console.log(error)

    }
}

export const addWord = (word) => async dispatch => {
    try {
        const { data } = await axios({
            method: "post",
            url: 'http://localhost:3000/searchWord/addword',
            data: word,
        }
        );
        console.log(data)
        dispatch({
            type: ADDWORD,
            payload: {
                newWord: data
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: ADDWORD,
            payload: {
                error: error.response.data.error
            }
        })

    }
}
