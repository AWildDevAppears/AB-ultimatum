import React, { Component } from 'react';

class Selection extends Component {
    state = {
        isset: false,
        chosen: '',
    }
    
    render() {
        if (this.state.isset) {
            return (<p>
                {this.props.legend} {this.props.options[this.state.chosen]} {this.props.trail}

                <button onClick={this.clearSelection} type="button">Change</button>
            </p>)
        }
      return (
        <fieldset>
            <legend>{ this.props.legend }</legend>

            {this.outputFields()}
            {this.props.trail}
        </fieldset>
      );
    }

    outputFields = () => {
        return Object.keys(this.props.options).map((key) => {
            const value = this.props.options[key];

            return (
                <label key={key}>
                    <input 
                        type="checkbox" 
                        value={ `${this.props.bindTo}.${key}` } 
                        onChange={(e) => {
                            this.setState({
                                ...this.state,
                                isset: true,
                                chosen: key,
                            });
                            this.props.onChange(e)
                        }}
                    />
                    { value }
                </label>
            )
        })
    }

    clearSelection = (e) => {
        e.target.value = `${this.props.bindTo}.NULL`;

        this.props.onChange(e)

        this.setState({
            ...this.state,
            isset: false,
            chosen: '',
        }); 
    }
  }

export default Selection;