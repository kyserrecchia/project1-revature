import React from 'react';
import Button from 'reactstrap/lib/Button';

interface IClickerIncrementerProps {
  clicks: number,
  incrementAmount: number,
  renderAt: number,
  increment: (amount: number) => void
}

export class ClickerIncrementersComponent extends React.Component<IClickerIncrementerProps, any> {

  constructor(props) {
    super(props);
  }

  increment = () => {
    this.props.increment(this.props.incrementAmount);
  }

  render() {
    const { clicks, renderAt, incrementAmount } = this.props;
    return clicks >= renderAt && (
      // react fragment is an empty tag that can be used
      // to have multiple tags on the root level of jsx
      // without rendering this aditional empty tag
        <Button color="success" onClick={this.increment}>+{incrementAmount}</Button>

    )
  }

}