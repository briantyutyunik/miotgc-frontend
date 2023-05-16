import React, { useState, useEffect } from "react";
import { Dimensions, View, Text, TouchableOpacity, TextInput, ScrollView, Share, Modal, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Background from "../../components/UI/BackgroundUnsafe";
import Card from "../../components/UI/CardDarker";
import { listenGroupName, getCurrentUserProfilePicture } from "../../firebase";
import { useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "../../components/UI/Button";
import { getFirestore } from "firebase/firestore";
import { testGPT } from "../../util/api/openaiApi";
import { updateGroupName, addTestUsersToGroup, getGroupMembers, storeAiGeneratedResponse, getTripByGroupId } from "../../firebase";
import FlightHeadline from "../../components/UI/FlightsCard/FlightHeadline";
import AuthInput from "../../components/Auth/Sign In/AuthInput";
import { PRIMARY_COLOR } from "../../constants/styles";
import Logo from "../../components/UI/Logo";
import LoadingMessage from "../../components/UI/LoadingMessage";
import CardSwipeFlights from "../../components/UI/FlightsCard/CardSwipeFlights";
import HotelHeadline from "../../components/UI/HotelCard/HotelHeadline";
import HotelCard from "../../components/UI/HotelCard/HotelCard";
import ItineraryCard from "../../components/UI/ItineraryCard/ItineraryCard";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function Group() {
	useEffect(() => {
		console.log("hello world");
	}, []);
	const QUESTIONS = [
		{ field: "groupCount", question: "Question 1", text: "How many travelers are in your group?" },
		{ field: "ageGroup", question: "Question 2", text: "Whats the age range of your group members" },
		{ field: "destination", question: "Question 3", text: "Where are you planning to travel?" },
		{ field: "dates", question: "Question 4", text: "What dates do you have in mind?" },
		{ field: "budget", question: "Question 5", text: "What is your budget for this trip?" },
		{ field: "departureCity", question: "Question 6", text: "What city do you wish to depart from?" },
		{ field: "departureAirport", question: "Question 7", text: "What airport do you plan to depart from?" },
	];
	const navigation = useNavigation();
	const route = useRoute();
	// const initialGroupName = route.params.groupName;
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const initialGroupName = route.params.initialGroupName;
	const isNewGroupParam = route.params?.isNewGroup || false;
	const [isNewGroup, setIsNewGroup] = useState(isNewGroupParam);
	const [isEditingGroupName, setIsEditingGroupName] = useState(false);
	// const [groupName, setGroupName] = useState(initialGroupName);
	// for testing. this groupName will be replaced with the one above
	const [groupName, setGroupName] = useState(route.params.groupName);
	const groupId = route.params.groupId;
	const groupImage = route.params.groupImage
	const [groupMembers, setGroupMembers] = useState([]);
	const [aiGeneratedResponse, setAiGeneratedResponse] = useState({});
	const [tripData, setTripData] = useState(null);

	const [showShareModal, setShowShareModal] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const [accommodation, setAccommodation] = useState(null);
	const [activities, setActivities] = useState(null);
	const [flightInfoOut, setFlightInfoOut] = useState(null);
	const [flightInfoBack, setFlightInfoBack] = useState(null);

	const [answers, setAnswers] = useState(
		QUESTIONS.map((question) => ({
			[question.field]: "",
			questionIndex: question.question,
		}))
	);

	const [testGroupMembers, setTestGroupMembers] = useState([]);

	const fetchTripData = async () => {
		console.log("********GROUPAVATAR*********", groupImage)
		console.log("********GROUPID*********", groupId)

		try {
			console.log("Calling getTripByGroupId...");
			const trip = await getTripByGroupId(groupId);
			console.log(trip);
			console.log("getTripByGroupId called.");
			if (trip === null) {
				console.log("No trip found for group ID: ", groupId);
				setTripData({});
			} else {
				console.log("Trip found: ", trip);
				setTripData(trip);
				// Separate out the data
				setAccommodation(trip.Accommodation);

				// Create a variable to hold the day keys that start with "Day"
				let tripDays = Object.keys(trip).filter((key) => key.startsWith("Day"));

				// Sort the days in order
				tripDays.sort();

				// Create an array of day activities
				let dayActivities = tripDays.map((dayKey) => trip[dayKey]);

				setActivities(dayActivities);
				setFlightInfoOut(trip.FlightInformationOut);
				setFlightInfoBack(trip.FlightInformationBack);
				//console.log("+_+_+_+_+_+_+_ "+trip.FlightInformationOut.Airline);
			}
		} catch (error) {
			console.error("Error fetching trip data:", error);
		}
		console.log("********GROUPAVATAR*********")
	};
	useEffect(() => {
		console.log("useEffect hook running");
		fetchTripData();
	}, [groupId]);

	useEffect(() => {
		async function fetchData() {
			//await addTestUsersToGroup();
			const members = await getGroupMembers("zd2NVCOdmjyXuuamF7sQ");
			setGroupMembers(members);
			// console.log("*******GROUP MEMBER FIRST NAME******: ", members);
		}
		fetchData();
	}, []);

	async function handleGroupImageUpload(image) {
		const currUserUid = auth.getAuth().currentUser?.uid;
		const imageName = generateImageName();
		await uploadImage(image, imageName);
		if (currUserUid) {
		  try {
			// upload image to firebase storage
			// update user's avatar url
			updateGroup(groupId, {groupUrl: imageName});
		  } catch (err) {
			console.log(err);
		  }
		} else if (image) {
		  // callback to SignUpScreen in the case that a user is not yet Signed up but
		  // their image needs to be uploaded to firebase
		  setImageName(imageName);
		}
	  }

	// *** THIS DOESN'T WORK FOR SOME REASON WILL FIX LATER ***
	// const copyToClipboard = () => {
	//   Clipboard.setString(`exp://exp.host/@tahir13/miotgc/group/${groupId}`);
	// };

	// *** THIS IS TO TEST THE GROUP MEMBERS FUNCTIONALITY ***
	// useEffect(() => {
	//   async function fetchData() {
	//     // await addTestUsersToGroup();
	//     const members = await getGroupMembers("fCo0N3buHNjoKVSMOVJ7");
	//     setTestGroupMembers(members);
	//     console.log("*******GROUP MEMBER FIRST NAME******: ", members);
	//   }

	//   fetchData();
	// }, []);

	useEffect(() => {
		async function fetchGroupMembers() {
			const members = await getGroupMembers(groupId);
			const promises = members.map((member) => getCurrentUserProfilePicture(member.uid));
			const pfpUrls = await Promise.all(promises);
			console.log("PFP URLS:", pfpUrls);
			const membersWithPfp = members.map((member, index) => ({
				...member,
				pfpUrl: pfpUrls[index],
			}));
			console.log(membersWithPfp);
			console;
			setGroupMembers(membersWithPfp);
		}
		fetchGroupMembers();
	}, []);

	const handleShare = async () => {
		// exp://exp.host/@yourusername/your-app-slug/some-path
		// exp://exp.host/@tahir13/miotgc/group/{groupId}
		try {
			const result = await Share.share({
				message: `Your invite link: exp://exp.host/@tahir13/miotgc/group/${groupId}`,
			});
			if (result.action === Share.sharedAction) {
				console.log("Link shared successfully");
			} else {
				console.log("Link sharing canceled");
			}
		} catch (error) {
			console.error("Error sharing link: ", error);
		}
	};

	const handleSubmitButtonPress = async () => {
		console.log("ANSWER:", inputValue);
		const tempAnswers = [...answers];
		tempAnswers[currentQuestionIndex] = {
			...tempAnswers[currentQuestionIndex],
			[QUESTIONS[currentQuestionIndex].field]: inputValue,
		};

		if (currentQuestionIndex < QUESTIONS.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			setIsLoading(true); // Start loading before making the request
			console.log("Submitting answers...");
			console.log(answers);
			try {
				await testGPT(answers).then(async (aiGeneratedResponse) => {
					await storeAiGeneratedResponse(groupId, aiGeneratedResponse);
					setIsNewGroup(false);
					await fetchTripData();
					setIsLoading(false);
				});
			} catch (error) {
				console.error("Error in handleSubmitButtonPress:", error);
			}
		}
		setAnswers(tempAnswers);
		setInputValue(""); // Reset the input value for the next question
	};

	function answerFieldChangeHandler(text) {
		setInputValue(text);
	}

	const handleEditGroupName = () => {
		setIsEditingGroupName(!isEditingGroupName);
		setIsNewGroup(false);
	};

	const groupNameUpdate = async (newGroupName) => {
		if (newGroupName === initialGroupName) {
			return;
		}
		console.log("Updating group name with groupId:", groupId, "and newGroupName:", newGroupName); // Add this line
		try {
			await updateGroupName(groupId, newGroupName);
			console.log("Group name updated successfully");
			setGroupName(newGroupName);
		} catch (error) {
			console.error("Error updating group name:", error);
		}
	};
	const closeModal = () => {
		setShowShareModal(false);
	};
	
	return (
		<Background additionalStyle={styles.container}>
			<ScrollView>
				<View style={styles.itinerariesContainer}>
					{!isNewGroup ? (
						<>
							<View style={styles.destinationImgContainer}>
								<Image source={{uri: groupImage}} style={[styles.destinationsImg]} />
									<TouchableOpacity onPress={() => navigation.goBack()}>
										<FontAwesome zIndex={1} position="absolute" left={15} top={-370} name="arrow-left" size={35} color="#ffffff" paddingLeft="3%" />
									</TouchableOpacity>
								</View>
							{isEditingGroupName ? (
								<View style={styles.groupNameContainer}>
									<TextInput
										style={styles.groupName}
										value={groupName}
										onChangeText={(text) => setGroupName(text)}
										onSubmitEditing={() => {
											groupNameUpdate(groupName);
											setIsEditingGroupName(false);
										}}
										onBlur={() => {
											groupNameUpdate(groupName);
											setIsEditingGroupName(false);
										}}
										autoFocus={true}
									/>
								</View>
							) : (
								<>
									<View style={styles.groupNameContainerOuter}>
										<View style={styles.groupNameContainer}>
											<Text style={styles.groupName} numberOfLines={2} ellipsizeMode="tail">
												{Platform.OS === "ios" ? "\u{1F9F3}" : "\u{F9F3}"}
												{groupName}
											</Text>
											<TouchableOpacity onPress={handleEditGroupName}>
												<Icon name="pencil" marginLeft={15} size={35} color="white" />
											</TouchableOpacity>
										</View>
									</View>
									<Card additionalStyles={styles.groupMembersCard}>
										<View style={styles.groupMembersRow}>
											{groupMembers.map((member, index) => (
												<View key={index} style={styles.groupMember}>
													<Image source={{ uri: member.pfpUrl }} style={styles.profilePhoto} />
												</View>
											))}
											<View style={styles.addNewGroupMemberContainer}>
												<TouchableOpacity
													onPress={() => {
														setShowShareModal(true);
													}}>
													<Ionicons name="add" size={35} color={PRIMARY_COLOR} style={styles.icon} />
												</TouchableOpacity>
											</View>
										</View>
									</Card>
								</>
							)}

							<FlightHeadline />
							<CardSwipeFlights flightInfoOut={flightInfoOut} flightInfoBack={flightInfoBack} />
							<HotelHeadline />
							<HotelCard accommodation={accommodation} />
							<ItineraryCard navigation={navigation} activities={activities} />

							<Button
								textColor={"white"}
								iconName={"chevron-forward-sharp"}
								iconSize={30}
								iconColor={"white"}
								fontSize={24}
								containerStyle={styles.completeButton}
								title={"Complete Trip"}
							/>
						</>
					) : (
						<View style={styles.containerProg}>
							<View style={styles.newGroupContainer}>
								<View style={styles.surveyCard}>
									<Text style={styles.itinerarySurveyText}>
										Itinerary Survey
										{Platform.OS === "ios" ? "\u270F\ufe0f" : "\u270F\ufe0f"}
									</Text>
									<View style={styles.progressBarContainer}>
										<LinearGradient
											start={{ x: 0, y: 0 }}
											end={{ x: 1, y: 0 }}
											colors={["#ff8583", "#ff5553", "#ff4542"]}
											style={{ backgroundColor: "transparent", height: 8, borderRadius: 100, width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
										/>
									</View>
									<Text style={[styles.textStyle, styles.surveyQuestion]}>{QUESTIONS[currentQuestionIndex].text}</Text>
									<TextInput style={styles.input} value={inputValue} onChangeText={answerFieldChangeHandler} placeholder="Answer Here" caretColor="red" />
									<View style={styles.submitBtnContainer}>
										<Button
											textColor={"white"}
											iconName={"chevron-forward-sharp"}
											iconSize={30}
											iconColor={"white"}
											fontSize={24}
											containerStyle={styles.submitBtn}
											title={currentQuestionIndex === QUESTIONS.length - 1 ? "Submit" : "Next"}
											onPress={handleSubmitButtonPress}
										/>
										{isLoading && (
											<Modal
												animationType="fade"
												transparent={false}
												visible={isLoading}
												onRequestClose={() => {
													console.log("Modal has been closed.");
												}}>
												<View style={styles.loadingModal}>
													<LoadingMessage />
												</View>
											</Modal>
										)}
									</View>
								</View>
							</View>
						</View>
					)}
				</View>

				{/* // *** THIS WILL BE ADDED TO THE GROUP MEMBERS CARD *** */}
			</ScrollView>
			<Modal animationType="slide" transparent={true} visible={showShareModal} onRequestClose={closeModal}>
				<TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={closeModal}>
					<View style={styles.centeredView}>
						<TouchableOpacity activeOpacity={1} onPress={() => {}}>
							<View style={styles.modalView}>
								<View style={styles.linkInputContainer}>
									<TextInput style={styles.linkInput} value={`exp://exp.host/@tahir13/miotgc/group/${groupId}`} editable={false} />
									<TouchableOpacity
										style={styles.copyButtonInInput}
										// onPress={copyToClipboard}
									>
										<Text style={styles.copyButtonTextInInput}>Copy</Text>
									</TouchableOpacity>
								</View>
								<TouchableOpacity
									style={styles.copyButton}
									onPress={() => {
										handleShare();
									}}>
									<Text style={styles.copyButtonText}>Copy & Share</Text>
								</TouchableOpacity>
							</View>
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
			</Modal>
		</Background>
	);
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = {
	destinationsImg: {
		zIndex: 0,
		width: "100%",
		height: undefined,
		aspectRatio: 0.9,
	},
	destinationImgContainer: {
		shadowColor: "#000000",
		shadowOffset: {
			width: 1,
			height: 5,
		},
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 4,
	},
	itineraryTextContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	itineraryText: {
		fontSize: 30,
		marginRight: "5%",
		color: "black",
	},
	sectionsCard: {
		marginVertical: "10%",
		height: "auto",
		width: "90%",
	},
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	newGroupContainer: {
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	surveyCard: {
		width: "90%",
	},
	textStyle: {
		color: PRIMARY_COLOR,
		textAlign: "left",
	},
	submitBtnContainer: {
		height: 50,
		top: 10,
		backgroundColor: "#fff",
		borderRadius: 100,
		alignItems: "flex-end",
		justifyContent: "flex-end",
		width: "100%",
		marginBottom: "10%",
	},
	groupName: {
		color: "white",
		fontSize: 32,
		marginLeft: 8,
		fontWeight: "bold",
	},
	container: {
		alignItems: "center",
	},
	// open modal button styles
	openModalButton: {
		backgroundColor: PRIMARY_COLOR,
		borderRadius: 10,
		padding: 10,
		paddingHorizontal: 20,
		marginTop: 20,
	},
	openModalButtonText: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		width: "90%",
	},
	surveyQuestion: {
		marginBottom: "25%",
		fontSize: 40,
	},
	linkInput: {
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 5,
		padding: 5,
		width: 300,
		marginBottom: 20,
	},
	copyButton: {
		backgroundColor: PRIMARY_COLOR,
		borderRadius: 10,
		padding: 10,
		paddingHorizontal: 20,
	},
	copyButtonText: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	itinerarySurveyText: {
		color: "#000000",
		fontSize: 37,
		fontWeight: "800",
		marginBottom: "8%",
		marginTop: "2%",
	},
	linkInputContainer: {
		flexDirection: "row",
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 5,
		padding: 5,
		width: 300,
		marginBottom: 20,
	},
	linkInput: {
		flex: 1,
	},
	copyButtonInInput: {
		backgroundColor: PRIMARY_COLOR,
		borderRadius: 5,
		padding: 5,
		paddingHorizontal: 10,
	},
	copyButtonTextInInput: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	groupMembersCard: {
		alignItems: "center",
		marginTop: 0,
		width: "95%",
		height: "12%",
	},
	itinerariesContainer: {
		width: "100%",
		alignItems: "center",
	},
	profilePhoto: {
		width: 60,
		height: 60,
		borderRadius: 100,
		borderWidth: 4,
		borderColor: "white",
		marginBottom: 10,
		alignSelf: "center",
	},
	groupMembersRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "start",
		height: "auto",
	},
	groupMember: {
		alignItems: "center",
		margin: 5,
	},
	addNewGroupMemberContainer: {
		width: 55,
		height: 55,
		borderRadius: 30,
		backgroundColor: "white",
		margin: 5,
		marginBottom: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		shadowColor: "#000000",
		shadowOffset: {
			width: 2,
			height: 4,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3,
		elevation: 4,
		padding: 0,
		marginLeft: 2, // Adjust this value based on your requirements
	},
	groupNameContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		flex: 1,
	},
	groupNameContainerOuter: {
		marginTop: "7%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.4,
		shadowRadius: 3.84,
		elevation: 5,
	},
	containerProg: {
		marginTop: "25%",
		width: windowWidth - 15,
		height: windowHeight - 275,
		flex: 1,
	},
	progressBarContainer: {
		backgroundColor: "#f9dbdb",
		height: 8,
		marginBottom: 30,
		borderRadius: 100,
	},
	newGroupContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	surveyCard: {
		width: "98%",
		height: "100%",
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		shadowColor: "#000000",
		shadowOffset: {
			width: 2,
			height: 4,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		elevation: 4,
	},
	textStyle: {
		color: "black",
		fontWeight: "500",
		fontSize: 18,
		marginBottom: 10,
	},
	input: {
		backgroundColor: "#ffffff",
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderRadius: 10,
		borderColor: "#eaeaea",
		borderWidth: 1,
		marginBottom: 0,
		fontSize: 24,
		shadowColor: "black",
		shadowOffset: {
			width: 3,
			height: 4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 7,
		elevation: 5,
	},
	submitBtnContainer: {
		marginTop: 40,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
		alignContent: "center",
	},
	submitBtn: {
		justifyContent: "center",
		alignContent: "center",
		backgroundColor: "#fc706eff",
		borderRadius: 10,
		paddingHorizontal: "40%",
		paddingVertical: "3.5%",
	},
	loadingModal: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	completeButton: {
		marginTop: 40,
		marginBottom: 100,
		justifyContent: "center",
		alignContent: "center",
		backgroundColor: "#ff4340ff",
		borderRadius: 10,
		paddingHorizontal: "20%",
		paddingVertical: "3.5%",
	},
};
