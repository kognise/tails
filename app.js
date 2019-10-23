import path from 'path';
import express from 'express';
import hbs from 'hbs';
import assetsRouter from './routes/assets';
import homeRouter from './routes/home';
import projectsRouter from './routes/projects';

const app = express();

// config
app.enable('case sensitive routing');
app.set('json spaces', 2);
app.disable('strict routing');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.disable('x-powered-by');

app.engine('hbs', hbs.__express);
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
hbs.localsAsTemplateData(app);

// middleware
app.use('/', express.json());
app.use('/', express.urlencoded({ extended: true }));

// assets
app.use('/css', assetsRouter.cssRouter);
app.use('/', express.static(path.join(__dirname, 'public')));

// routes
app.get('/', (req, res) => res.redirect('/home'));
app.use('/home', homeRouter);
app.use('/projects', projectsRouter);

app.on('listening', () => console.log('server restarted'));
app.listen(3000);
