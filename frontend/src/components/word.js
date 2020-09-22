import React, { Component } from 'react';
import { Grid, Divider, Card } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

class Word extends Component {
    render() {
        return (
            <>
                {this.props.allWords ?
                    < div >
                        {
                            this.props.allWords && this.props.allWords.map((w) => (
                                <div key={w._id}>
                                    <Card className="all-search-word" >
                                        <h1>
                                            Search key:{w.result.id}
                                        </h1>
                                        <h3>Provider: {w.result.metadata.provider}</h3>
                                        {w.result.results.map((r, index) => (
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
                                                            {l.lexicalCategory &&
                                                                <h3>
                                                                    LexicalCategory:{l.lexicalCategory.id}
                                                                </h3>
                                                            }
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

                                    </Card>
                                </div>
                            ))
                        }

                    </div>
                    : <div className="loader">
                        <CircularProgress />
                    </div>
                }
            </>
        )
    }
}


export default Word;