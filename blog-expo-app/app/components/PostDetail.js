import {
  Dimensions,
  Image,
  View,
  ScrollView,
  Alert,
  StyleSheet,
  Text,
} from "react-native";
import * as Linking from "expo-linking";
import dateFormat from "dateformat";

import AppHeading from "./AppHeading";
import SecondaryText from "./SecondaryText";
import Markdown, { renderRules } from "react-native-markdown-display";
import RenderRelatedPosts from "./RenderRelatedPosts";
import Separator from "./Separator";
import { getSinglePost } from "../api/post";

const { width } = Dimensions.get("window");

const WEBSITE_LINK = "myblog.com/blog";

export default function PostDetail({ route, navigation }) {
  const post = route.params?.post;

  const onLinkPress = async (url) => {
    if (url.includes(WEBSITE_LINK)) {
      console.log("run");
      const slug = url.split(WEBSITE_LINK + "/")[1];
      const { post, error } = await getSinglePost(slug);
      if (error) return console.log(error);
      navigation.push("PostDetail", { post });
      return false;
    }

    const res = await Linking.canOpenURL(url);
    if (res) Linking.openURL(url);
    else Alert.alert("Can't open broken link");
    return false;
  };

  const getThumbnail = (uri) => {
    if (uri) return { uri };

    return require("../../assets/blank.jpg");
  };

  const handleOnRelatedPostPress = async ({ slug }) => {
    const { post, error } = await getSinglePost(slug);
    if (error) return console.log(error);
    navigation.push("PostDetail", { post });
  };

  const markdownRules = {
    image: renderRules.image,
    paragraph: (node, children, parent, styles) => {
      return (
        <Text key={node.key} style={styles.paragraph} selectable>
          {children}
        </Text>
      );
    },
  };

  if (!post) return null;

  const { title, content, author, createdAt, tags, thumbnail } = post;

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
      <Image
        loadingIndicatorSource={require("../../assets/dummy.png")}
        source={getThumbnail(thumbnail)}
        style={styles.thumbnail}
      />
      <View style={{ padding: 10 }}>
        <AppHeading text={title} />
        <View style={styles.metaInfo}>
          <SecondaryText text={`By ${author}`} />
          <SecondaryText text={dateFormat(createdAt, "mediumDate")} />
        </View>
        <View style={styles.tagsContainer}>
          <SecondaryText text="Tags" style={{ marginRight: 5 }} />
          {tags.map((t) => (
            <SecondaryText key={t} text={`#${t}`} style={styles.tags} />
          ))}
        </View>
        <View style={{ marginTop: 15 }}>
          <Markdown
            // rules={markdownRules}
            onLinkPress={onLinkPress}
            style={markdownStyles}
          >
            {content}
          </Markdown>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <View style={{ marginBottom: 10 }}>
          <AppHeading text="Related Posts" />
        </View>
        <Separator width="100%" />
        <RenderRelatedPosts
          onPostPress={handleOnRelatedPostPress}
          postId={post.id}
        />
      </View>
    </ScrollView>
  );
}

const markdownStyles = {
  body: { fontSize: 16 },
  paragraph: {
    lineHeight: 22,
    letterSpacing: 0.8,
    color: "#545050",
  },
  list_item: {
    color: "#545050",
    paddingVertical: 5,
  },
  link: {
    color: "#7784F8",
  },
};

const styles = StyleSheet.create({
  thumbnail: { width, height: width / 1.7 },
  metaInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  tags: { marginRight: 5, color: "#7784F8" },
  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
