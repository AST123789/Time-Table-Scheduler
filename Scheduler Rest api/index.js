const express = require('express')
const app = express();
const mysql = require("mysql");
const bodyParser = require('body-parser');
var cors = require('cors')

app.use(cors())

// parse application/json
app.use(bodyParser.json())

// create database connection
const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"schedule"
});

conn.connect((err)=>{
    if(err) throw err
    
    console.log("Mysql connected");
});

/* Teacher Record Handler */
// create new record of teachers
app.post("/api/create",(req,res)=>{
    let data = { name:req.body.name};
    let sql = "INSERT INTO teachers SET ?";
    let query = conn.query(sql,data,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({status:200, error:null,response:"New Teacher added successfully"}));
    });
});

// For fetching teacher data
app.get("/api/view",(req,res)=>{
    let sql = "SELECT * FROM teachers";
    let query = conn.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({status:200,error:null,response:result}));
    });
});

// delete a teacher record
app.delete("/api/delete/:id",(req,res)=>{
    let sql = "DELETE from teachers WHERE id="+req.params.id+"";
    let query = conn.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({status:200,error:null,response:"Teacher deleted successfully"}));
    });
});
/* Teacher Record Handler End*/

/* Batch Record Handler */
// create new record of batchTime
app.post("/api/createbatch",(req,res)=>{
    let data = { starttime:req.body.starttime,endtime:req.body.endtime};
    let sql = "INSERT INTO batch SET ?";
    let query = conn.query(sql,data,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({status:200, error:null,response:"New Batch added successfully"}));
    });
});

// For fetching batchTime
app.get("/api/viewbatch",(req,res)=>{
    let sql = "SELECT * FROM batch";
    let query = conn.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({status:200,error:null,response:result}));
    });
});

// delete a batch record
app.delete("/api/deletebatch/:id",(req,res)=>{
    let sql = "DELETE from batch WHERE id="+req.params.id+"";
    let query = conn.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({status:200,error:null,response:"Batch deleted successfully"}));
    });
});
/* Batch Record Handler End*/

app.post('/api/createtime', (req, res)=>{
    conn.query("SELECT * FROM timetable WHERE ??=? and ??=? and ??=? and ??=?",["teachername",req.body.teachername,"time",req.body.time,"day",req.body.day,"week",req.body.week]
    ,(err,rows)=>{
    if(err) {
        return console.log(err);
    }

    if (!rows.length)
    {
        let data = { teachername:req.body.teachername,time:req.body.time,day:req.body.day,week:req.body.week}
        conn.query('INSERT INTO timetable SET ?',data,function(err, results){
            return res.send(JSON.stringify({status:200, error:null,response:"New Teacher time table added successfully"}));
        });
    }
    else
    {
        return res.send("Teacher Already exist");
    }
});

});



// show a single teacher time table record
app.get("/api/view/:name",(req,res)=>{
    conn.query("SELECT * FROM timetable WHERE ??=?",["teachername",req.params.name],(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({status:200,error:null,response:result}));
    });
});

// show a single teacher time table record daywise
app.get("/api/view/:name/:day",(req,res)=>{
    conn.query("SELECT * FROM timetable WHERE ??=? and ??=?",['teachername',req.params.name,'week',req.params.day],(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({status:200,error:null,response:result}));
    });
});

// show a single teacher time table record weekwise
app.get("/api/view/:name/:week",(req,res)=>{
    conn.query("SELECT * FROM timetable WHERE ??=? and ??=?",['teachername',req.params.name,'week',req.params.week],(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({status:200,error:null,response:result}));
    });
});

// delete a record from schedules
app.delete("/api/deleteSchdule/:id",(req,res)=>{
    let sql = "DELETE from timetable WHERE id="+req.params.id+"";
    let query = conn.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({status:200,error:null,response:"Record deleted successfully"}));
    })
})

// update a record
// app.put("/api/update/",(req,res)=>{
//     let sql = "UPDATE timetable SET name='"+req.body.name+"',location='"+req.body.location+"' WHERE id="+req.body.id;
//     let query = conn.query(sql,(err,result)=>{
//         if(err) throw err;
//         res.send(JSON.stringify({status:200,error:null,response:"Record updated successfully"}));
//     })
// })

app.listen(8000,()=>{
    console.log("Server runnong at port 8000");
});