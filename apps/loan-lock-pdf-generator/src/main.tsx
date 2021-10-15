import express from 'express';
import ReactPDF from '@react-pdf/renderer';
import LoanlockPdfTemplate from '@guaranty/loan-lock-pdf-template';

const app = express();

app.get('/api', async (req, res) => {
  // res.send({ message: 'Welcome to lock-loan-pdf-generator!' });

  try {
  const pdfStream = await ReactPDF.renderToStream(<LoanlockPdfTemplate />);
  res.setHeader('Content-Type', 'application/pdf');
pdfStream.pipe(res);
pdfStream.on('end', () => console.log('Done streaming, response sent.'));
  } catch (error) {
    console.log('error', error);
  } 

});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
