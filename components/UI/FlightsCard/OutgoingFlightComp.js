import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const OutgoingFlightComp = ({ topLeftText, topRightText, centerText }) => {
    return (
        <View style={styles.sectionsCard}>
          <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.leftColumn}>
                    <Text style={styles.text}>
                    Airline:{"\n"}
                    Flight #:{"\n"}
                    Gate:{"\n"} 
                    Price:
                    </Text>
                </View>
                <View style={styles.rightColumn}>
                <View style={styles.rowTwo}>
                    <Text style={styles.departureArrivalText}>DEP</Text>
                    <FontAwesome name="long-arrow-right" style={styles.icon} />
                    <Text style={styles.departureArrivalText}>ARR</Text>
                </View>
                    <Text style={styles.text}>
                      Airport:{"\n"}
                      Time:{"\n"}
                      Dates:
                    </Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.centerColumn}>
                    <Text style={styles.text}>
                    Distance:{"\n"}
                    Duration:{"\n"}
                    Aircraft:
                    </Text>
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
    centerColumn: {
      flex: 2,
      //backgroundColor: 'green',
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
    rowTwo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 0,
      },
      departureArrivalText: {
        fontWeight: 'bold',
        fontSize: 20,
        textTransform: 'uppercase',
        marginRight: 5,
      },
      icon: {
        fontSize: 26,
      },
  });
  
  export default OutgoingFlightComp;
  