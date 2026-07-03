import { NextRequest, NextResponse } from 'next/server';
import { getSettings, saveSettings, secretSettingKeys, redirectUri } from '@/lib/settings';
export async function GET(){ const s:any=await getSettings(); for(const k of secretSettingKeys) if(s[k]) s[k]='********'; return NextResponse.json({...s, entraRedirectUri: redirectUri(s)}); }
export async function POST(req:NextRequest){ await saveSettings(await req.json()); const s=await getSettings(); return NextResponse.json({ok:true, entraRedirectUri: redirectUri(s)}); }
