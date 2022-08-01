import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Touchable,
} from "react-native";
import { Arvo_400Regular } from "@expo-google-fonts/arvo";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const { width, height } = Dimensions.get("window");
const Startup = ({ navigation }) => {
  const [sliderState, setSliderState] = useState(0);
  const [appIsReady, setAppIsReady] = useState(false);

  const setSliderPage = (event) => {
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== sliderState) {
      setSliderState(indexOfNextScreen);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({ Arvo_400Regular });
      } catch {
        // handle error
      } finally {
        setAppIsReady(true);
      }
    })();
  }, []);

  const onLayout = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={{ flex: 1 }}
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          setSliderPage(event);
        }}
      >
        <View onLayout={onLayout} style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../../assets/logo.png")}
          />
          <Text style={styles.motto}>comfortable conversations</Text>
        </View>
        <View style={[styles.container, styles.blue]}>
          <Text style={styles.header}>Ease of Access</Text>
          <Text style={styles.subHeader}>No Account Necessary</Text>
          <Text style={styles.subHeader}>Just Start a Conversation</Text>
          <Text style={styles.subHeader}>
            {"Cost free...\nand always ad-free"}
          </Text>
        </View>
        <View style={[styles.container, styles.red]}>
          <Text style={styles.header}>Simple Privacy</Text>
          <Text style={styles.subHeader}>No required personal data</Text>
          <Text style={styles.subHeader}>Optional anonymity</Text>
          <Text style={styles.subHeader}>Complete profile security</Text>
        </View>
        <View style={[styles.container, styles.gray]}>
          <Text style={styles.header}>Let's get started...</Text>
          <TouchableOpacity
            style={[styles.red, styles.signupButton]}
            onPress={() => navigation.navigate("SignupID")}
          >
            <Text style={styles.subHeader}>create account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.orange, styles.signupButton]}
            onPress={() => navigation.navigate("SignupID")}
          >
            <Text style={styles.subHeader}>or not (id sign in)</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.paginationWrapper}>
        {Array.from(Array(4).keys()).map((key, index) => (
          <View
            style={[
              styles.paginationDots,
              { opacity: sliderState === index ? 1 : 0.2 },
            ]}
            key={index}
          />
        ))}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  signupButton: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 75,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "white",
    alignItems: "center",
    width,
  },
  motto: {
    marginTop: 200,
    fontFamily: "Arvo_400Regular",
    fontSize: 25,
  },
  logo: {
    width: 300,
    height: 300,
    marginTop: 150,
  },
  paginationWrapper: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: "black",
    marginLeft: 10,
  },
  header: {
    fontFamily: "Arvo_400Regular",
    fontSize: 40,
    marginTop: 200,
    marginBottom: 200,
  },
  subHeader: {
    fontFamily: "Arvo_400Regular",
    fontSize: 25,
    textAlign: "center",
    padding: 10,
  },
  blue: {
    backgroundColor: "#BDE4F4",
  },
  red: {
    backgroundColor: "#F4CBC2",
  },
  gray: {
    backgroundColor: "#404969",
    textColor: "white",
  },
  orange: {
    backgroundColor: "#DC552C",
  },
});

export default Startup;
