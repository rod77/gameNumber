import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import Card from "../Components/Card";
import Input from "../Components/Input";
import NumberContainer from "../Components/NumberContainer";
import colors from "../constants/colors";

const StartGameScreen = ({ onStartGame }) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("");

  const handlerInputNumber = (text) => {
    setEnteredValue(text.replace(/[^0-9]/g, ""));
  };
  const handlerResetInput = () => {
    setEnteredValue("");
    setConfirmed(false);
    setSelectedNumber("");
  };
  const handlerConfirmInput = () => {
    const choseNumber = parseInt(enteredValue);
    if (choseNumber === NaN || choseNumber <= 0 || choseNumber > 99) return;

    setConfirmed(true);
    setSelectedNumber(parseInt(enteredValue));
    setEnteredValue("");
  };

  const handleStartGame = () => {
    onStartGame(selectedNumber);
  };

  let confirmedOuput = null;
  if (confirmed) {
    confirmedOuput = (
      <Card style={styles.summaryContainer}>
        <Text>Tu selección</Text>
        <NumberContainer> {selectedNumber}</NumberContainer>
        <Button title="Empezar Juego" onPress={handleStartGame} />
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start Game Screen</Text>
        <Card style={styles.inputContainer}>
          <Text>Elija un número</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalization={false}
            autoCorrect={false}
            keyboardType="numeric"
            maxLength={2}
            value={enteredValue}
            onChangeText={handlerInputNumber}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Limpiar"
                onPress={handlerResetInput}
                color={colors.accent}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirmar"
                onPress={handlerConfirmInput}
                color={colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOuput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    padding: 20,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    width: 100,
  },
  summaryContainer: {
    marginVertical: 10,
    padding: 10,
    alignItems: "center",
  },
});

export default StartGameScreen;
