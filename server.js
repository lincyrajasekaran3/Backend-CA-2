const express = require("express");
const app = express();
app.use(express.json());

let users=[]
let id=1;

app.post("/api/users", (req, res) => {
    const {username, age,email}=req.body;
    if(!username||!age||!email){
        return res.status(401).json({error: "User Parameters cannot be empty"})
    }
    const user = {id: id++, username,age,email}
    users.push(user)
    res.status(201).json(user);
});

app.get("/api/users", (req, res) => {
    res.json(users);
});

app.get("/api/users/:id", (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
});
  
app.put("/api/users/:id", (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: "User not found" });
   
    const { name, email, age } = req.body;
    if (name) user.username = name;
    if (email) user.email = email;
    if (age) user.age = age;
  
    res.json(user);
});

app.delete("/api/users/:id", (req, res) => {
    users = users.filter((u) => u.id !== parseInt(req.params.id));
    res.json({message: "User deleted successfully"});
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
  
  



