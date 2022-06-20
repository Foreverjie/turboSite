require('dotenv').config();
import express from 'express';
import config from 'config';

const app = express();

const port = config.get('port') || 8080;

// Testing
app.get('/healthChecker', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to TurboSite Server😂😂👈👈',
  });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});