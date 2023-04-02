import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

const MyAccordionMenu = () => {
  const [activeSection, setActiveSection] = useState(null);

  const SECTIONS = [
    {
      title: "Section 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      children: ["Section 1 Child 1", "Section 1 Child 2"],
    },
    {
      title: "Section 2",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      children: ["Section 2 Child 1", "Section 2 Child 2"],
    },
    {
      title: "Section 3",
      content:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      children: ["Section 3 Child 1", "Section 3 Child 2"],
    },
  ];

  const renderHeader = (section, _, isActive) => {
    return (
      <TouchableOpacity
        style={styles.header}
        onPress={() => setActiveSection(isActive ? null : section)}
      >
        <Text style={styles.headerText}>{section.title}</Text>
      </TouchableOpacity>
    );
  };

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
    <Accordion
      sections={SECTIONS}
      activeSections={[activeSection]}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onChange={setActiveSection}
    />
  );
};

const styles = {
  header: {
    backgroundColor: "#f2f2f2",
    padding: 10,
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
  
}
  childText: {
 
  padding: 10
  }
};
export default MyAccordionMenu;
