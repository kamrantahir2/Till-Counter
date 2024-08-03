import { Schema, model, connect } from "mongoose";
import mongoose from "mongoose";

interface ITill {
  tillNumber: number;
  tillTotal: number;
  totalAfterFloat: number;
  user: mongoose.Schema.Types.ObjectId;
}

const tillSchema = new Schema<ITill>({
  tillNumber: { type: Number, required: true },
  tillTotal: { type: Number, required: true },
  totalAfterFloat: { type: Number, required: true },
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
