import { Schema } from "mongoose";
import mongoose from "mongoose";
import { ITill } from "../types";

const tillSchema = new Schema<ITill>({
  tillNumber: { type: Number, required: true },
  tillTotal: { type: Number, required: true },
  expectedTotal: { type: Number, required: true },
  expectedVsTotal: { type: Number, required: true },
  date: { type: String, required: true },
  additionalInfo: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

tillSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Till = mongoose.model("Till", tillSchema);

export default Till;
