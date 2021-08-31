import React, { useState } from "react";
import { StyleSheet, View, Text, requireNativeComponent } from "react-native";
import HeaderComponent from "./Components/HeaderComponent";
import GameScreen from "./Screens/GameScreen";
import StartGameScreen from "./Screens/StartGameScreen";
import * as Font from "expo-font";
import AppLoading from "expo";

const fetchFonts = async () => {
  await Font.loadAsync({
    "open-sans": require("./assets/Fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/Fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loaded, error] = Font.useFonts({
    "open-sans": require("./assets/Fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/Fonts/OpenSans-Bold.ttf"),
  });
  const handlerStartGame = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  let content = <StartGameScreen onStartGame={handlerStartGame} />;

  if (userNumber) {
    content = <GameScreen />;
  }

  if (!loaded) return <Text>Esperando carga de fonts</Text>;

  return (
    <View style={styles.screen}>
      <HeaderComponent title={"Adivina el Número"} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
});
