import React, { Component } from 'react';
import Search from './components/search';
import Word from './components/word';
import { allWord, searchData } from './redux/action';
import { connect } from 'react-redux';
class App extends Component {
    state = {
        data: null
    }
    async componentDidMount() {
        await this.props.allWord();
        await this.setState({ data: this.props.data.searchWords });
        //console.log(this.props.data.searchWords);
    }
    filterWords = (searchText) => {
        const data = this.props.data.searchWords.filter((word) => word.searchWord.indexOf(searchText) !== -1)
        this.setState({ data });
    }
    searchWordInDatabase = async (searchWord) => {
        await this.props.searchData(searchWord);
        this.filterWords(searchWord);
    }
    render() {
        return (
            <div className="all-body">
                <Search searchWordInDatabase={this.searchWordInDatabase} filterWords={this.filterWords} />
                <Word allWords={this.state.data} />
            </div>
        )
    }
}
const mapStateToProps = (state) => {

    return {
        data: state.searchReducer
    }
}
export default connect(mapStateToProps, { allWord, searchData })(App);

