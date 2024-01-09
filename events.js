const EventEmitter = require("events");
const fs = require('fs');
const rr = fs.createReadStream('./data.json');

rr.on('data', (data) => {
  //console.log({data});
});

rr.on('end', () => {
  //console.log('streaming ended');
});



const em = new EventEmitter();
em.on("demo", (data) => {
  console.log("demo", data);
});
setTimeout(()=>{
  em.emit("demo",{name:"my dummy project"});
},5000)

