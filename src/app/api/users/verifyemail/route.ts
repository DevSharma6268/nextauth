import {connect} from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextRequest,NextResponse} from 'next/server'


connect()

export async function POST(request: NextRequest){
    try {
        const reqBody =await request.json()
        const {token} =reqBody
        console.log(reqBody);
    

      const user =  await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})

      if(!user){
        return NextResponse.json({error:"invalid or expired token "},{status:400})
      }
      console.log(user);
      user.isVerified = true;
      user.verifyToken =undefined;
      user.verifyTokenExpiry=undefined;

      const updatedUser =await user.save();

      return NextResponse.json({
        message:"Email verified successfully",
        success:true,
      },{status:200})
    } catch (error) {
        return NextResponse.json({error:(error as Error).message},{status:500})
    }
}


