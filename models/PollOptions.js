import mongoose from "mongoose";

const { Schema } = mongoose;

const pollOptionsSchema = new Schema(
  {
    poll_id: {
      type: Schema.Types.ObjectId,
      ref: "Poll",
    },
    option_text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.PollOptions ||
  mongoose.model("PollOptions", pollOptionsSchema);
