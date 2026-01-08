import {mongoose, Schema} from "mongoose"

const subscriptionSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    channel:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }
},
{timestamps: true});

export const Subscription = mongoose.models("Subscription",subscriptionSchema)