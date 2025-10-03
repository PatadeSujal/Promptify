import { Schema, model } from "mongoose";
import mongoose from "mongoose";
// Schema definition
const PromptDataSchema = new Schema(
  {
    image_link: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    hashtags: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Model (forces collection name = 'PromptData')
const PromptData =
  mongoose.models.PromptData ||
  mongoose.model("PromptData", PromptDataSchema, "PromptData")


export default PromptData;
