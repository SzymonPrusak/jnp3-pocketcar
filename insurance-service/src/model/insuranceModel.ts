import { Schema, model, Document } from 'mongoose'

interface Insurance extends Document {
    insuranceNumber: string
    cost: number
    company: string
    scope: string
    contactNumber: string
    validFrom: Date
    validUntil: Date
    carId: string
}

const insuranceSchema = new Schema<Insurance>({
    insuranceNumber: { type: String, required: true },
    cost: { type: Number, required: true },
    company: { type: String, required: true },
    scope: { type: String, required: true },
    contactNumber: { type: String, required: true },
    validFrom: { type: Date, required: true },
    validUntil: { type: Date, required: true },
    carId: { type: String, required: true },
});

export const InsuranceModel = model<Insurance>('Insurance', insuranceSchema);
