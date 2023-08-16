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
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedName, setIsFocusedName] = useState(false);
  const [isShow, setShow] = useState(true);
  const navigation = useNavigation();
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

  const focusOnName = () => {
    setIsFocusedName(true);
  };
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
    const { name, email, password } = state;
    navigation.navigate("Home", { user: { name, email, password } });

    Keyboard.dismiss();
    setState(initialState);
    console.log(state);
  };

  const setShowPassword = () => {
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
          <View
            style={{
              ...styles.form,
              paddingBottom: isShowKeyboard
                ? Platform.OS === "ios"
                  ? 20
                  : 190
                : 60,
            }}
          >
            <View style={styles.boxAddPhoto}>
              <View style={styles.photo}>
                <View style={styles.icon}>
                  <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                </View>
              </View>
            </View>
            <Text style={styles.title}>Реєстрація</Text>
            <View style={{ marginBottom: 16 }}>
              <TextInput
                style={[
                  styles.input,
                  isFocusedName && { borderColor: "#FF6C00" },
                ]}
                placeholder="Логін"
                onFocus={focusOnName}
                onBlur={() => setIsFocusedName(false)}
                value={state.name}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, name: value }))
                }
              />
            </View>
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
                secureTextEntry={true}
                onFocus={focusOnPassword}
                onBlur={() => setIsFocusedPassword(false)}
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
              />
              <TouchableOpacity activeOpacity={0.8} style={styles.showBtn}>
                <Text style={styles.textShowBtn} onPress={setShowPassword}>
                  Показати
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.8}
              onPress={submitForm}
            >
              <Text style={styles.btnTitle}>Зареєстуватися</Text>
            </TouchableOpacity>
            <View style={styles.wrapLogIn}>
              <Text style={styles.textLogIn}>Вже є акаунт?</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.textLogIn}> Увійти</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* </KeyboardAvoidingView> */}
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

//  style={{
//                 ...styles.wrapLogIn,
//                 marginBottom: isShowKeyboard
//                   ? Platform.OS === "ios"
//                     ? 20
//                     : 190
//                   : 60,
//               }}
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
    marginTop: 92,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    height: "auto",
    resizeMode: "cover",
  },
  form: {
    position: "relative",
    paddingHorizontal: 16,

    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "#FFF",
  },
  boxAddPhoto: {
    position: "absolute",
    top: -60,
    right: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  photo: {
    position: "relative",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  icon: {
    position: "absolute",
    right: -12,
    bottom: 14,
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
