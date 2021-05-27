import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TimeAgo from 'timeago-react';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    StatusText: {
        color: "rgb(0,51,102)"
    },
}));


export default function Tweets() {
    const classes = useStyles()
    const [city, setCity] = useState('')
    const [tweets, setTweets] = useState([{}])

    const handleChange = (e) => {
        setCity(e.target.value);
    }

    const TWEETS_SEARCH_API = `https://covidconnect.vercel.app/api/1.1/data?city=${city}&max_results=25`

    useEffect(() => {
        const getTweets = async () => {
            const res = await axios.get(TWEETS_SEARCH_API);
            const data = res.data.response.api_response.statuses;
            return new Promise((resolve, _) => resolve(data));
        }
        if (city != '') {
            getTweets().then(res => setTweets(res))
        }
        console.log(tweets);
    }, [city])

    return (
        <Grid container justify='center' alignItems='center'>
            <Box p={10}>
                <Typography variant='h5' style={{
                    marginBottom: '30px'
                }} className={classes.StatusText}>
                    Type a city name below to get related Tweets
                </Typography>
                <TextField
                    variant='outlined'
                    name='city'
                    fullWidth
                    value={city}
                    onChange={handleChange}
                />
            </Box>

            {tweets.map((result, id) => (
                <div key={id} style={{
                    display: "flex",
                    justifyContent: 'flex-start',
                    padding: '10px 30px',
                    margin: '10px',
                    width: '600px',
                    boxShadow: '1px 1px 5px grey',
                    borderRadius: '3px'
                }} >
                    <div style={{
                        width: '100%',
                        padding: '0px 10px'
                    }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <TimeAgo
                                datetime={result.created_at}
                            />
                            <span
                                style={{
                                    paddingBottom: '5px',
                                    fontWeight: '500',
                                    marginBottom: '5px'
                                }}
                            >
                                <FontAwesomeIcon icon={faTwitter} />
                                <a
                                    href={`https://twitter.com/i/web/status/${result.id_str}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    key={result.id_str}
                                    className="ml-2">
                                    Open in Twitter
                                </a>
                            </span>
                        </div>

                        <div
                            style={{
                                paddingBottom: '5px',
                                fontWeight: '500',
                                marginBottom: '5px',
                            }}>
                            {result.full_text}
                        </div>
                    </div>
                </div>)
            )}

        </Grid>
    )
}