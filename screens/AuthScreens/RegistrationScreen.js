import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback, // імпорт компонента обгортки
  Keyboard, // імпорт компонента клавіатури
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import * as ImagePicker from "expo-image-picker";
import { authSignUpUser } from "../../redux/auth/operations";
import { authStateChange } from "../../redux/auth/authSlice";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/config";
import { useDispatch } from "react-redux";

export default function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedName, setIsFocusedName] = useState(false);
  const [isShow, setShow] = useState(true);

  const [avatar, setAvatar] = useState(null);
  const [nikename, setNikename] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
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
  const clearForm = () => {
    setAvatar(null);
    setNikename(null);
    setEmail(null);
    setPassword(null);
  };

  const submitForm = async () => {
    const photo = await uploadImageToServer(avatar);

    if (photo && nikename && email && password) {
      dispatch(authSignUpUser({ photo, nikename, email, password }));
      dispatch(authStateChange({ stateChange: true }));

      clearForm();
    }
    Keyboard.dismiss();
  };

  const setShowPassword = () => {
    setShow((isShow) => !isShow);
  };

  const onLoadAvatar = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Ви відмовилися дозволити цій програмі доступ до ваших фотографій");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const img = `${result.assets[0].uri}`;
      setAvatar(img);
    }
  };
  const uploadImageToServer = async (avatar) => {
    const response = await fetch(avatar)
      .then((response) => response)
      .catch((error) => console.log(error));

    const file = await response.blob();

    const uniqueImageId = Date.now().toString();
    const path = `avatar/${uniqueImageId}.jpeg`;

    const storageRef = ref(storage, path);

    const metadata = {
      contentType: "avatar/jpeg",
    };

    await uploadBytes(storageRef, file, metadata);

    const downloadPhoto = await getDownloadURL(storageRef);

    return downloadPhoto;
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
            <View style={styles.addPhoto}>
              <Image style={styles.photo} source={{ uri: avatar }} />
              <TouchableOpacity
                style={styles.iconAddTouchable}
                onPress={onLoadAvatar}
              >
                <AntDesign
                  style={styles.icon}
                  name="pluscircleo"
                  size={24}
                  color="#FF6C00"
                />
              </TouchableOpacity>
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
                value={nikename}
                onChangeText={setNikename}
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
                value={email}
                autoComplete="email"
                onChangeText={setEmail}
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
                value={password}
                onChangeText={setPassword}
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
  addPhoto: {
    width: "100%",
    position: "relative",
    top: -60,
    alignItems: "center",
  },
  photo: {
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  iconAddTouchable: {
    position: "relative",

    borderRadius: 100,
    backgroundColor: "#ffffff",
  },
  icon: {
    position: "absolute",
    bottom: -108,
    right: -72,
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
