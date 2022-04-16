/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const { db } = router;

const SECRET_KEY = 'SECRET_KEY';

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.post('/auth', (req, res) => {
  const { username, password } = req.body;
  const user = db
    .get('users')
    .value()
    .find((_user) => _user.username === username);

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  if (user.password !== password) {
    return res.status(400).json({ message: 'Invalid password' });
  }
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    algorithm: 'HS256',
  });
  res.json({ token });
});
server.use(router);
server.listen(8001, () => {
  // eslint-disable-next-line no-console
  console.log('JSON Server is running');
});
