import React, { Component } from 'react';
import './App.css';

const pads = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText : ""
    }
    this.handleDisplayChange = this.handleDisplayChange.bind(this);
  }

  handleDisplayChange(txt) {
    this.setState({displayText: txt})
  }

  render() {
    return (
      <div id="drum-machine">
         <div id="display">
            Pushed: {this.state.displayText}
         </div>
        <Drums 
          displayText={this.state.displayText} 
          handleDisplayChange={this.handleDisplayChange} />
      </div>
    );
  }
}

// Make drumpad ( 3 x 3 circles )
// Map through pads array, make one <div> per object in array


class Drums extends Component {
  constructor(props) {
  super(props);
  
  this.playSound = this.playSound.bind(this);
  this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(e) {
    const itemInPads = pads.find(i => i.keyCode === e.keyCode) ;
    if(itemInPads !== undefined) {
      const soundClip = document.getElementById(itemInPads.keyTrigger);

      this.props.handleDisplayChange(soundClip.id)
      soundClip.currentTime = 0;
      soundClip.play();
    } else {
      console.log("No valid key")
    }
  }

  // Play soundclip
  playSound(e) {
    const soundClip = document.getElementById(e.target.children[0].id);
    let nameOfClip = document.getElementById(e.target.id);

    this.props.handleDisplayChange(nameOfClip.id)
    soundClip.currentTime = 0;
    soundClip.play();
  }

  // Return 3 x 3 drum pads in flexbox container
  render() {
    let padBank;
    padBank = pads.map((drumObj) => {
      return (
        <DrumPad 
          name={drumObj.id}
          clickHandler={this.playSound}
          displayInPad={drumObj.keyTrigger}
          soundFile={drumObj.url}
          keyCode={drumObj.keyCode}

          key={drumObj.id}
        />
      )
    });
    
    return (
      <div className="drum-flex-container">
        {padBank}
      </div>
      );
  }

}

// Return one drumpad
function DrumPad(props) {
  return (
    <div 
      className="drum-pad"
      id={props.name}
      onClick={props.clickHandler}>

      {props.displayInPad}
      
      <audio className="clip" id={props.displayInPad} src={props.soundFile} type="audio/mp3">/</audio>
    </div>
  )
}


  export default App;