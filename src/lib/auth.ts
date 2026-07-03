import type { NextAuthOptions } from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getSettings } from './settings';

export async function getAuthOptions(): Promise<NextAuthOptions> {
  const s = await getSettings();
  const providers: NextAuthOptions['providers'] = [];
  if (s.entraIdEnabled === 'true' && s.entraTenantId && s.entraClientId && s.entraClientSecret) {
    providers.push(AzureADProvider({ tenantId: s.entraTenantId, clientId: s.entraClientId, clientSecret: s.entraClientSecret }));
  }
  if (process.env.LECERTIFY_SETUP_MODE === 'true' || providers.length === 0) {
    providers.push(CredentialsProvider({ id:'setup', name:'Temporary setup login', credentials:{ password:{label:'Setup password', type:'password'} }, async authorize(creds){ return creds?.password === (process.env.SETUP_ADMIN_PASSWORD || 'lecertify-setup') ? { id:'setup-admin', name:'Setup Admin', email:'setup@local' } : null; }}));
  }
  return { providers, secret: process.env.NEXTAUTH_SECRET, session:{strategy:'jwt'} };
}
