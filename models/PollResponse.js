import mongoose from "mongoose";

const { Schema } = mongoose;

const pollResponseSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    poll_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    option_id: {
      type: Schema.Types.ObjectId,
      ref: "PollOptions",
    },
  },
  { timestamps: true }
);

export default mongoose.models.PollResponse ||
  mongoose.model("PollResponse", pollResponseSchema);
