import React from 'react';
import "./game_clock.scss"

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
            <div class="game-clock">
                <svg class="game-clock__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <g class="game-clock__circle">
                        <circle class="game-clock__path-elapsed" cx="50" cy="50" r="45" />
                    </g>
                </svg>
                <span class="game-clock__label">
                    {this.state.time}
                </span>
            </div>
        );
    }
}