import React, { useState, useEffect} from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import Bird from './components/Bird';
import Obstacles from './components/Obstacles';

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth / 2 + 30);
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0);
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0);
  const obstacleWidth = 60;
  const obstacleHeight = 300;
  const gap = 200;
  const gravity = 3;
  let gameTimerId;
  let obstaclesLeftTimerId;
  let obstaclesLeftTimerIdTwo;
  let [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if(birdBottom > 0){
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      }, 30)
      return() => {
        clearInterval(gameTimerId);
        }
    }
  }, [birdBottom])

  const jump = () => {
    if(!isGameOver && (birdBottom < screenHeight)) {
      setBirdBottom(birdBottom => birdBottom + 50);
      console.log('jumped');
    }
  }
  useEffect(() => {
    if(obstaclesLeft > -obstacleWidth) {
      obstaclesLeftTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
      }, 30)
      return () => {
        clearInterval(obstaclesLeftTimerId);
      }
    }else {
      setObstaclesLeft(screenWidth);
      setObstaclesNegHeight( - Math.random() * 100);
      setScore(score => score + 1);
    }
  }, [obstaclesLeft])
  console.log(birdBottom);       
  
  useEffect(() => {
    if(obstaclesLeftTwo > -obstacleWidth) {
      obstaclesLeftTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
      }, 30)
      return () => {
        clearInterval(obstaclesLeftTimerIdTwo);
      }
    }else {
      setObstaclesLeftTwo(screenWidth);
      setObstaclesNegHeightTwo( - Math.random() * 100);
      setScore(score => score + 1);
    }
  }, [obstaclesLeftTwo])   
  
  useEffect(() => {
    if(((birdBottom < (obstaclesNegHeight + obstacleHeight + 30) || 
    birdBottom > (obstaclesNegHeight + obstacleHeight + gap - 30)) && 
    (obstaclesLeft > screenWidth / 2 - 30 && obstaclesLeft < screenWidth / 2 + 30)) 
    || 
    ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) || 
    birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap - 30)) && 
    (obstaclesLeftTwo > screenWidth / 2 - 30 && obstaclesLeftTwo < screenWidth / 2 + 30))) {

      console.log('Game Over');
      gameOver();
    }
  })

  const gameOver = () => {
    clearInterval(gameTimerId);
    clearInterval(obstaclesLeftTimerId);
    clearInterval(obstaclesLeftTimerIdTwo);
    setIsGameOver(true);

  }
  return (

    <TouchableWithoutFeedback onPress={jump} >

      <View style={styles.container}>
        {isGameOver && <Text>Score: {score}</Text>}
        <Bird 
          birdBottom={birdBottom}
          birdLeft={birdLeft} />
        <Obstacles 
          color = {'green'}
          randomBottom = {obstaclesNegHeight}
          obstaclesLeft = {obstaclesLeft}
          obstacleWidth = {obstacleWidth}
          obstacleHeight = {obstacleHeight}
          gap = {gap} />

          <Obstacles 
          color = {'yellow'}
          randomBottom = {obstaclesNegHeightTwo}
          obstaclesLeft = {obstaclesLeftTwo}
          obstacleWidth = {obstacleWidth}
          obstacleHeight = {obstacleHeight}
          gap = {gap} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
