import React, { Component } from 'react';
import './Form.css';
import Map from './Map/Map';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// import DarkSkyApi from 'dark-sky-api';

import InputAdornment from "@material-ui/core/InputAdornment";
// import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
// import IconButton from '@material-ui/core/IconButton';
// import Input from '@material-ui/core/Input';
// import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
// import TextField from '@material-ui/core/TextField';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import PersonIcon from '@material-ui/icons/Person';
import CircularProgress from '@material-ui/core/CircularProgress';

// const classes = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   margin: {
//     margin: theme.spacing(1),
//   },
//   withoutLabel: {
//     marginTop: theme.spacing(3),
//   },
//   textField: {
//     width: 200,
//   },
// }));


class Form extends Component {
  
      state = { 
            name: '',
            email: '',
            contact: '',
            address: '',
            showMap: false,
            goHome: false,
            loading: false,
            mapState: {},
            data: []
      }

      submitHandler = (event) => {
           event.preventDefault();
           let proxy = 'https://cors-anywhere.herokuapp.com/';
           let userData = {
              name: this.state.name,
              email: this.state.email,
              contact: this.state.contact,
              address: this.state.address
           }
           const key = process.env.REACT_APP_DARKSKY_KEY;
          axios.get(`${proxy}https://api.darksky.net/forecast/${key}/${this.state.mapState.lat},${this.state.mapState.lang}`)
                .then(res => {
                  console.log(res);
                  this.setState({
                    goHome: true,
                    loading: false,
                    data: res.data
                  })
                }).catch((err) => {
                  console.log(err);
                });

         this.props.addUser(userData);

            this.setState({
              name: '',
              email: '',
              contact: '',
              address: '',
              loading: true
            });

          //  let mydata;
          //  if(localStorage.getItem('MyData')) {
          //     mydata = [...JSON.parse(localStorage.getItem('MyData'))];
          //  } else {
          //    mydata = this.state.entries
          //  }
          
          //  let data = {
          //    name: this.state.name,
          //    email: this.state.email,
          //    contact: this.state.contact,
          //    address: this.state.address
          //  }
          //  mydata.push(data);

          //   this.setState({
          //     name: '',
          //     email: '',
          //     contact: '',
          //     address: ''
          //   });
          // localStorage.setItem('MyData', JSON.stringify(mydata));
      }

      mapOpenHandler = () => {
        this.setState({showMap: true});
      }

      passProps = (childState) => {
               Object.assign(this.state.mapState, childState);
               const str = 'Lat: ' + String(this.state.mapState.lat)+ ', ' + 'Lang: ' + String(this.state.mapState.lang)
               this.setState({showMap: false, address: str});
               console.log(this.state);
      }

      render() {
        if(this.state.goHome) {
         return <Redirect to={{
           pathname: '/home',
           state: this.state
         }} />
        } 
        else if(this.state.loading) {
        //  return <div className='mapForm'>
        //            <CircularProgress style={{position: 'absolute'}} />
        //         </div>
        return <CircularProgress />
          
        }
          return (
            <div className="mapForm">
                <form className="Form">
                      {/* <label>Name</label>
                      <input type="text" value={this.state.name}
                            onChange={(event) => {
                              this.setState({name: event.target.value})
                            }} />

                      <label>Email</label>
                      <input type="email" value={this.state.email}
                            onChange={(event) => {
                              this.setState({email: event.target.value})
                            }}  />

                      <label>Contact</label>
                      <input type="Number" value={this.state.contact}
                            onChange={(event) => {
                              this.setState({contact: event.target.value})
                            }}/>

                      <label>Address</label>
                      <input type="text" value={this.state.address}
                            onChange={(event) => {
                              this.setState({address: event.target.value})
                            }} /> */}
                      <FormControl style={{margin: '8% 0 0 10%', width: '80%'}} variant="outlined">
                          <InputLabel style={{zIndex: '0'}} htmlFor="outlined-adornment-name">Name</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-name"
                            type={'text'}
                            value={this.state.name}
                            onChange={(event) => {
                              this.setState({name: event.target.value})
                            }}
                            endAdornment={
                              <InputAdornment position="end">
                                  <PersonIcon style={{color: 'rgba(0, 0, 0, 0.54)'}} />
                              </InputAdornment>
                            }
                            labelWidth={40}
                          />
                        </FormControl>
                        <FormControl style={{margin: '8% 0 0 10%', width: '80%'}} variant="outlined">
                          <InputLabel style={{zIndex: '0'}} htmlFor="outlined-adornment-email">Email</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-email"
                            type={'email'}
                            value={this.state.email}
                            onChange={(event) => {
                              this.setState({email: event.target.value})
                            }}
                            endAdornment={
                              <InputAdornment position="end">
                                <EmailIcon style={{color: 'rgba(0, 0, 0, 0.54)'}}/>
                              </InputAdornment>
                            }
                            labelWidth={40}
                          />
                        </FormControl>
                        <FormControl style={{margin: '8% 0 0 10%', width: '80%'}} variant="outlined">
                          <InputLabel style={{zIndex: '0'}} htmlFor="outlined-adornment-number">Contact</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-number"
                            type={'number'}
                            value={this.state.contact}
                            onChange={(event) => {
                              this.setState({contact: event.target.value})
                            }}
                            endAdornment={
                              <InputAdornment position="end">
                                <PhoneIcon style={{color: 'rgba(0, 0, 0, 0.54)'}} />
                              </InputAdornment>
                            }
                            labelWidth={55}
                          />
                        </FormControl>
                        <FormControl style={{margin: '8% 0 0 10%', width: '80%'}} variant="outlined">
                          <InputLabel style={{zIndex: '0'}} htmlFor="outlined-adornment-address">Address</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-address"
                            type={'text'}
                            value={this.state.address}
                            onChange={(event) => {
                              this.setState({address: event.target.value})
                            }}
                            endAdornment={
                              <InputAdornment position="end">
                                <AddLocationIcon style={{color: 'rgba(0, 0, 0, 0.54)', cursor: 'pointer'}}
                                                 onClick={this.mapOpenHandler}/>
                              </InputAdornment>
                            }
                            labelWidth={60}
                          />
                        </FormControl>
                        <div className="div1">
                          <button className='sub_btn' type="submit" onClick={(event) => this.submitHandler(event)}>Submit</button>
                        </div>
                </form>
                {this.state.showMap ? <Map handleState={(childState) => {this.passProps(childState)}}/> :
                null}
              </div>
          );
      }
}

export default Form;
