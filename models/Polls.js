import mongoose from "mongoose";

const { Schema } = mongoose;

const pollSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Poll || mongoose.model("Poll", pollSchema);
