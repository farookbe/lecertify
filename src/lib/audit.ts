import { prisma } from './db';
export async function audit(action:string,target?:string,metadata?:Record<string,unknown>){ await prisma.auditLog.create({data:{action,target,metadata:metadata??{}}}); }
