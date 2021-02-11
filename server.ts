import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
// import { Server as SocketServer } from 'socket.io';
import * as WebSocket from 'ws';
import { SOCKET } from './src/app/shared/constants/constants';

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const expressApp = express();
  const distFolder = join(process.cwd(), 'dist/web-admin/browser');
  let indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  indexHtml = join('admin', indexHtml);

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  expressApp.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  expressApp.set('view engine', 'html');
  expressApp.set('views', distFolder);

  expressApp.get(`/api/*`, (req, res) => {
    console.log(`${new Date().toISOString()} - Got api request: ${req.url}`)
    res.send(`API is not supported`);
  });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  expressApp.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  expressApp.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return expressApp;
}

function run() {
  const port = +process.env.PORT || 3001;

  // Start up the Node server
  const expressApp = app();
  const httpServer = expressApp.listen(port, '0.0.0.0', () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });

  // let socket;
  let wss: WebSocket.Server;
  let clients = [];
  console.log(' before isPrimaryInstance');
  if (isPrimaryInstance()) {
    console.log('isPrimaryInstance');
    // socket = new SocketServer(httpServer, { path: SOCKET.path, cors: { origin: '*' } });
    wss = new WebSocket.Server({ server: httpServer, path: SOCKET.path });
    wss.on('connection', (ws) => {
      clients.push(ws);
      setInterval(() => {
        ws.send(JSON.stringify({ topic: 'date', data: new Date() }))
      }, 13000);
    });
    wss.on('error', err => {
      console.log(err);
    });
    console.log(wss);
  }

  const closeServer = () => {
    // socket?.emit(SOCKET.serverRestartTopic);
    console.log('start close');
    console.log(wss);
    if (wss) {
      console.log('in wss', wss.clients.size, clients.length);
      wss.clients.forEach(ws => {
        console.log(ws.send);
        ws.send(JSON.stringify({ topic: SOCKET.serverRestartTopic, data: new Date() }));
      });
    }
    setTimeout(() => {
      console.log('exit');
      process.exit(0);
    }, 500);
  };

  process.on('SIGTERM', () => closeServer());
  process.on('SIGINT', () => closeServer());
}

function isPrimaryInstance(): boolean {
  const instanceId = process.env.INSTANCE_ID;
  console.log(JSON.stringify({instanceId}));
  return instanceId === undefined || instanceId === '0';
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
