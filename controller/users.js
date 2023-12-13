const fs = require("fs");
//const index = fs.readFileSync("index.html", "utf-8");
const path = require('path');
const data = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data.json'), 'utf-8'));
const users = data.users;


exports.getAllUsers = (req, res) => {
    res.json(users);
  }
  
exports.getUser =(req, res) => {
    const id = +req.params.id;
    const user = users.find(p => p.id === id);
    res.json(user);
  }
  
exports.createUser = (req, res) => {
    users.push(req.body);
    res.json(req.body);
  }
  
exports.replaceUser = (req, res) => {
    const id = +req.params.id;
    const userIndex = users.findIndex(p => p.id==id)
    users.splice(userIndex, 1, {...req.body, id:id})
    res.status(201).json();
  }
  
exports.updateUser = (req, res) => {
    const id = +req.params.id;
    const userIndex = users.findIndex(p => p.id==id);
    users.splice(userIndex, 1, {...users[userIndex], ...req.body});
    res.status(201).json({ type: "PATCH", status:"UPDATED" });
    }
  
exports.deleteUser = (req, res) => {
      const id = +req.params.id;
      const userIndex = users.findIndex(p => p.id==id)
      users.splice(userIndex, 1);
      res.status(200).json({ type: "DELETE", status:"DELETED" });
    }
  