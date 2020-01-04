import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { getLevel, getTime, COLORS } from './utils.js';

class App extends Component {

  state = {
    score: 0,
    progress: 0,
    highscore: 0,
    color: COLORS.LIGHTGREY,
    gameOver: false,
    newGameCountdown: 5
  }

  // update score, progress bar, background
  handleClick = () => {

    this.setState((prevState) => {

      // Current game continues
      if (!prevState.gameOver) {

        const newScore = prevState.score + 1;
        const { color, min, max } = getLevel(newScore);
        const time = getTime(this.state.score, this.state.highscore);

        console.log('color: ' + color + ', min: ' + min + ', max: ' + max + ', score: ' + prevState.score + ', highscore: ' + prevState.highscore + ', time: ' + time);

        clearTimeout(prevState.timer);

        return {
          score: newScore,
          progress: (newScore - min) / (max - min) * 100,
          highscore: newScore > prevState.highscore ? newScore : prevState.highscore,
          color: color,
          timer: setTimeout(() => {
            console.log('timer over');
            this.setState({
              gameOver: true,
              color: COLORS.RED
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
            newGameCountdown: prevState.newGameCountdown - 1
          };
        }
        // Actual new game state
        else {
          console.log('new game');
          return {
            score: 0,
            progress: 0,
            color: COLORS.LIGHTGREY,
            gameOver: false,
            newGameCountdown: 5
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
          border: "2px solid blue",
          background: this.state.color
        }}
      >

        <Row style={{ height: "20vh" }} />

        <Row style={{ height: "10vh", border: "1px solid orange" }}>
          <Col md={1} />
          <Col md={10}>
            <ProgressBar variant="primary" now={this.state.progress} />
          </Col>
          <Col md={1} />
        </Row>

        <div className="row align-items-center" style={{ border: "1px solid yellow" }}>
          <Col />
          <Col md={1} style={{
            textAlign: "center",
            border: "1px solid red",
            fontWeight: 700,
            fontSize: "70px"
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
