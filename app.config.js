require('dotenv').config();

const apiKey = process.env.OPENAI_API_KEY;

export default {
  expo: {
    // ...your other configurations
    extra: {
      openaiApiKey: "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",
    },
  },
};
