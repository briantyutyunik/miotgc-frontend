import { StyleSheet, View } from "react-native";
import React from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import ItineraryCardMorning from "./ItineraryCardMorning";
import ItineraryCardAfternoon from "./ItineraryCardAfternoon";
import ItineraryCardEvening from "./ItineraryCardEvening";

const ItinerarySwipe = ({ activites }) => {
	const [activeIndex, setActiveIndex] = React.useState(0);
	const carouselRef = React.useRef(null);

	const renderItem = ({ item }) => {
		return <View style={styles.slide}>{item}</View>;
	};

	const handleSnapToItem = (index) => {
		setActiveIndex(index);
	};

	return (
		<View style={styles.container}>
            
			<Carousel
				layout={"stack"}
				layoutCardOffset={`18`}
				ref={carouselRef}
				data={[<ItineraryCardMorning activites={activities}/>, <ItineraryCardAfternoon activites={activities}/>, <ItineraryCardEvening activites={activities}/>]}
				renderItem={renderItem}
				sliderWidth={400}
				itemWidth={400}
				onSnapToItem={handleSnapToItem}
			/>
			<Pagination
				dotsLength={3}
				activeDotIndex={activeIndex}
				carouselRef={carouselRef}
				containerStyle={styles.paginationContainer}
				dotStyle={styles.dotStyle}
				inactiveDotStyle={styles.inactiveDotStyle}
				inactiveDotOpacity={0.6}
				inactiveDotScale={0.6}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: 10,
	},
	paginationContainer: {
		paddingVertical: 0,
	},
	slide: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	dotStyle: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: "white",
	},
	inactiveDotStyle: {
		width: 10,
		height: 10,
		borderRadius: 4,
		backgroundColor: "#A9A9A9",
	},
});

export default ItinerarySwipe;
