import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String,
            required:true,
        },
        coverImage:{
            type:String,
            required:true,
        },
        watchHistory:[
            {
            type:Schema.Types.ObjectId,
            ref="Videos"
          }
        ],
        password:{
            type:String,
            required:[true,'Password is required'],
        },
        },
        {
            timestamps:true
        }
    );

userSchema.pre('save',async function(next){

    if(!this.isModified('password')){
         return next();
    }
    this.password=bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect=async function(password){
   return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAcessToken=function(){
    jwt.sign(
        {
            _id:this._id,
            username:this.username,
            email:this.email,
            fullname:this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRES
        }
    )
};

userSchema.methods.generateRefreshToken=function(){
    jwt.sign(
        {
            _id:this._id,
            username:this.username,
            email:this.email,
            fullname:this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRES
        }
    )
};

export const User=mongoose.model("User",userSchema);