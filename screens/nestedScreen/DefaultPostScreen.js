import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
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
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const DefaultScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const avatar = useSelector(selectAvatar);
  const nikename = useSelector(selectNikename);
  const email = useSelector(selectEmail);
  const userId = useSelector(selectUserId);

  const getPosts = async () => {
    try {
      const postsData = collection(db, "posts");
      onSnapshot(postsData, (snapshot) => {
        const sortedPosts = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(sortedPosts);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image style={styles.avatarImg} source={{ uri: avatar }} />
        <View>
          <Text style={styles.avatarName}>{nikename}</Text>
          <Text style={styles.avatarEmail}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.photo }} style={styles.image} />
            </View>
            <Text style={styles.postTitle}>{item.postName}</Text>
            <View style={styles.postsWrapper}>
              <TouchableOpacity
                style={styles.directionRow}
                onPress={() => navigation.navigate("Comment", item)}
              >
                <FontAwesome name="comment-o" size={24} color="black" />
                <Text style={styles.commentText}>0</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.directionRow}
                onPress={() =>
                  navigation.navigate("Map", { location: item.postLocation })
                }
              >
                <SimpleLineIcons name="location-pin" size={24} color="black" />
                <Text style={styles.locationText}>{item.postAddress}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
  },
  avatarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarImg: {
    width: 60,
    height: 60,
    marginRight: 8,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  avatarName: {
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  avatarEmail: {
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  postItem: {
    marginBottom: 16,
  },
  image: {
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 8,
    height: 240,
    width: "100%",
    backgroundColor: "#f6f6f6",
  },
  postTitle: {
    fontWeight: 500,
    fontSize: 16,
    marginBottom: 8,
    color: "#212121",
  },
  directionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  postsWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  commentText: {
    fontSize: 16,
    marginLeft: 8,
    color: "#bdbdbd",
  },
  locationText: {
    fontSize: 16,
    textDecorationLine: "underline",
    marginLeft: 4,
    color: "#212121",
  },
});

export default DefaultScreen;
