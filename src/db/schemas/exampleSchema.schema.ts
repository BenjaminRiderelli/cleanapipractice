import { Schema, model } from "mongoose";

const exampleSchema = new Schema({
    title:{type:String},
    description:{type:String}
})


export const Example = model("Example", exampleSchema)