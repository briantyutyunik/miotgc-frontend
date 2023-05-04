// import { OPENAI_API_KEY } from "@env";
import "react-native-url-polyfill/auto";
import { itineraryModel, sampleResponse } from "../../models/ItineraryModel";
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

async function testResponse() {
  let data = {
    groupCount: "5",
    ageGroup: "30-40",
    destination: "Berlin, Germany",
    dates: "June 15-20",
    budget: "$",
    departureAirport: "JFK",
  };

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful travel agent asssistant that will create highly detailed and specific itineraries. Your response should only" +
          "Include a JSON object that should fill out the model provided and thats it.",
      },
      {
        role: "user",
        content:
          `3 people in the age group of 20-25 are going to Milan, Italy during May 5-10. Create a $$$/$$$ budget day by day detailed itinerary including the price of each activity, meal, and transportation field ` +
          ` They are coming from John F. Kennedy Airport(JFK).` +
          `Your output should be returned as a JSON object with the exact same fields as this sample response model and add as` +
          `many days as specified in the date range: ${itineraryModel}`,
      },
      { role: "assistant", content: `${sampleResponse}` },
      {
        role: "user",
        content:
          `${data.groupCount} people in the age group of ${data.ageGroup} are going to ${data.destination} during ${data.dates}.` +
          ` Create a ${data.budget}/$$$ budget day by day detailed itinerary including the price of each activity, meal, and transportation field exactly like the sample` +
          `response provided. They are coming from ${data.departureAirport}.` +
          `Your output should be returned as a JSON object with the exact same fields as this sample response model and add as` +
          `many days as specified in the date range: ${itineraryModel}`,
      },
    ],
  });
  return completion.data.choices[0].message;
}

export async function testGPT() {
  console.log("gpt loading...");
  const res = await testResponse();
  console.log("----------RESPONSE---------");
  console.log(res);
  const data = JSON.parse(res.content);
  console.log("----------CONTENT---------");
  console.log(data);
  console.log("----------FLIGHTINFO---------");
  console.log(data.FlightInformation);
  console.log("----------DAY4---------");
  console.log(data.Day4.Afternoon.Activity);
  console.log("gpt done");
}
