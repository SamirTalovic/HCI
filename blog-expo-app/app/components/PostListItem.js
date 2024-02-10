import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import dateFormat from "dateformat";
import SecondaryText from "./SecondaryText";

const THUMBNAIL_WIDTH = 100;
const PostListItem = ({ post, onPress }) => {
  const [imageLoading, setImageLoading] = useState(false);
  const { title, thumbnail, author, createdAt } = post;

  const getThumbnail = (uri) => {
    if (!uri) return require("../../assets/blank.jpg");
    if (uri && imageLoading) return require("../../assets/dummy.png");

    return { uri };
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        onLoadEnd={() => setImageLoading(false)}
        source={getThumbnail(thumbnail)}
        style={styles.thumbnail}
      />
      <View style={{ flex: 1, marginLeft: 5 }}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.metaInfoContainer}>
          <SecondaryText
            text={`${dateFormat(createdAt, "mediumDate")} - ${author}`}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  thumbnail: { width: THUMBNAIL_WIDTH, height: THUMBNAIL_WIDTH / 1.7 },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#383838",
  },
  metaInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default PostListItem;
