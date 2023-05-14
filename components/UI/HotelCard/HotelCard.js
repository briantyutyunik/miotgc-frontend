import React from 'react';
import { View, StyleSheet, Text, useState} from 'react-native';


const OutgoingFlightComp = ({HotelName, RoomNumber, Price, Address, Phone}) => {
    return (
        <View style={styles.sectionsCard}>
          <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.leftColumn}>
                    <Text style={styles.text}>Hotel:</Text>
                    <Text style={styles.text}>{HotelName}</Text>
                    <Text style={styles.text}>Room:</Text>
                    <Text style={styles.text}>{RoomNumber}</Text>
                    <Text style={styles.text}>Total Cost:</Text>
                    <Text style={styles.text}>{Price}</Text>
                </View>
                <View style={styles.rightColumn}>
                    <Text style={styles.text}>Address:</Text>
                    <Text style={styles.text}>{Address}</Text>
                    <Text style={styles.text}>Phone #::</Text>
                    <Text style={styles.text}>{Phone}</Text>
                </View>
            </View>
          </View>
        </View>
    );
  };
  
  const styles = StyleSheet.create({ 
    sectionsCard: {
      flex: 1,
      marginVertical: 0,
      height: "auto",
      width: "95%",
      backgroundColor: "#fff",
        borderRadius: 10,
        padding: 16,
        shadowColor: "black",
        shadowOffset: {
        width: 8,
        height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    marginBottom:10 ,
    },
    container: {
      margin: 5,
      flex: 1,
      flexDirection: 'column',
    },
    row: {
      flex: 1,
      flexDirection: 'row',
    },
    leftColumn: {
      flex: 1,
      //backgroundColor: 'red',
      padding: 5,
    },
    rightColumn: {
      flex: 1,
      //backgroundColor: 'blue',
      padding: 10,
    },
    text: {
      textAlign: 'left',
      lineHeight: 24,
      fontSize: 22,
    },
  });
  export default OutgoingFlightComp;
  
{/*{aiGeneratedResponse && <Card additionalStyles={styles.sectionsCard}>
                  <View>
                    <Text style={styles.sectionsTitle}>Hotel</Text>
                    <Text style={styles.sectionsText}>
                      {aiGeneratedResponse.Accommodation.Name}
                    </Text>
                    <Text style={styles.sectionsText}>
                      Address: {aiGeneratedResponse.Accommodation.Address}
                    </Text>
                    <Text style={styles.sectionsText}>
                      Price: {aiGeneratedResponse.Accommodation.Price}
                    </Text>
                  </View>
</Card>*/}