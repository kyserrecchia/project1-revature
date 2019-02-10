import React from 'react';

export class ChuckNorrisComponent extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      joke: 'A snake bit chuck norris after 5 painful days the snake died',
      test: 'test'
    }
  }

  async componentDidMount() {
    this.newJoke();
  }

   newJoke = async () => {
    try {
      const resp = await fetch('http://api.icndb.com/jokes/random?limitTo=[nerdy]');
      const body = await resp.json();
      this.setState({
        joke: body.value.joke,
      })
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.state.test}
          Joke: {this.state.joke}
        </div>
        <button className="btn btn-primary" onClick={this.newJoke}>New Joke</button>
      </div>
    )
  }

}