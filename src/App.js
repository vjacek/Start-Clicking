import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { getLevel, getTime, COLORS } from './utils.js';

const WHITE = '#FFFFFF';
const START_CLICKING = 'Start Clicking';
const GAME_OVER = 'Game Over';

class App extends Component {

  state = {
    score: 0,
    progress: 0,
    highscore: 0,
    color: COLORS.LIGHTGREY,
    gameOver: false,
    newGameCountdown: 5,
    showProgress: true,
    message: START_CLICKING
  }

  // update score, progress bar, background
  handleClick = () => {

    this.setState((prevState) => {

      // Current game continues
      if (!prevState.gameOver) {

        const newScore = prevState.score + 1;
        const { color, min, max } = getLevel(newScore);
        const time = getTime(this.state.score, this.state.highscore);
        clearTimeout(prevState.timer);

        console.log('color: ' + color + ', min: ' + min + ', max: ' + max + ', score: ' + prevState.score + ', highscore: ' + prevState.highscore + ', time: ' + time);

        return {
          score: newScore,
          progress: (newScore - min) / (max - min) * 100,
          highscore: newScore > prevState.highscore ? newScore : prevState.highscore,
          color: color,
          timer: setTimeout(() => {

            console.log('timer over');

            // Game over
            this.setState({
              gameOver: true,
              color: WHITE,
              scoreColor: COLORS.LIGHTGREY,
              showProgress: false,
              message: GAME_OVER
            })
          }, time)
        };
      }
      // New game
      else {
        // Count down to give time to realize the game is over while clicking fast
        if (prevState.newGameCountdown > 0) {
          return {
            progress: 0,
            score: prevState.newGameCountdown,
            newGameCountdown: prevState.newGameCountdown - 1,
            scoreColor: COLORS.LIGHTGREY
          };
        }
        // Actual new game state
        else {
          console.log('new game');
          return {
            score: 0,
            progress: 0,
            color: COLORS.LIGHTGREY,
            scoreColor: COLORS.BLACK,
            gameOver: false,
            newGameCountdown: 5,
            showProgress: true,
            message: START_CLICKING
          };
        }
      }
    });

  }

  render() {
    return (

      <Container fluid
        onClick={this.handleClick}
        style={{
          minHeight: "100vh",
          background: this.state.color
        }}
      >

        <Row style={{ height: "15vh" }} />

        <Row style={{ height: "10vh", border: "1px solid red" }}>
          <div style={{
            margin: "auto",
            fontSize: "50px",
            fontWeight: "bold",
            color: `${this.state.scoreColor}`
          }}>
            {this.state.message}
          </div>
        </Row>

        <Row style={{ height: "10vh", border: "1px solid blue" }} />

        <Row style={{ height: "10vh" }}>
          <Col md={1} />
          <Col md={10}>
            {this.state.showProgress &&
              <ProgressBar variant="primary" now={this.state.progress} />
            }
          </Col>
          <Col md={1} />
        </Row>

        <div className="row align-items-center">
          <Col />
          <Col md={1} style={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: "70px",
            color: `${this.state.scoreColor}`
          }}>
            <div>
              {this.state.score}
            </div>
          </Col>
          <Col />
        </div>
      </Container>
    );
  }
}

export default App;
