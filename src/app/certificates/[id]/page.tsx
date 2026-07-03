import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
export default async function Detail({params}:{params:{id:string}}){ const c=await prisma.certificate.findUnique({where:{id:params.id},include:{jobs:{orderBy:{createdAt:'desc'}}}}); if(!c) notFound(); return <div className="space-y-6"><h1 className="text-3xl font-bold">{c.commonName}</h1><p>{c.status}</p><form method="post" action={`/api/certificates/${c.id}/issue`}><button className="btn">Issue / Renew now</button></form><div className="card p-5"><b>Challenge:</b> {c.challengeRecord}<br/><b>CNAME target:</b> {c.cnameTarget}</div>{c.jobs.map(j=><pre className="rounded-xl bg-slate-900 p-4 text-xs text-white" key={j.id}>{j.type} {j.status}
{j.output}</pre>)}</div> }
