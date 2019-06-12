const express = require('express');
const next = require('next');
const compression = require('compression') 
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(compression());

    server.get('/line/:id', (req, res) => {
      const actualPage = '/line';
      const queryParams = { id: parseInt(req.params.id) };
      app.render(req, res, actualPage, queryParams);
    });

    server.use(
      '/static',
      express.static(`${__dirname}/static`, {
        maxAge: '365d',
      }),
    );

    server.get('*', (req, res) => handle(req, res));

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
