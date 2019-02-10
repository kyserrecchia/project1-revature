import React from 'react';

interface IClickerDisplayProps {
  clicks: number
}

export class ClickerDisplayComponent extends React.PureComponent<IClickerDisplayProps, any> {

  constructor(props) {
    super(props);
  }

  render() {
    const { clicks } = this.props;
    return (
      <p className={clicks % 5 === 0 ? 'clicker-display-5' : ''}>
        Clicks: {clicks}
      </p>
    )
  }

}