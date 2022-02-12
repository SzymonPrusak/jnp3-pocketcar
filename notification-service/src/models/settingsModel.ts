import { Schema, model, Document } from 'mongoose'


interface NotificationChannel extends Document {
  userId: string,
  name: string,
  data: string,
  isEnabled: boolean
}

const channelSchema = new Schema<NotificationChannel>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  data: { type: String, required: true },
  isEnabled: { type: Boolean, required: true }
})

export const NotificationChannelModel = model<NotificationChannel>('NotificationChannel', channelSchema);
