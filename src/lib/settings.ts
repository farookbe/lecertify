import { prisma } from './db';
import { decryptText, encryptText } from './crypto';

export type LeCertifySettings = {
  appBaseUrl:string; acmeAccountEmail:string; acmeDirectoryUrl:string; acmeDnsPropagationSeconds:string; acmeCleanupDns:string;
  entraIdEnabled:string; entraTenantId:string; entraClientId:string; entraClientSecret:string; entraAdminGroupId:string;
  azureTenantId:string; azureClientId:string; azureClientSecret:string; azureSubscriptionId:string; azurePrimaryDnsResourceGroup:string; azurePrimaryDnsZone:string; azureValidationDnsResourceGroup:string; azureValidationDnsZone:string; azureDnsTtl:string; azureAutoCreateCname:string;
};
export const settingKeys: Array<keyof LeCertifySettings> = ['appBaseUrl','acmeAccountEmail','acmeDirectoryUrl','acmeDnsPropagationSeconds','acmeCleanupDns','entraIdEnabled','entraTenantId','entraClientId','entraClientSecret','entraAdminGroupId','azureTenantId','azureClientId','azureClientSecret','azureSubscriptionId','azurePrimaryDnsResourceGroup','azurePrimaryDnsZone','azureValidationDnsResourceGroup','azureValidationDnsZone','azureDnsTtl','azureAutoCreateCname'];
export const secretSettingKeys = new Set<keyof LeCertifySettings>(['entraClientSecret','azureClientSecret']);
const fallback: LeCertifySettings = { appBaseUrl:process.env.NEXTAUTH_URL ?? '', acmeAccountEmail:'', acmeDirectoryUrl:'https://acme-staging-v02.api.letsencrypt.org/directory', acmeDnsPropagationSeconds:'120', acmeCleanupDns:'true', entraIdEnabled:'false', entraTenantId:'', entraClientId:'', entraClientSecret:'', entraAdminGroupId:'', azureTenantId:'', azureClientId:'', azureClientSecret:'', azureSubscriptionId:'', azurePrimaryDnsResourceGroup:'', azurePrimaryDnsZone:'', azureValidationDnsResourceGroup:'', azureValidationDnsZone:'', azureDnsTtl:'60', azureAutoCreateCname:'false' };
export async function getSettings(): Promise<LeCertifySettings>{ const rows=await prisma.appSetting.findMany(); const data:any={...fallback}; for(const r of rows){ data[r.key]=r.secret?decryptText(r.value):r.value; } return data; }
export async function saveSettings(input: Partial<LeCertifySettings>){ for(const [k,v] of Object.entries(input)){ if(!settingKeys.includes(k as keyof LeCertifySettings)) continue; let value=String(v??'').trim(); const secret=secretSettingKeys.has(k as keyof LeCertifySettings); if(secret && value==='********') continue; if(secret && value) value=encryptText(value); await prisma.appSetting.upsert({ where:{key:k}, update:{value,secret}, create:{key:k,value,secret} }); } }
export function redirectUri(settings:LeCertifySettings){ const base=(settings.appBaseUrl || process.env.NEXTAUTH_URL || 'http://localhost:3000').replace(/\/$/,''); return `${base}/api/auth/callback/azure-ad`; }
