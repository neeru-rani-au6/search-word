import React, { Component } from 'react';
import { TextField, Grid, Divider, Card } from '@material-ui/core';
import { searchData, addWord } from '../redux/action'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

class Search extends Component {

    state = {
        Word: "",
        open: false,
        searchWord: "",
        language: "",
        definition: "",
        isSubmitting: false,
        error: '',
        snackbarOpen: false,
        snackbarMessage: "",
        snackbarSeverity: "success"
    }
    handleChangeSearch = (key, value) => {
        this.setState({
            [key]: value
        }, () => {
            this.props.filterWords(this.state.Word)
        });
        if (!this.props.filterWords) {

        }
    }
    handleSubmitSearch = async (e) => {
        e.preventDefault();
        this.props.searchWordInDatabase(this.state.Word);
    }
    handleChangeWord = (key, value) => {
        this.setState({
            [key]: value
        })
    }
    handleSubmitWord = async (e) => {
        e.preventDefault();
        this.setState({ ...this.state, isSubmitting: true });
        await this.props.addWord({
            searchWord: this.state.searchWord,
            language: this.state.language,
            definition: this.state.definition
        });
        this.setState({ ...this.state, isSubmitting: false, open: false });
        console.log(this.props)
        if (this.props.data.error) {
            this.setState({ ...this.state, open: true })
            if (this.props.data.error) {
                this.setState({
                    snackbarOpen: true,
                    snackbarMessage: this.props.data.error,
                    snackbarSeverity: 'error'
                })
            } else {
                this.setState({
                    snackbarOpen: true,
                    snackbarMessage: this.props.data.message
                })

            }
        }

    }

    showSnackbar = () => {
        return <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={this.state.snackbarOpen}
            onClose={() => { this.setState({ snackbarOpen: false }) }}
            autoHideDuration={3000}
        >
            <MuiAlert severity={this.state.snackbarSeverity} variant="filled">
                {this.state.snackbarMessage}
            </MuiAlert>
        </Snackbar>
    }
    handleClickOpen = () => {
        this.setState({
            open: true
        });
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };
    render() {
        return (
            <>
                <Grid className="search-bar" container spacing={1} alignItems="center" justify="space-around">
                    <Grid item >
                        <form noValidate autoComplete="off" onSubmit={this.handleSubmitSearch}>
                            <TextField id="standard-basic" placeholder="Search text..." fullWidth value={this.state.Word} onChange={(e) => this.handleChangeSearch("Word", e.target.value)} />
                        </form>
                    </Grid>
                    <Grid item >
                        <div   >
                            <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                                Add Word
                </Button>
                        </div>
                    </Grid>
                </Grid>
                <Grid>
                    {this.props.data?.result &&
                        <Card className="card-body">
                            <h1>
                                Search key:{this.props.data.result.id}
                            </h1>
                            <h3>Provider: {this.props.data.result.metadata.provider}</h3>
                            {this.props.data.result.results.map((r, index) => (
                                <div key={index}>
                                    <Grid >
                                        <Grid item>
                                            Language: {r.language}
                                        </Grid>
                                        <Grid item>
                                            Type: {r.type}
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                    {
                                        r.lexicalEntries?.map((l, index) => (
                                            <div key={index}>
                                                <p>
                                                    Etymologies:{l.entries[0]?.etymologies}
                                                </p>
                                                <h3>
                                                    LexicalCategory:{l.lexicalCategory.id}
                                                </h3>
                                                {l.entries[0]?.notes &&
                                                    <p>Notes: {l.entries[0]?.notes[0].text}</p>
                                                }
                                                <div>
                                                    {l.entries[0].senses?.map((s, index) => (
                                                        <p key={index}>
                                                            Definitions:{s.definitions}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                            ))}
                        </Card>}

                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="searchWord"
                                label="Word"
                                type="text"
                                fullWidth
                                onChange={(e) => this.handleChangeWord("searchWord", e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                id="language"
                                label="language"
                                type="language"
                                fullWidth
                                onChange={(e) => this.handleChangeWord("language", e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                id="definition"
                                label="definition"
                                type="definition"
                                fullWidth
                                onChange={(e) => this.handleChangeWord("definition", e.target.value)}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                    </Button>
                            <Button onClick={this.handleSubmitWord} disabled={this.state.isSubmitting} color="primary">
                                Submit
                    </Button>
                        </DialogActions>
                    </Dialog>

                    {this.showSnackbar()}
                </Grid>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.searchReducer
    }
}

export default connect(mapStateToProps, { searchData, addWord })(Search);