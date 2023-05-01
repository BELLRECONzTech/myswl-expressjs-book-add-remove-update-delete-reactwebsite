import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()


const db = mysql.createConnection ({
    host: "localhost",
    user : "root",
    password : "Bellrecon@2536",
    database : "test",
})

//If there is a auth problem
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Bellrecon@2536';

app.use(express.json())
app.use(cors())

app.get ("/" , (req,res)=>{
    res.json ("hello world")
})

app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)"
    const values =[
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,]

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Book Has Been Created Successfully")
    })
})

app.delete("/books/:id", (req,res)=>{
    const bookId =req.params.id
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q,[bookId],(err,data)=>{
        if (err) return res.json(err)
        return res.json("Book has been successfully")
    })
})

app.put("/books/:id", (req,res)=>{
    const bookId =req.params.id
    const q = "UPDATE books SET `title` = ? ,`desc` = ? , `price` = ? ,`cover` = ? WHERE id = ?"

    const values=[
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q,[...values,bookId],(err,data)=>{
        if (err) return res.json(err)
        return res.json("Book has been update successfully")
    })
})

app.listen(8800, () => {
    console.log ("Connected to backend!")
})