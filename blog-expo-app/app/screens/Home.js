import React, { useEffect, useState } from "react";
import { ScrollView, View, FlatList, StyleSheet, Text } from "react-native";
import {
  getFeaturedPosts,
  getLatestPosts,
  getPosts,
  getSinglePost,
} from "../api/post";
import Slider from "../components/Slider";
import PostListItem from "../components/PostListItem";
import Separator from "../components/Separator";
import AppHeading from "../components/AppHeading";

let pageNo = 0;
const LIMIT = 5;
const Home = ({ navigation }) => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [rechedToEnd, setRechedToEnd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFeaturedPosts = async () => {
    const { posts, error } = await getFeaturedPosts();

    if (error) return console.log(error);
    setFeaturedPosts(posts);
  };

  const fetchLatestPosts = async () => {
    const { posts, error } = await getLatestPosts();

    if (error) return console.log(error);
    setLatestPosts(posts);
  };

  const fetchMorePosts = async () => {
    if (rechedToEnd) return;

    pageNo += 1;
    const {
      posts: morePosts,
      error,
      postCount,
    } = await getPosts(pageNo, LIMIT);

    if (error) return console.log(error);
    if (latestPosts.length === postCount) return setRechedToEnd(true);

    setLatestPosts([...latestPosts, ...morePosts]);
  };

  useEffect(() => {
    fetchFeaturedPosts();
    fetchLatestPosts();
  }, []);

  const handleOnPostPress = async (postSlug) => {
    const { post, error } = await getSinglePost(postSlug);
    if (error) return console.log(error);
    navigation.navigate("PostDetail", { post });
  };

  const handleOnSlidePress = ({ slug }) => {
    handleOnPostPress(slug);
  };

  const handleOnRefresh = async () => {
    setRefreshing(true);
    await fetchFeaturedPosts();
    // await fetchLatestPosts();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginTop: 15 }}>
        <PostListItem
          post={item}
          onPress={() => handleOnPostPress(item.slug)}
        />
      </View>
    );
  };

  const renderListHeader = () => (
    <View>
      {featuredPosts.length ? (
        <Slider
          onSlidePress={handleOnSlidePress}
          title="Featured Posts"
          data={featuredPosts}
        />
      ) : null}

      <View style={{ marginTop: 15 }}>
        <Separator width="100%" />
        <AppHeading text="Latest Posts" style={{ marginTop: 15 }} />
      </View>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={renderListHeader}
      onRefresh={handleOnRefresh}
      refreshing={refreshing}
      contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
      ItemSeparatorComponent={() => (
        <Separator width="90%" style={{ marginTop: 15 }} />
      )}
      keyExtractor={(item) => item.id}
      data={latestPosts}
      renderItem={renderItem}
      onEndReached={async () => {
        await fetchMorePosts();
      }}
      onEndReachedThreshold={0}
      ListFooterComponent={() => {
        return rechedToEnd ? (
          <Text
            style={{
              fontWeight: "700",
              textAlign: "center",
              paddingVertical: 5,
            }}
          >
            You reached to the end.
          </Text>
        ) : null;
      }}
    />
  );

  return (
    <ScrollView>
      {featuredPosts.length ? (
        <Slider
          onSlidePress={handleOnSlidePress}
          title="Featured Posts"
          data={featuredPosts}
        />
      ) : null}

      <View style={{ paddingHorizontal: 10, marginTop: 15 }}>
        <Separator width="100%" />
        <AppHeading text="Latest Posts" style={{ marginVertical: 15 }} />
        {latestPosts.map((post) => {
          return (
            <View key={post.id} style={{ marginBottom: 15 }}>
              <PostListItem
                post={post}
                onPress={() => handleOnPostPress(post.slug)}
              />
              <Separator width="90%" style={{ marginTop: 15 }} />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Home;
