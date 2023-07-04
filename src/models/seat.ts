import mongoose, { Document, Schema } from 'mongoose';

export interface Seat extends Document {
  seatNumber: number;
  cinema: Schema.Types.ObjectId;
  isPurchased: boolean;
  version: number;
}

const seatSchema = new Schema<Seat>({
  seatNumber: { type: Number, required: true },
  cinema: { type: Schema.Types.ObjectId, ref: 'Cinema', required: true },
  isPurchased: { type: Boolean, default: false },
  version: { type: Number, default: 0 },
});

export default mongoose.model<Seat>('Seat', seatSchema);
