import mongoose from "mongoose";

const InsurancePolicySchema = new mongoose.Schema({
    policyNumber: { type: String, required: true },
    type: { type: String, required: true },
    coverage: String,
    premium: Number,
    insuredAmount: Number,
    insurer: String,
});

export default mongoose.model('InsurancePolicies', InsurancePolicySchema);