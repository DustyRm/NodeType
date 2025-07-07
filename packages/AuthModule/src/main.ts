import { app } from './server';
import * as dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📚 Swagger docs available at http://localhost:${port}/api-docs`);
});
