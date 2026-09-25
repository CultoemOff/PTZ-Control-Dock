import express from 'express';
import { createServer } from 'node:http';
import { WebSocketServer } from 'ws';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { ViscaUdpDriver } from './ptz/viscaUdp.js';
import type { Camera, Direction } from './ptz/types.js';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });
const here = dirname(fileURLToPath(import.meta.url));
const webRoot = join(here, '..', 'web');

app.use(express.json());
app.use(express.static(webRoot));
app.get('/', (_req,res)=>res.redirect('/obs'));
app.get('/obs', (_req,res)=>res.sendFile(join(webRoot,'index.html')));
app.get('/api/health', (_req,res)=>res.json({ok:true,version:'0.1.0'}));

const cameras = new Map<string, Camera>();
app.get('/api/cameras', (_req,res)=>res.json([...cameras.values()]));

app.post('/api/cameras', (req,res)=>{
  const c = req.body as Partial<Camera>;
  if (!c.name || !c.host) return res.status(400).json({error:'name and host are required'});
  const camera: Camera = {id:c.id ?? crypto.randomUUID(),name:c.name,host:c.host,port:c.port ?? 52381,protocol:c.protocol ?? 'visca-udp',online:true};
  cameras.set(camera.id,camera);
  res.status(201).json(camera);
});

function driver(id:string) {
  const c=cameras.get(id);
  if(!c) throw new Error('Camera not found');
  if(c.protocol!=='visca-udp') throw new Error('Protocol not implemented yet');
  return new ViscaUdpDriver(c.host,c.port);
}

app.post('/api/cameras/:id/move', async(req,res)=>{
  try { await driver(req.params.id).move(req.body.direction as Direction, Number(req.body.panSpeed??8), Number(req.body.tiltSpeed??8)); res.sendStatus(204); }
  catch(e){ res.status(400).json({error:(e as Error).message}); }
});
app.post('/api/cameras/:id/zoom', async(req,res)=>{
  try { await driver(req.params.id).zoom(req.body.direction,Number(req.body.speed??3)); res.sendStatus(204); }
  catch(e){ res.status(400).json({error:(e as Error).message}); }
});
app.post('/api/cameras/:id/home', async(req,res)=>{
  try { await driver(req.params.id).home(); res.sendStatus(204); }
  catch(e){ res.status(400).json({error:(e as Error).message}); }
});
app.post('/api/cameras/:id/presets/:preset', async(req,res)=>{
  try { await driver(req.params.id).recallPreset(Number(req.params.preset)); res.sendStatus(204); }
  catch(e){ res.status(400).json({error:(e as Error).message}); }
});

wss.on('connection',ws=>ws.send(JSON.stringify({type:'hello',version:'0.1.0'})));

server.listen(8765,'127.0.0.1',()=>console.log('PTZ Control Dock: http://127.0.0.1:8765/obs'));
