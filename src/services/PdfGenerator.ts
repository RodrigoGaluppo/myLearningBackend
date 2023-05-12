const fs = require('fs');
var path = require('path');
const pdf = require("html-pdf-node")
const ejs = require('ejs');
import stream from 'stream';

interface ICertificateData{
    user:string
    course:string
    date:string
}

const defaultData = {
    user: "rodrigo",
    course:"Matematica A",
    date: "06/01/2022"
};  


export default async ( data:ICertificateData ) => {
    try {
    

        if(data == null)
            data=defaultData

        const filePathName = path.resolve(__dirname, '../views/certificate.ejs');
        
        const htmlString = fs.readFileSync(filePathName).toString();

        let  options = { format: 'A3' };

        const ejsData = ejs.render(htmlString, data);

        let file = {content: ejsData}
       
        return await pdf.generatePdf(file, options).then((pdfBuffer: any) => {
            const pdfStream = new stream.Readable({
                read() {
                  this.push(pdfBuffer); // push buffer into stream
                  this.push(null); // signal the end of stream
                }
              });
              return pdfStream;

        });
        /*.toFile('generatedfile.pdf',(err:any, response:any) => {
            
            if (err) return console.log(err);
            
            return response;
        
        });*/
        
       
    } catch (err) {
        console.log("Error processing request: " + err);
    }


}


