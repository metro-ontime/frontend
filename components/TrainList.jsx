import React, { Component } from 'react';
import Link from 'next/link';
// import TrainDetails from './TrainDetails';

class TrainList extends Component {
  state = {
    trains: [
      {
        id: 1,
        line: 'Blue',
        status: false,
      },
      {
        id: 2,
        line: 'Red',
        status: false,
      },
      {
        id: 3,
        line: 'Green',
        status: false,
      },
      {
        id: 4,
        line: 'Gold',
        status: false,
      },
      {
        id: 5,
        line: 'Purple',
        status: false,
      },
      {
        id: 6,
        line: 'Expo',
        status: false,
      },
    ],
  };

  render() {
    const { trains } = this.state;

    return trains.map(train => (
      // How to route to details component?

      <ul key={train.id}>
        <Link href={{ pathname: '/details', query: { train: `${train.id}` } }}>{train.line}</Link>
      </ul>
    ));
  }
}

export default TrainList;
