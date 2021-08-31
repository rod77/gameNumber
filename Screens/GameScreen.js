import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Card from "../Components/Card";
import NumberContainer from "../Components/NumberContainer";
import colors from "../constants/colors";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min) + min);
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = ({ onEndGame, onGameOver, userOption }) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, userOption)
  );
  const [rounds, setRounds] = useState(0);
  const [oportunidades, setOportunidades] = useState(3);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const handleNextGuess = (direction) => () => {
    console.log("direction");
    console.log(direction);
    if (
      (direction === "lower" && currentGuess < userOption) ||
      (direction === "greater" && currentGuess > userOption)
    ) {
      Alert.alert("No mientas!", "Tu sabes que no es verdad...!", [
        {
          text: "Disculpa!",
          style: "cancel",
        },
      ]);
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setRounds((round) => round + 1);
    setOportunidades(oportunidades - 1);
  };

  return (
    <View style={styles.screen}>
      <Text> La Computadora dice: </Text>
      <NumberContainer>{currentGuess}</NumberContainer>

      <Card style={styles.cardButton}>
        <Text> Mi valor es: </Text>
        <View style={styles.buttonContainer}>
          <Button title="MENOR" onPress={handleNextGuess("lower")} />
          <Button title="MAYOR" onPress={handleNextGuess("greater")} />
        </View>
      </Card>

      <Card style={styles.cardButton}>
        <Text> Oportunidades Restantes: {oportunidades} </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  cardButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    padding: 10,
    width: 300,
    maxWidth: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    padding: 10,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
