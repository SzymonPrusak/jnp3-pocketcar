import { Schema, model, Document } from 'mongoose'


interface Car extends Document {
  name: string;
  productionYear: number;
  generation: string;
  engine: string;
  carModelName: string;
  makeName: string;
  vinNumber: string;
  book: Schema.Types.ObjectId | CarBook;
}

const carSchema = new Schema<Car>({
  name: { type: String, required: true },
  productionYear: { type: Number, required: true },
  generation: { type: String, required: true },
  engine: { type: String, required: true },
  carModelName: { type: String, required: true },
  makeName: { type: String, required: true },
  vinNumber: { type: String, required: true },
  book: { type: Schema.Types.ObjectId, ref: 'CarBook', required: true }
});

export const CarModel = model<Car>('Car', carSchema);


interface CarBook extends Document {
  licensePlate: string;
  mileage: number;
  nextServiceDate: Date;
  lastServiceMileage: number;
}

const carBookSchema = new Schema<CarBook>({
  licensePlate: { type: String, required: true },
  mileage: { type: Number, required: true },
  nextServiceDate: { type: Date, required: true },
  lastServiceMileage: { type: Number, required: true }
});

export const CarBookModel = model<CarBook>('CarBook', carBookSchema);


interface CarAccess extends Document {
  car: Schema.Types.ObjectId | Car;
  userId: number;
  role: string;
}

const carAccessSchema = new Schema<CarAccess>({
  car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
  userId: { type: Number, required: true },
  role: { type: String, required: true },
});

export const CarAccessModel = model<CarAccess>('CarAccess', carAccessSchema);
