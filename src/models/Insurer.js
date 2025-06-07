import mongoose from "mongoose";

const InsurerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: false },
  contactInfo: { type: String, required: false },
  user: { type: String, required: false },
  // outros campos
});

export default mongoose.model('Insurer', InsurerSchema);