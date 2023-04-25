import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Image } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import Background from "../../components/UI/Background";
import Card from "../../components/UI/Card";
import { getSections, auth, firestore, storage } from "../../firebase";
import { useRoute } from "@react-navigation/native";
import { Skeleton } from "@rneui/themed";
import { onSnapshot } from "firebase/firestore";
import * as firebase from "firebase/app";


const MyAccordionMenu = () => {
  const [image, setImage] = useState();
  const [activeSections, setActiveSections] = useState([]);
  const [SECTIONS, setSections] = useState([]);
  const route = useRoute();
  const { groupId, groupName } = route.params;
  const SECTIONS2 = [
    {
      title: "Section 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      children: ["Section 1 Child 1", "Section 1 Child 2"],
    },
    {
      title: "Section 2",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Section 3",
      content:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        children: ["Section 1 Child 1", "Section 1 Child 2"],
      },
  ];

  //     title: "Flight",
  //     title: "Stay",
  //     title: "Activities",
  //     title: "Checklist"
  //     title: "Transportation",

  
  useEffect(() => {
    const uid = auth.getAuth().currentUser.uid;
    let docRef = firestore.doc(firestore.getFirestore(), "users", uid);
    const unsub = onSnapshot(docRef, (docSnap) => {
      const user = docSnap.data();
      if (user.avatarUrl !== "") {
        let ref = storage.ref(storage.getStorage(), user.avatarUrl);
        storage.getDownloadURL(ref).then((res) => {
          setImage(res);
        });
      }
      
    });

    async function displaySections() {
      const sections = await getSections();
    
      sections.forEach((section) => {
        console.log(`ID: ${section.id}`);
    
        for (const key in section) {
          if (key !== 'id') {
            console.log(`${key}: ${section[key]}`);
          }
        }
    
        console.log('---');
      });
    }

    (async () => {
      const fetchedGroups = await fetchGroups();
      setGroups(fetchedGroups);
    })();

    return unsub;
  }, []);

  useEffect(() => {
    const fetchGroupData = async () => {
      const groupRef = firestore.doc(firestore.getFirestore(), "groups", groupId);
      const groupSnap = await firestore.getDoc(groupRef);

      if (groupSnap.exists()) {
        setGroupData(groupSnap.data());
      } else {
        console.log("No such group!");
      }
    };

    fetchGroupData();
  }, [groupId]);


  useEffect(() => {
    const fetchSections = async () => {
      const fetchedSections = await getSections();
      setSections(fetchedSections);
      console.log(SECTIONS);
    };

    fetchSections();
  }, []);

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
      <TouchableOpacity style={styles.header} onPress={() => setActiveSections(isActive ? [] : [index])}>
        <Text style={styles.headerText}>{section.header}</Text>
      </TouchableOpacity>
    );
  };
  
  const renderContent = (section, index, isActive) => {
    return (
      <TouchableOpacity style={styles.content} onPress={() => setActiveSections(isActive ? [] : [index])}>
        <Text style={styles.contentText}>Airline: {section.content.Airline}</Text>
        <Text style={styles.contentText}>City: {section.content.City}</Text>
        <Text style={styles.contentText}>Airport: {section.content.Airport}</Text>
        {section.children && renderChildren(section)}
      </TouchableOpacity>
    );
  };

  const renderChildren = (section) => {
    return (
      <View style={styles.children}>
        {section.children.map((child, index) => (
          <Text key={index} style={styles.childText}>
            {child}
          </Text>
        ))}
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.safe}>
      <Background additionalStyle={styles.container}>
        <View style={styles.top}>
          <Text style={styles.itinerariesPadding}>{groupName}</Text>
        </View>
        <View style={styles.top}>

          <Card additionalStyles={styles.cardContainer}>
          <Text>Placeholder</Text>
          </Card>

          <Card additionalStyles={styles.cardContainer}>
            <Accordion
              sections={SECTIONS}
              activeSections={activeSections}
              renderHeader={renderHeader}
              renderContent={renderContent}
              renderChildren={renderChildren}
              onChange={setActiveSections}
            />
          </Card>
        </View>
      </Background>
    </SafeAreaView>
  );
};

const styles = {
  safe: {
    flex: 1,
    backgroundColor: '#FF5553',
  },
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
};
export default MyAccordionMenu;