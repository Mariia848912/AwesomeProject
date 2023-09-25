import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  Keyboard,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { useSelector } from "react-redux";
import {
  selectAvatar,
  selectNikename,
  selectEmail,
  selectUserId,
} from "../../redux/auth/selectors";
import {
  collection,
  doc,
  addDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import { Feather } from "@expo/vector-icons";

const CommentScreen = ({ route, navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const avatar = useSelector(selectAvatar);
  const nikename = useSelector(selectNikename);
  const email = useSelector(selectEmail);
  const userId = useSelector(selectUserId);

  // console.log("comment route", route);
  const { id: postId, photo, userId: ownerId } = route.params;

  const createComment = async () => {
    const date = new Date().toLocaleDateString("uk-UA");
    const time = new Date().toLocaleTimeString();

    const postDocRef = await doc(db, "posts", postId);
    const newComment = {
      timePublished: Date.now().toString(),
      comment,
      nikename,
      email,
      avatar,
      date,
      time,
    };

    await addDoc(collection(postDocRef, "comments"), newComment);
    await updateDoc(postDocRef, {
      comments: [...comments, newComment],
    });
  };

  const getAllComments = async () => {
    const postDocRef = await doc(db, "posts", postId);
    onSnapshot(collection(postDocRef, "comments"), (snapshot) => {
      const allComments = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const sortedComments = [...allComments].sort((a, b) => {
        const dateA = a.timePublished;
        const dateB = b.timePublished;
        return dateA - dateB;
      });
      return setComments(sortedComments);
    });
  };

  useEffect(() => {
    getAllComments();
  }, [userId, postId]);

  const handleSendComment = () => {
    if (!comment.trim()) {
      Alert.alert(`Введіть коментар `);
      return;
    }
    createComment();
    Keyboard.dismiss();
    setComment("");
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image style={styles.postImage} source={{ uri: photo }} />
        </View>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={keyboardHide}>
              <View style={styles.wrapper}>
                <View>
                  <Image style={styles.avatar} source={{ uri: item.avatar }} />
                </View>
                <View style={styles.commentWrapper}>
                  <Text style={styles.comments}>{item.comment}</Text>

                  <Text style={styles.commentDate}>
                    {item.date} | {item.time}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            multiline={true}
            selectionColor="#FF6C00"
            blurOnSubmit={true}
            placeholderTextColor="#BDBDBD"
            placeholder="Comment..."
            value={comment}
            onChangeText={(value) => setComment(value)}
            onBlur={() => {
              setIsShowKeyboard(false);
            }}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSendComment}>
            <Feather name="arrow-up" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
    backgroundColor: "#ffffff",
  },
  imageWrapper: {
    borderRadius: 8,
    height: 240,
    alignItems: "center",
    marginBottom: 24,
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },

  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    gap: 5,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  commentWrapper: {
    marginBottom: 12,
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: "#F7F7F7",
  },

  comments: {
    width: "100%",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "left",
    marginBottom: 10,
  },

  commentDate: {
    fontSize: 10,
    lineHeight: 12,
    textAlign: "right",
  },

  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",

    marginTop: 16,
    alignSelf: "flex-end",
    width: "100%",
  },
  input: {
    paddingBottom: 16,
    paddingLeft: 16,
    paddingTop: 16,
    paddingRight: 54,

    width: "100%",
    height: 50,

    fontSize: 16,
    lineHeight: 19,
    textAlignVertical: "top",

    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 20,
    backgroundColor: "#F7F7F7",
  },
  sendBtn: {
    position: "absolute",
    top: 8,
    right: 15,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#FF6C00",
    borderRadius: 50,
    width: 34,
    height: 34,
  },
});

export default CommentScreen;
