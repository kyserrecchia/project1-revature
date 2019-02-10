import React from 'react';
import { Button } from 'reactstrap';
import { ClickerDisplayComponent } from './clicker-display/ClickerDisplay.component';
import { ClickerIncrementersComponent } from './clicker-incrementers/ClickerIncrementers.component';

export class ClickerComponent extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      clicks: 0
    }
  }

  increment = (amount: number) => {
    this.setState({
      clicks: this.state.clicks + amount
    })
  }

  render() {
    const {clicks} = this.state;
    const incrementers: any[] = [];
    for (let i = 100; i <= clicks; i+=100) {
      incrementers.push(<ClickerIncrementersComponent {...{
        clicks,
        incrementAmount: i/10,
        renderAt: i,
        increment: this.increment
      }} /> )
    }
    return (
      <div>
        <ClickerDisplayComponent clicks={clicks}/>
        <ClickerIncrementersComponent {...{
          clicks,
          incrementAmount: 1,
          renderAt: 0,
          increment: this.increment
        }}/>
        <br />
        <ClickerIncrementersComponent {...{
          clicks,
          incrementAmount: 5,
          renderAt: 10,
          increment: this.increment
        }}/>
        {incrementers}
      </div>
    )
  }

}