import './globals.css';
import Link from 'next/link';
export const metadata = { title: 'LeCertify', description: 'ACME certificate management' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><header className="border-b bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between p-4"><Link className="text-xl font-bold" href="/">🛡️ LeCertify</Link><nav className="flex gap-4 text-sm"><Link href="/certificates">Certificates</Link><Link href="/setup">Setup</Link><Link href="/settings">Settings</Link><Link href="/api/auth/signin">Sign in</Link></nav></div></header><main className="mx-auto max-w-7xl p-6">{children}</main></body></html>;
}
