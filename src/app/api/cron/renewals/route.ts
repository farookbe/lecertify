import { NextResponse } from 'next/server';
export async function GET(){ return NextResponse.json({ok:true,message:'Renewal scan scaffold. Add durable worker in next phase.'}); }
