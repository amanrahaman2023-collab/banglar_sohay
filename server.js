import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const app=express(); const here=path.dirname(fileURLToPath(import.meta.url));
app.use(helmet({contentSecurityPolicy:false}));
app.use(cors({origin:(process.env.ALLOWED_ORIGINS||'').split(',').filter(Boolean)}));
app.use(express.json({limit:'32kb'}));
app.use('/api/',rateLimit({windowMs:60_000,limit:60,standardHeaders:true,legacyHeaders:false}));
app.get('/api/health',(_req,res)=>res.json({ok:true,service:'Banglar Sohay API',version:'1.0.0',time:new Date().toISOString()}));
// Production TODO: connect a verified OTP provider, persist hashed challenges, expiry, replay protection and attempt limits.
app.post('/api/auth/request-otp',(_req,res)=>res.status(501).json({error:'OTP provider is not configured. No OTP was sent.'}));
app.post('/api/auth/verify-otp',(_req,res)=>res.status(501).json({error:'Authentication provider and user database are not configured.'}));
// Keep AI keys on the server. Configure provider adapter before enabling this endpoint.
app.post('/api/assistant',(_req,res)=>res.status(503).json({error:'AI provider is not configured. Demo assistant remains available in the app.'}));
// Booking is safely delegated to the official provider; no payment data is collected here.
app.post('/api/bookings/redirect',(_req,res)=>res.status(501).json({error:'Booking provider integration is not configured. Use provider official app/site.'}));
const webDir=path.resolve(here,'../../web'); app.use(express.static(webDir));
const port=Number(process.env.PORT||8080); app.listen(port,'0.0.0.0',()=>console.log(`Banglar Sohay API listening on ${port}`));
