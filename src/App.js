import logo from './joker-svgrepo-com.svg';
import laughEmoji from './laughing-emoji-svgrepo-com.svg';
import './App.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faAngleRight, faAngleLeft, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      colorCount: 0,
      Joke: '',
      Category: ''
    }
    this.next = this.next.bind(this);
    this.Joke = this.Joke.bind(this);
    this.previous = this.previous.bind(this);
  }

  componentDidMount(){
    this.getJoke().then(data => {
      this.setState(() => ({
        Joke: data.joke
      }));
    });
  }

  next(){
   if(this.state.colorCount <= 5){
    this.setState(state => ({
      colorCount: state.colorCount + 1,   
    }));
   }

   if(this.state.colorCount === 5){
    this.setState(() => (
      {colorCount: 0}));
  }
  }

  Joke(){
    if(this.state.colorCount <= 5){
      this.setState(state => ({
        colorCount: state.colorCount + 1,   
      }));
     }
  
     if(this.state.colorCount === 5){
      this.setState(() => (
        {colorCount: 0}));
    }
    this.getJoke().then(data => {
      this.setState(() => ({
        Joke: data.joke,
        Category: data.category
      }));
    });
  }

  previous(){
    if(this.state.colorCount > 0){
      this.setState(state => (
      {colorCount: state.colorCount - 1}));
    }
  }

  async getJoke(){
    let API = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";
    
    let Joke = await fetch(API).then(info => info.json());

    console.log(Joke);
    return Joke;
  }

  render(){
    let Colors = [
      {backgroundColor: '#191923'}, 
      {backgroundColor: '#BF1363'},
      {backgroundColor: '#0E79B2'},
      {backgroundColor: '#F39237'},
      {backgroundColor: '#20063B'},
      {backgroundColor: '#004916'},
    ]


  return (
    <div className="App">
      <header className="App-header" style={Colors[this.state.colorCount]}>
        <img src={logo} className="App-logo" alt="logo" />
        <div className='Joke-box' id="quote-box">
        <h1 className='Category' id="author" style={{color: `${Colors[this.state.colorCount].backgroundColor}`}}>{this.state.Category}</h1>
        <div className='Quote'>
        <img src={laughEmoji} className='Laugh-emoji' alt='laugh-emoji'/>
        <p className='Joke-text' id="text" style={{color: `${Colors[this.state.colorCount].backgroundColor}`}}><FontAwesomeIcon icon={faQuoteLeft} /> {this.state.Joke} <FontAwesomeIcon icon={faQuoteRight} /></p>
        </div>
        <div className='Button-container'>
          <button className='Joke-btn' onClick={this.previous} style={Colors[this.state.colorCount]}><FontAwesomeIcon icon={faAngleLeft} /></button>
          <button className='Joke-btn' id="new-quote" onClick={this.Joke} style={Colors[this.state.colorCount]}>New Joke</button>
          <button className='Joke-btn' onClick={this.next} style={Colors[this.state.colorCount]}><FontAwesomeIcon icon={faAngleRight} /></button>
        </div>
        <p className='silas'><a className='tweet' id="tweet-quote" href='twitter.com/intent/tweet' style={{color: `${Colors[this.state.colorCount].backgroundColor}`}}>Tweet Joke</a></p>
        </div>
        <small className='silas'>By <b>Silas Coley</b></small>
      </header>
    </div>
  );
  }
}

export default App;
