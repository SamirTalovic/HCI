import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TextInput } from "react-native";
import Constants from "expo-constants";
import { getSinglePost, searchPost } from "../api/post";
import PostListItem from "../components/PostListItem";
const Search = ({ navigation }) => {
  const [query, setQuery] = useState();
  const [results, setResults] = useState([]);

  const handleOnChange = (text) => {
    setQuery(text);
  };
  const handleOnSubmit = async () => {
    const { posts, error } = await searchPost(query);
    if (error) return console.log(error);

    setResults(posts);
  };

  const handleOnPostPress = async (postSlug) => {
    const { post, error } = await getSinglePost(postSlug);
    if (error) return console.log(error);
    navigation.navigate("PostDetail", { post });
  };

  return (
    <View
      style={{
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 10,
        flex: 1,
      }}
    >
      <TextInput
        onSubmitEditing={handleOnSubmit}
        style={{
          borderWidth: 2,
          padding: 5,
          fontSize: 16,
          borderRadius: 5,
          borderColor: "#383838",
        }}
        placeholder="Search..."
        onChangeText={handleOnChange}
      />
      <View style={{ flex: 1, marginTop: 15 }}>
        <ScrollView>
          {results.map((post) => (
            <View key={post.id} style={{ marginTop: 10 }}>
              <PostListItem
                onPress={() => handleOnPostPress(post.slug)}
                post={post}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Search;
