import React, { Component, Fragment } from 'react';

import GameActions from '../../state/Actions';

import Selection from '../partial/Selection';

import './characterCreator.css';
import { Redirect } from 'react-router-dom';

class CharacterCreator extends Component {
  state = {
    name: '',
    surname: '',
    prefix: '',
    'looks.all.gender': '',
    'looks.face.eyeColor': '',
    'looks.face.hairLength': '',
    'looks.face.hairStyle': '',
    'looks.face.hairColor': '',
    'looks.body.weight': '',
  }

  render() {
    return (
      <form>
        <h1>New Game</h1>

        { this.getSysnopsis() }

        <Selection 
          legend="You see" 
          bindTo="looks.all.gender"
          options={{
            highFem: "a highly effeminate",
            fem: "an effeminate",
            andr: "an androgynous",
            masc: "a masculine",
            highMasc: "a highly masculine"
          }}  
          trail="face"
          onChange={this.setAttribute}
        />

        <Selection 
          legend="With" 
          bindTo="looks.face.eyeColor"
          options={{
            blue: "blue",
            green: "green",
            hazel: "hazel",
            red: "red",
            brown: "brown",
            gray: "gray",
            black: "black", 
          }}  
          trail="tired eyes"
          onChange={this.setAttribute}
        />

        <Selection 
          legend="Atop your head you have" 
          bindTo="looks.face.hairLength"
          options={{
            long: "long",
            med: "medium length",
            short: "short",
            bald: "no"
          }}  
          trail="hair"
          onChange={this.setAttribute}
        />

        { this.hairColor() }
        { this.hairStyle() }

        <Selection 
          legend="You have" 
          bindTo="looks.body.weight"
          options={{
            skinny: "a skinny",
            slim: "a slim",
            average: "an average",
            built: "a well built",
            toned: "a toned",
            chubby: "a chubby",
            overweight: "an overweight",
          }}  
          trail="frame"
          onChange={ this.setAttribute }
        />

        <p>
          You walk back into the living room and pick up your mail on your PDA.
        </p>

        <p>
          "Great, a message from my landlord"
        </p>

        <p>
          Heading the message is your name.
        </p>

        <fieldset>
          <legend>The message is addressed to</legend>

          <label>
            Prefix
            <input type="text" value={ this.state.prefix } name="prefix" onChange={this.setValue} placeholder="e.g. Mr, Ms, Mx" />
          </label>

          <label>
            Surname
            <input type="text" value={ this.state.surname } name="surname" onChange={this.setValue}  />
          </label>
        </fieldset>

        <fieldset>
          <legend>But your preffered name is</legend>

          <label>
            Name
            <input type="text" value={ this.state.name } name="name" onChange={this.setValue} />
          </label>
        </fieldset>

        <p>
          You continue reading the message.
        </p>

        <p>
          "Great, looks like I missed my payment again last week and they cut the water, this day couldn't get any better."
        </p>


        <button type="button" onClick={this.setCharacter}>Continue</button>

        {this.displayRedirect()}

      </form>
    );
  }

  setValue = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  setAttribute = (e) => {
    let path = e.target.value.split('.')
    let value = path.pop();

    if (value === 'NULL') {
      value = '';
    }

    if (path === 'looks.face.hairLength') {
      this.setState({
        ...this.state,
        [path.join('.')]: value,
        'looks.face.hairStyle': '',
        'looks.face.hairColor': '',
      });

      return;
    }

    this.setState({
      ...this.state,
      [path.join('.')]: value,
    });
  }

  setCharacter = () => {
    if (this.hasNoHair()) {
      this.setState({
        ...this.state,
        ['looks.face.hairStyle']: 'NULL',
        ['looks.face.hairColor']: 'NULL',
      });
    }

    if (Object.keys(this.state).filter(item => this.state[item] === '').length > 0) return;
  
    const looks = {
      all: {
        gender: this.state['looks.all.gender'],
      },
      face: {
        eyeColor: this.state['looks.face.eyeColor'],
        hairLength: this.state['looks.face.hairLength'],
        hairStyle: this.state['looks.face.hairStyle'],
        hairColor: this.state['looks.face.hairColor'],
      },
      body: {
        weight: this.state['looks.body.weight'],
      },
    };

    GameActions.setPlayerLooks(looks);
    GameActions.setPlayerName(this.state.prefix, this.state.surname, this.state.name);

    this.setState({
      ...this.state,
      done: true,
    });
  }


  getSysnopsis = () => {
    return (
      <Fragment>
        <p>
          Its a cold September, You walk into your apartment, worn down from your dead end job.
          The chirping of the birds in the trees almost sounds taunting, boasting of their freedom, while you 
          spend your days rotting away for minimum wage.
        </p>
        <p>"There has got to me more to life than this"</p>
        <p>
          You mutter as you stagger to the bathroom.
          You turn on the tap to wash your face.
        </p>
        <p>
          "Great, no hot water again"
        </p>
        <p>You stare into the mirror and the mirror stares back, judging you.</p>
      </Fragment>
    )
  }

  displayRedirect = () => {
    if (this.state.done) {
      return <Redirect to="/main" />
    }
  }

  hairStyle = () => {
    if (this.hasNoHair()) {
      return '';
    }

    if (this.state['looks.face.hairLength'] === 'short') {
      return (
        <Selection 
          legend="And stylised" 
          bindTo="looks.face.hairStyle"
          options={{
            shortBackSides: "in a short back and sides",
            shaveSide: "with one shaved side",
            spiked: "in spikes"
          }}  
          trail=""
          onChange={this.setAttribute}
        /> 
      )
    }

    return (
      <Selection 
        legend="And stylised" 
        bindTo="looks.face.hairStyle"
        options={{
          bun: "in a tight bun",
          pony: "in a ponytail",
          dreads: "in dreadlocks",
          curly: "in curls",
          straight: "straight",
          shaveSide: "with one shaved side",
        }}  
        trail=""
        onChange={this.setAttribute}
      />
    )
  }

  hairColor = () => {
    if (this.hasNoHair()) {
      return '';
    }

    return (
      <Selection 
        legend="Colored" 
        bindTo="looks.face.hairColor"
        options={{
          white: "white",
          gray: "gray",
          brown: "brown",
          black: "black",
          blonde: "blonde",
          orange: "orange",
          red: "red",
          auburn: "auburn",
          green: "green",
          pink: "pink",
          magenta: "magenta"
          
        }}  
        trail=""
        onChange={this.setAttribute}
      />
    )
  }

  hasNoHair = () => {
    return this.state['looks.face.hairLength'] === '' || this.state['looks.face.hairLength'] === 'bald';
  }
}

export default CharacterCreator;