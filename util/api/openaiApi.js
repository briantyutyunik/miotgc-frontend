// import { OPENAI_API_KEY } from "@env";
import "react-native-url-polyfill/auto";
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

async function testResponse() {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful travel agent asssistant that will create highly detailed and specific itineraries",
      },
      {
        role: "user",
        content:
          "2 people in the age group of 20-25 are going to Paris during June 12-15. Create a high budget day by day detailed itinerary" +
          "  for them and return a JSON object; Each object in the itinerary should " +
          "be placed as an individual key-value pair and the final field should be the best flight information. Include links to each destination so that they" +
          " can research the places. Also include a 'After Hours' section that includes nightlife options. They are coming from JFK airport",
      },
    ],
  });
  return completion.data.choices[0].message;
}


export async function testGPT() {
    try {
      console.log("gpt loading...");
      const res = await testResponse();
      const data = JSON.parse(res.content);
      console.log(data);
      console.log(data.BestFlightInformation.Arrival);
console.log(data.BestFlightInformation.Departure);
console.log(data.Day1.Morning.Breakfast);
console.log(data.Day2.Evening.Attraction);

      console.log("gpt done");
    } catch (err) {
      console.log("Error in testGPT:", err.message);
      return { error: err.message };
    }
  }
  

