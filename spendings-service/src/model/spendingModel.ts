import { Schema, model, Document } from 'mongoose'

interface Spending extends Document {
  name: string;
  cost: number;
  carId: string;
  date: Date;
  type: string
}

const spendingSchema = new Schema<Spending>({
  name: { type: String, required: true },
  cost: { type: Number, required: true},
  carId: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true }
});

export const SpendingModel = model<Spending>('Spending', spendingSchema);
