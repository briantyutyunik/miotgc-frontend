export const itineraryModel = `{
    FlightInformationOut: {
      Airline: "",
      ArrivalAirport: "",
      DepartureAirport: "",
      DepartureCity: "",
      ArrivalCity:"",
      DepartureDate: "",
      Price: "",
      ArrivalTime: "",
      DepartureTime: "",
      FlightNumber: "",
      FlightGate: "",
      FlightDistance: "",
      FlightDuration: "",
      FlightAircraft: ""
    },
    FlightInformationBack: {
      Airline: "",
      ArrivalAirport: "",
      DepartureAirport: "",
      DepartureCity: "",
      ArrivalCity:"",
      Price: "",
      ReturnDate: "",
      ArrivalTime: "",
      DepartureTime: "",
      FlightNumber: "",
      FlightGate: "",
      FlightDistance: "",
      FlightDuration: "",
      FlightAircraft: ""
    },
    Accommodation: {
      Name: "",
      Room: "",
      Address: "",
      Price: ""(per night),
      Website: "",
      Phone: "",
      Stars: "",
    },
    Day1: {
      Morning: {
        Activity: "",
        Meal: "",
        Transportation: "",
      },
      Afternoon: {
        Activity: "",
        Meal: "",
        Transportation: "",
      },
      Evening: {
        Activity: "",
        Meal: "",
        Transportation: "",
      },
    },
  }`;
  
  export const sampleResponse = {
    FlightInformationOut: {
      Airline: "Delta Airlines",
      ArrivalAirport: "MXP",
      DepartureAirport: "JFK",
      DepartureCity: "New York City",
      ArrivalCity: "Milan",
      DepartureDate: "May 5",
      Price: "Approximate $800 per person",
      //ReturnDate: "May 10",
      ArrivalTime: "09:00",
      DepartureTime: "12:00",
      FlightNumber: "ABC123",
      FlightGate: "B12",
      FlightDistance:"4014 Miles",
      FlightDuration: "9 Hours",
      FlightAircraft: "Boeing 767"
    },
    FlightInformationBack: {
      Airline: "Delta Airlines ",
      ArrivalAirport: "JFK",
      DepartureAirport: "MXP",
      DepartureCity: "Milan",
      ArrivalCity: "New York City",
      //DepartureDate: "May 5",
      Price: "Approximate $800 per person",
      ReturnDate: "May 10",
      ArrivalTime: "01:00",
      DepartureTime: "10:00",
      FlightNumber: "DEF345",
      FlightGate: "D9",
      FlightDistance:"4014 Miles",
      FlightDuration: "9 Hours",
      FlightAircraft: "Boeing 747"
    },
    Accommodation: {
      Name: "Hotel Milano Scala",
      Room: "36",
      Address: "Via dell'Orso, 7, 20121 Milano MI, Italy",
      Price: "$150 per night",
      Website: "https://hotelmilanoscala.it/",
      Phone: "+39 02 870961",
      Stars: "4",
    },
    Day1: {
      Morning: {
        Activity: "Duomo di Milano - Free",
        Meal: "Panino Giusto - $12 per person",
        Transportation: "Uber from accommodation - $6 per person",
      },
      Afternoon: {
        Activity: "Galleria Vittorio Emanuele II - Free",
        Meal: "Luini Panzerotti - $8 per person",
        Transportation: "Walk",
      },
      Evening: {
        Activity: "Navigli District - Free",
        Meal: "La Prosciutteria Milano - $20 per person (with drinks)",
        Transportation: "Metro - $2 per person",
      },
    },
    Day2: {
      Morning: {
        Activity: "Pinacoteca di Brera - $15 per person",
        Meal: "Vertical Garden - $18 per person",
        Transportation: "Metro - $2 per person",
      },
      Afternoon: {
        Activity: "Porta Genova District - Free",
        Meal: "Il Panzerotto - $7 per person",
        Transportation: "Walk",
      },
      Evening: {
        Activity: "Bosco Verticale - Free",
        Meal: "Spontini - $10 per person",
        Transportation: "Metro - $2 per person",
      },
    },
    Day3: {
      Morning: {
        Activity: "Castello Sforzesco - Free",
        Meal: "Vietnamonamour - $15 per person",
        Transportation: "Metro - $2 per person",
      },
      Afternoon: {
        Activity: "Naviglio Grande District - Free",
        Meal: "Ravioleria Sarpi - $18 per person",
        Transportation: "Metro - $2 per person",
      },
      Evening: {
        Activity: "Navigli District - Free",
        Meal: "Taglio - $15 per person (with drinks)",
        Transportation: "Uber - $6 per person",
      },
    },
    Day4: {
      Morning: {
        Activity: "Cimitero Monumentale - Free",
        Meal: "Farini - $12 per person",
        Transportation: "Metro - $2 per person",
      },
      Afternoon: {
        Activity: "Porta Venezia District - Free",
        Meal: "Bianco Latte - $20 per person (with drinks)",
        Transportation: "Metro - $2 per person",
      },
      Evening: {
        Activity: "Brera District - Free",
        Meal: "Da Rita e Antonio - $25 per person (with drinks)",
        Transportation: "Uber - $6 per person",
      },
    },
    Day5: {
      Morning: {
        Activity: "Sforza Castle - Free",
        Meal: "Taglio - $15 per person",
        Transportation: "Metro - $2 per person",
      },
      Afternoon: {
        Activity: "Naviglio Pavese District - Free",
        Meal: "Temakinho Milan - $20 per person (with drinks)",
        Transportation: "Metro - $2 per person",
      },
      Evening: {
        Activity: "Navigli District - Free",
        Meal: "Giacomo Bistrot - $25 per person (with drinks)",
        Transportation: "Uber - $6 per person",
      },
    },
    Day6: {
      Morning: {
        Activity: "Last-minute shopping on Via Monte Napoleone",
        Meal: "Costa Coffee - $7 per person",
        Transportation: "Uber from accommodation - $6 per person",
      },
      Afternoon: {
        Activity: "Last-minute shopping on Corso Buenos Aires",
        Meal: "Pizzium - $10 per person",
        Transportation: "Uber - $6 per person",
      },
      Evening: {
        Activity: "Departure",
        Meal: "No meal recommendation for this day",
        Transportation: "Uber from accommodation - $6 per person",
      },
    },
  };