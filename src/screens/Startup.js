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
} from "react-native";
import { Arvo_400Regular } from "@expo-google-fonts/arvo";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import StartupSlide from "../components/StartupSlide";

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
          <TouchableOpacity
            style={styles.loginLinkButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginLink}>
              {"already have an account?\nlogin here"}
            </Text>
          </TouchableOpacity>
        </View>
        <StartupSlide
          header="ease of access"
          subheader1="no account necesary"
          subheader2={"cost free...\nand always ad-free"}
          isRed={false}
        />
        <StartupSlide
          header="simple privacy"
          subheader1="no required personal data"
          subheader2="optional anonymity"
          subheader3="complete profile security"
          isRed
        />
        <View style={[styles.container, styles.gray]}>
          <Text style={styles.header}>Let's get started...</Text>
          <TouchableOpacity
            style={[styles.red, styles.signupButton]}
            onPress={() => navigation.navigate("SignupProfile")}
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
  loginLinkButton: {
    marginTop: 20,
  },
  loginLink: {
    textAlign: "center",
    fontFamily: "Arvo_400Regular",
    fontSize: 20,
    color: "#DC552C",
  },
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
