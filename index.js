const express = require('express');
const formidable = require('formidable');
const app = express();
var mammoth = require("mammoth");
 
app.get('/', (req, res) => {
    res.send(`
    <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
  `);
});
 
app.post('/api/upload', async (req, res, next) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        let output = await getDataProcess(files);
        //let dao == await save_indb(output)
        console.log("OP", output);
        res.json({ output });
 
    });
});
 
app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000 ...');
});
 
function extractEmails(text) {
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
}
 
function extractPhoneNo(text) {
    return text.match(/\(?([ 0-9]{3,4})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/);
}
 
function extractName(text) {
    return text.split("\n") || text.split("\n");
}
 
let getDataProcess = async (files) => {
    let result = await mammoth.extractRawText({ path: files.someExpressFiles.path })
    let text = result.value; 
    email = extractEmails(text);
    if (email && email.length > 0){
        emailID =  email[0].trim()
        console.log("Email: ", email[0].trim());
    }
    Phone = extractPhoneNo(text);
    if (Phone && Phone.length > 0){
        PhoneNo = Phone[0].trim()
        console.log("Phone No: ", Phone[0].trim());
    }
    Name = extractName(text);
    if (Name && Name.length > 0){
        Candidate_Name = Name[0].trim()
        console.log("First Name: ", Name[0].trim());
    }
    return { emailID, PhoneNo, Candidate_Name }
}