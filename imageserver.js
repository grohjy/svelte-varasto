import { handler } from './build/handler.js';
import express from 'express';
// export function gfExpress() {
const app = express();

app.use('/img', express.static('data/img'));
// console.log("dir:",__dirname)
// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

app.listen(3000, () => {
	console.log('listening on port 3000...');
});
// }
