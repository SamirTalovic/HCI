import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { getRelatedPosts } from "../api/post";
import PostListItem from "./PostListItem";

const RenderRelatedPosts = ({ postId, onPostPress }) => {
  const [posts, setPosts] = useState([]);

  const fetchRelatedPosts = async () => {
    const { error, posts } = await getRelatedPosts(postId);
    if (error) return console.log(error);
    setPosts(posts);
  };

  useEffect(() => {
    fetchRelatedPosts();
  }, []);

  return posts.map((post) => {
    return (
      <View key={post.id} style={styles.container}>
        <PostListItem onPress={() => onPostPress(post)} post={post} />
      </View>
    );
  });
};

const styles = StyleSheet.create({
  container: { marginVertical: 5 },
});

export default RenderRelatedPosts;
