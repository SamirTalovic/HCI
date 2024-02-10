import client from "./client";

export const getFeaturedPosts = async () => {
  try {
    const { data } = await client("/post/featured-posts");
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const getLatestPosts = async () => {
  try {
    const { data } = await client("/post/latest-posts");
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const getSinglePost = async (postSlug) => {
  try {
    const { data } = await client("/post/single/" + postSlug);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const getRelatedPosts = async (postId) => {
  try {
    const { data } = await client("/post/related-posts/" + postId);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const getPosts = async (pageNo, limit) => {
  try {
    const { data } = await client(
      `/post/posts?pageNo=${pageNo}&limit=${limit}`
    );

    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const searchPost = async (query) => {
  try {
    const { data } = await client("/post/search?title=" + query);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
