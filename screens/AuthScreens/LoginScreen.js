import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback, // імпорт компонента обгортки
  Keyboard, // імпорт компонента клавіатури
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";
import { authStateChange } from "../../redux/auth/authReducer";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isShow, setShow] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      " keyboardDidShow",
      () => {
        setIsShowKeyboard(true);
      }
    );

    const keyvoardDidHideListener = Keyboard.addListener(
      " keyboardDidShow",
      () => {
        setIsShowKeyboard(false);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyvoardDidHideListener.remove();
    };
  }, []);

  const focusOnEmail = () => {
    setIsFocusedEmail(true);
  };
  const focusOnPassword = () => {
    setIsFocusedPassword(true);
  };
  const keyboardHide = () => {
    Keyboard.dismiss();
  };
  const submitForm = () => {
    const { email, password } = state;
    navigation.navigate("Home", { user: { email, password } });
    Keyboard.dismiss();
    dispatch(authSignInUser(state));
    dispatch(authStateChange({ stateChange: true }));
    console.log(state);
    setState(initialState);
  };

  const showPassword = () => {
    setShow((isShow) => !isShow);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/bg.jpg")}
          style={styles.image}
        >
          {/* <KeyboardAvoidingView // визначаємо ОС та налаштовуємо поведінку клавіатури
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          > */}
          <View style={styles.form}>
            <View>
              <View></View>
            </View>
            <Text style={styles.title}>Увійти</Text>

            <View style={{ marginBottom: 16 }}>
              <TextInput
                style={[
                  styles.input,
                  isFocusedEmail && { borderColor: "#FF6C00" },
                ]}
                placeholder="Адреса електронної пошти"
                onFocus={focusOnEmail}
                onBlur={() => setIsFocusedEmail(false)}
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              />
            </View>
            <View style={{ marginBottom: 43, position: "relative" }}>
              <TextInput
                style={[
                  styles.input,
                  isFocusedPassword && { borderColor: "#FF6C00" },
                ]}
                placeholder="Пароль"
                secureTextEntry={isShow}
                onFocus={focusOnPassword}
                onBlur={() => setIsFocusedPassword(false)}
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
              />
              <TouchableOpacity activeOpacity={0.8} style={styles.showBtn}>
                <Text style={styles.textShowBtn} onPress={showPassword}>
                  Показати
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.8}
              onPress={submitForm}
            >
              <Text style={styles.btnTitle}>Увійти</Text>
            </TouchableOpacity>
            <View
              style={{
                ...styles.wrapLogIn,
                marginBottom: isShowKeyboard
                  ? Platform.OS === "ios"
                    ? 20
                    : 190
                  : 111,
              }}
            >
              <Text style={styles.textLogIn}>Немає акаунту?</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Registration")}
              >
                <Text
                  style={{
                    ...styles.textLogIn,
                    textDecorationLine: "underline",
                  }}
                  textDecorationLine
                >
                  {" "}
                  Зареєструватися
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* </KeyboardAvoidingView> */}
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    color: "#212121",
    textAlign: "center",
    marginBottom: 33,
    marginTop: 32,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    height: "auto",
    resizeMode: "cover",
  },
  form: {
    paddingHorizontal: 16,

    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "#FFF",
  },
  input: {
    paddingTop: 16,
    paddingBottom: 15,
    paddingLeft: 16,
    paddingRight: 16,
    height: 50,

    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,

    color: "#212121",
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },

  showBtn: {
    position: "absolute",
    right: 16,
    top: 16,
    color: "#1B4371",
  },
  textShowBtn: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  btn: {
    height: 51,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  btnTitle: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  wrapLogIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textLogIn: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
  },
});
