import mongoose, { Document, Schema } from 'mongoose';

export interface Cinema extends Document {
  seats: Schema.Types.ObjectId[];
}

const cinemaSchema = new Schema<Cinema>({
  seats: [{ type: Schema.Types.ObjectId, ref: 'Seat' }],
});

export default mongoose.model<Cinema>('Cinema', cinemaSchema);
