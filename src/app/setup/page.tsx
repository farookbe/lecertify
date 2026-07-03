import SetupForm from '@/components/SetupForm';
import { getSettings, redirectUri } from '@/lib/settings';
export default async function SetupPage(){ const s=await getSettings(); return <div className="mx-auto max-w-5xl space-y-6"><h1 className="text-3xl font-bold">LeCertify setup</h1><p className="text-slate-600">Configure authentication, ACME and Azure DNS from the web UI.</p><SetupForm initial={s} redirect={redirectUri(s)} /></div>; }
