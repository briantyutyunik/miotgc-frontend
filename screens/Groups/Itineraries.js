import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import Background from "../../components/UI/Background";
import Card from "../../components/UI/Card";

const MyAccordionMenu = () => {
  const [activeSections, setActiveSections] = useState([]);

  const SECTIONS = [
    {
      title: "Flight",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      children: ["Section 1 Child 1", "Section 1 Child 2"],
    },
    {
      title: "Stay",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      children: ["Section 2 Child 1", "Section 2 Child 2"],
    },
    {
      title: "Activities",
      content:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      children: ["Section 3 Child 1", "Section 3 Child 2"],
    },
    {
      title: "Checklist",
      content:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      children: ["Section 3 Child 1", "Section 3 Child 2"],
    },
    {
      title: "Transportation",
      content:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      children: ["Section 3 Child 1", "Section 3 Child 2"],
    },
  ];

  const toggleSection = (index) => {
    const isActive = activeSections.includes(index);
    if (isActive) {
      setActiveSections(activeSections.filter((i) => i !== index));
    } else {
      setActiveSections([...activeSections, index]);
    }
  };

  const renderHeader = (section, index, isActive) => {
    return (
        <TouchableOpacity
          style={styles.header}
          onPress={() => toggleSection(index)}
        >
          <Text style={styles.headerText}>{section.title}</Text>
        </TouchableOpacity>
    );
    }
  const renderContent = (section) => {
    return (
        <View style={styles.content}>
          <Text>{section.content}</Text>
          {section.children.map((child, index) => (
            <Text key={index} style={styles.childText}>
              {child}
            </Text>
          ))}
        </View>
    );
  };

  return (
    <Background additionalStyle={styles.container}>
      <View style = {styles.top}>
        <Text style = {styles.itinerariesPadding}>Paris Itinerary</Text>
        <Text style = {styles.tripLengthPadding}>3 Days</Text>
      </View>
      <View style = {styles.top}>  
        <Card additionalStyles = {styles.cardContainerTwo}>
          <Text>Placeholder for Members</Text>
        </Card>      
        <Card additionalStyles = {styles.cardContainer}> 
          <Accordion
            sections={SECTIONS}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={setActiveSections}
            underlayColor="transparent"
          />
        </Card>
      </View>
    </Background>
      
  );
};

const styles = {
  tripLengthPadding: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 28,
    paddingLeft: 15,
    color: "white",
  },
  itinerariesPadding: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 48,
    paddingLeft: 15,
    fontWeight: "bold",
    color: "white",
  },
  top: {
    marginTop: "15%",
  },
  header: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    marginTop: "1%",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontWeight: "bold",
  },
  content: {
    backgroundColor: "#fff",
    padding: 10,
  },
  childText: {
    marginTop: 10,
    marginLeft: 20,
    padding: 10,
  },
  container: {
    // backgroundColor: "white",
  },
  cardContainer: {
    margin: "5%",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    maxHeight: "100%",
  },
  cardContainerTwo: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxHeight: "100%",
  },
};
export default MyAccordionMenu;