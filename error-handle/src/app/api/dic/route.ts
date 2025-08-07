
import { NextResponse } from "next/server";
export async function GET(){
    const URL = 'https://script.google.com/macros/s/AKfycby7KqBj0W_cWLfiFfHZe6rxNFbHKUCtJJQCWEMUyDTBzpKeKGGlxO7b5xIYYslSAyhj/exec'
    try {
        const res = await fetch(URL)
        const data = await res.json()
        return NextResponse.json({data})
    } catch (error) {
        console.error("Error server reques.",error)
        return NextResponse.json({error: "Error server reques."},{status: 500})
    }    
   
}