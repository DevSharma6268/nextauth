import {connect} from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextRequest,NextResponse} from 'next/server'
import { getDataFromToken } from "@/helpers/getDataFromToken";



connect()

export async function POST(request: NextRequest){
    try {
        const userId=await getDataFromToken(request)

        User.findOne({_id:userId}).select("-password -verifyToken -verifyTokenExpiry").then((user)=>{
            if(!user){
                return NextResponse.json({error:"User not found"},{status:404})
            }
            return NextResponse.json({
                message:"User data fetched successfully",
                data:user
            })
        })
    } catch (error) {
        return NextResponse.json({error:(error as Error).message},{status:500})
    }
}