import { Schema } from "mongoose";



const meetingSchema=new Schema(
    {
        user_id:{type:String},
        meetinngCode:{type:String,required:true},
        date:{type:Date,default:Date.now,required:true}
        
    }
)

const Meeting=mongoose.model("meeting",meetingSchema);

export {Meeting};
