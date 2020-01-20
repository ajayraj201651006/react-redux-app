import React, { Component } from 'react';
import './Home.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

const classes = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));


class Home extends Component {
    state ={
        tempData: [],
        showTemp: false,
        user: []
    }

    componentDidMount() {
        if(this.props.users.length !== 0) {
            const skyKey = process.env.REACT_APP_DARKSKY_KEY;
            let proxy = 'https://cors-anywhere.herokuapp.com/';
            var add = this.props.users[0].address
            var lat = add.split(": ")[1].split(',')[0]
            var lang = add.split(": ")[2]
           axios.get(`${proxy}https://api.darksky.net/forecast/${skyKey}/${lat},${lang}`)
             .then(res => {
                 console.log(res);
                 this.setState({tempData: res.data, showTemp: true});
             }).catch((err) => {
                 console.log(err);
             })
        }
        
        if(this.props.location.state !== undefined) {
            this.setState({tempData: this.props.location.state.data, showTemp: true});
        }
    }

    render() {
        return(
            <div>
               <h1>Hi User!!!!</h1>
               {this.state.showTemp ? 
                  <div>
                     <Grid container spacing={4}>
                        <Grid item xs>
                            <Paper className={classes.paper}>
                                <div className="temp_box">
                                    <h2>Currently</h2>
                                    <h3>Your Current Temeprature is {((this.state.tempData.currently.temperature -32) * 5 / 9).toFixed(2)} &#8451;</h3>
                                    <h3>Summary: {this.state.tempData.currently.summary}</h3>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper className={classes.paper}>
                                <div className="temp_box">
                                    <h2>Hourly</h2>
                                    <h3>Temeperature after one hour {((this.state.tempData.hourly.data[0].temperature -32) * 5 / 9).toFixed(2)} &#8451;</h3>
                                    <h3>Summary: {this.state.tempData.hourly.summary}</h3>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper className={classes.paper}>
                                <div className="temp_box">
                                    <h2>Daily</h2>
                                    <h3>This week min temperature is {((this.state.tempData.daily.data[0].temperatureMin -32) * 5 / 9).toFixed(2)} &#8451;</h3>
                                    <h3>Summary: {this.state.tempData.daily.summary}</h3>
                                </div>
                            </Paper>
                        </Grid>
                      </Grid>
     
                  </div>
                  : <h3>Please add your info!!!</h3>
               }   
            </div>
        );
    }
}

export default Home;