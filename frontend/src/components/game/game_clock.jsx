import React from 'react';

export default class GameClock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 30
        };
        this.tick = this.tick.bind(this);
        this.id = 'clearInterval'
    }

    componentDidMount() {
        this.id = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.id);
    }

    tick() {
        const time = this.state.time - 1;
        if (time === -1) {
            clearInterval(this.id);
            this.props.timesUp();
        } else {
            this.setState({ time })
        }
    }

    render() {
        return (
            <div className="game-clock">
                {this.state.time}
            </div>
        );
    }
}