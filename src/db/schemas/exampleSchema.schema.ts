import { Schema, model } from "mongoose";

const exampleSchema = new Schema({
    title:{type:String}
})


export const Example = model("Example", exampleSchema)