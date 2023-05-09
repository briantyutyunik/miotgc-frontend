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
