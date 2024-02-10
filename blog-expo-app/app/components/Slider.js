import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import AppHeading from "./AppHeading";

const width = Dimensions.get("window").width - 20;
let currentSlideIndex = 0;
let intervalId;

export default function Slider({ title, data, onSlidePress }) {
  const [visibleSlideIndex, setVisibleSlideIndex] = useState(0);
  const [dataToRender, setDataToReder] = useState([]);
  const [indexToRenderIndicator, setIndexToRenderIndicator] = useState(0);

  const flatList = useRef();

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    currentSlideIndex = viewableItems[0]?.index || 0;
    setVisibleSlideIndex(currentSlideIndex);
  });

  const viewableConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });

  const startSlide = () => {
    if (currentSlideIndex <= dataToRender.length - 2) {
      intervalId = setInterval(() => {
        flatList.current.scrollToIndex({
          index: currentSlideIndex + 1,
        });
      }, 4000);
    } else {
      pauseSlider();
    }
  };

  const pauseSlider = () => {
    clearInterval(intervalId);
  };

  const handleScrollTo = (index) => {
    flatList.current?.scrollToIndex({
      index,
      animated: false,
    });
  };

  // updating the dataToRender on the first render
  useEffect(() => {
    const newData = [[...data].pop(), ...data, [...data].shift()];
    setDataToReder(newData);
  }, [data]);

  //starting the slider after dataToRender is ready
  useEffect(() => {
    if (flatList.current && dataToRender.length) {
      startSlide();
    }

    return () => {
      pauseSlider();
    };
  }, [dataToRender.length]);

  // changing slide index and updating the state to update indecators
  useEffect(() => {
    const length = dataToRender.length;

    // reseting to last index
    if (visibleSlideIndex === 0 && length) handleScrollTo(length - 2);
    // reseting to first index
    if (visibleSlideIndex === length - 1 && length) handleScrollTo(1);

    const lastSlide = currentSlideIndex === length - 1;
    const firstSlide = currentSlideIndex === 0;

    if (length && lastSlide) setIndexToRenderIndicator(0);
    else if (length && firstSlide) setIndexToRenderIndicator(length - 2);
    else setIndexToRenderIndicator(currentSlideIndex - 1);
  }, [visibleSlideIndex]);

  return (
    <View
      style={{
        alignSelf: "center",
        width,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 5,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "700", color: "#383838" }}>
          {title}
        </Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <SlideIndicators
            slides={data}
            currentIndex={indexToRenderIndicator}
          />
        </View>
      </View>
      <FlatList
        ref={flatList}
        data={dataToRender}
        initialScrollIndex={1}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onScrollBeginDrag={pauseSlider}
        onScrollEndDrag={startSlide}
        onEndReachedThreshold={0.5}
        horizontal
        pagingEnabled
        keyExtractor={(item, index) => item.id + index}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{}}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewableConfig.current}
        renderItem={({ item }) => {
          const { title, thumbnail } = item;
          return (
            <TouchableWithoutFeedback onPress={() => onSlidePress(item)}>
              <View>
                <Image
                  loadingIndicatorSource={require("../../assets/dummy.png")}
                  style={styles.slides}
                  source={{ uri: thumbnail }}
                />
                <View style={{ width, marginTop: 5 }}>
                  <AppHeading text={title} numberOfLines={2} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
    </View>
  );
}

const SlideIndicators = ({ slides, currentIndex }) => {
  return slides.map((item, index) => (
    <View
      key={item.id}
      style={[
        styles.slideIndicator,
        {
          backgroundColor: currentIndex === index ? "#383838" : "transparent",
        },
      ]}
    />
  ));
};

const styles = StyleSheet.create({
  slideIndicator: {
    width: 12,
    height: 12,
    borderWidth: 2,
    borderRadius: 6,
    borderColor: "#383838",
    backgroundColor: "transparent",
    marginLeft: 5,
  },
  slides: {
    width: width,
    height: width / 1.7,
    borderRadius: 7,
  },
});
