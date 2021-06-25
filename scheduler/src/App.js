import logo from './logo.svg';
import React from 'react'
import './App.css';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      name : "",
      starttime : "",
      endtime : "",
      teachername: "",
      time: "",
      day: "",
      week: "",
      teacher : "",
      teacherday : "",
      teacherweek : "",
      record : [],
      recordTeacher:[],
      recordbatch:[],
      recordSchedule:[],
      recordTeacherName:[]
    }
  }

  componentDidMount(){
    this.fetchAllRecords();
    this.fetchBatchAllRecords();
  }
  componentDidUpdate(prevProp,prevState)
  {
    if (prevState.teacher !== this.state.teacher) {
      this.fetchTeacherRecords(this.state.teacher);
    }

    if(prevState.teacherday !== this.state.teacherday){
      this.fetchTeacherRecordsDay(this.state.teacher,this.state.teacherday);
    }

    if(prevState.teacherweek !== this.state.teacherweek){
      this.fetchTeacherRecordsWeek(this.state.teacher,this.state.teacherweek);
    }
  }

  // Function to type in inputs
  handleChange = evt =>{
    this.setState({
      [evt.target.name] : evt.target.value,
    });
  };

  /* Teacher Record */    
  // Function to Submit teacher name
  submitteacher = ()=>{
    var headers = new Headers();
    headers.append("Content-Type","application/json")

    var body = JSON.stringify({ name : this.state.name});
    fetch("http://localhost:8000/api/create",{
      method: "POST",
      headers: headers,
      body: body,
    }).then((response)=>response.json())
    .then((result)=>{
      this.setState({
        name : "",
        showAlert: true,
        alertMsg: result.response,
        alertType: "success",
      })
    })
  }

  // Fetch records of Teachers
  fetchAllRecords = ()=>{
    var headers = new Headers();
    headers.append("Content-Type","application-json")

    fetch("http://localhost:8000/api/view",{
      method:"GET",
      headers: headers
    })
    .then((response)=>response.json())
    .then((result)=>{
      console.log("result ",result);
      this.setState({
        recordTeacher : result.response,
      })
    })
    .catch((error)=>console.log("error",error));
  }

  // Fetch records with teacher name
  fetchTeacherRecords = (name)=>{
    var headers = new Headers();
    headers.append("Content-Type","application-json")

    fetch(`http://localhost:8000/api/view/${name}`,{
      method:"GET",
      headers: headers
    })
    .then((response)=>response.json())
    .then((result)=>{
      console.log("result",result);
      this.setState({
        recordTeacherName : result.response,
      })
    })
    .catch((error)=>console.log("error",error));
  }

  // Delete Record of teacher
  deleteTeacher = (id)=>{
    console.log(id);
    fetch("http://localhost:8000/api/delete/"+id,{
      method:"DELETE",
    })
    .then((response)=>response.json())
    .then((result)=>{
      this.setState({
        showAlert:true,
        alertType:"success",
        alertMsg:result.response,
      });
      this.fetchAllRecords();
    })
    .catch((error)=>console.log("Error",error));
  }

  /* Batch Record */
  
  // Function to Submit batch time
  submitbatch = ()=>{
    var headers = new Headers();
    headers.append("Content-Type","application/json")

    var body = JSON.stringify({ starttime : this.state.starttime,endtime : this.state.endtime});
    fetch("http://localhost:8000/api/createbatch",{
      method: "POST",
      headers: headers,
      body: body,
    }).then((response)=>response.json())
    .then((result)=>{
      console.log(result);
      this.setState({
        starttime:"",
        endtime:"",
        showAlert: true,
        alertMsg: result.response,
        alertType: "success",
      })
    })
  }

  // Fetch records of batch time
  fetchBatchAllRecords = ()=>{
    var headers = new Headers();
    headers.append("Content-Type","application-json")

    fetch("http://localhost:8000/api/viewbatch",{
      method:"GET",
      headers: headers
    })
    .then((response)=>response.json())
    .then((result)=>{
      console.log("result Record",result);
      this.setState({
        recordbatch : result.response,
      })
    })
    .catch((error)=>console.log("error",error));
  }

  // Delete Record of Batch
  deleteBatch = (id)=>{
    fetch("http://localhost:8000/api/deletebatch/"+id,{
      method:"DELETE",
    })
    .then((response)=>response.json())
    .then((result)=>{
      this.setState({
        showAlert:true,
        alertType:"success",
        alertMsg:result.response,
      });
      this.fetchBatchAllRecords();
    })
    .catch((error)=>console.log("Error",error));
  }

  /* Schedule Handle */
  // Function to Submit schedule of teacher
  submitSchedule = ()=>{
    var headers = new Headers();
    headers.append("Content-Type","application/json")

    var body = JSON.stringify({ teachername:this.state.teachername,time:this.state.time,day:this.state.day,week:this.state.week});
    fetch("http://localhost:8000/api/createtime",{
      method: "POST",
      headers: headers,
      body: body,
    }).then((response)=>response.json())
    .then((result)=>{
      console.log(result);
      this.setState({
        teachername: "",
        time: "",
        day: "",
        week: "",
        showAlert: true,
        alertMsg: result.response,
        alertType: "success",
      })
    })
  }

  // Fetch records with teacher name and day
  fetchTeacherRecordsDay = (name,day)=>{
    var headers = new Headers();
    headers.append("Content-Type","application-json")
    console.log("Teacher name ",name)
    fetch(`http://localhost:8000/api/view/${name}/${day}`,{
      method:"GET",
      headers: headers
    })
    .then((response)=>response.json())
    .then((result)=>{
      console.log("result",result);
      this.setState({
        recordTeacherName : result.response,
      })
    })
    .catch((error)=>console.log("error",error));
  }

    // Fetch records with teacher name and day
    fetchTeacherRecordsWeek = (name,week)=>{
      var headers = new Headers();
      headers.append("Content-Type","application-json")
      console.log("Teacher name ",name)
      fetch(`http://localhost:8000/api/view/${name}/${week}`,{
        method:"GET",
        headers: headers
      })
      .then((response)=>response.json())
      .then((result)=>{
        console.log("result",result);
        this.setState({
          recordTeacherName : result.response,
        })
      })
      .catch((error)=>console.log("error",error));
    }

  // Delete Record of Schedules
  deleteSchedule = (id)=>{
    fetch("http://localhost:8000/api/deleteSchdule/"+id,{
      method:"DELETE",
    })
    .then((response)=>response.json())
    .then((result)=>{
      this.setState({
        showAlert:true,
        alertType:"success",
        alertMsg:result.response,
      });
      this.fetchBatchAllRecords();
    })
    .catch((error)=>console.log("Error",error));
  }

  render(){
    return(
      <>
        {/* <div className="container">
        {
            this.state.showAlert === true ? 
            <div>
              <h1>Hii</h1>
              <script>alert({this.state.alertMsg})</script>
              {
                this.setState({
                  showAlert:false
                })
              }
            </div>
            : null
          }
        </div> */}
        <div className="container">
          <h1>Time Table Scheduler</h1>
          <form>
            <label className="col-4">Add Teacher Name</label>
            <input className="col-8" type="text" value={this.state.name} onChange={this.handleChange} placeholder="Enter teacher name" name="name"/>
            <button className="submit" onClick={this.submitteacher}>Add Teacher</button>

            <div className="row table">
            <div className="col-4">Name</div>
            <div className="col-4">Delete</div>
          </div>

            {
            this.state.recordTeacher.map((record)=>{
              return(
                <div className="row">
                  <div className="col-4">{record.name}</div>
                  <div className="col-4"><button className="submit" onClick={()=>this.deleteTeacher(record.id)}>Delete</button></div>
                </div>
              )
            })
          }
          </form>

          <form>
            <div className="container">
            <h1>Add Batches</h1>
            <input className="col-4" type="text" value={this.state.starttime} onChange={this.handleChange} placeholder="Enter start time" name="starttime"/>
            <input className="col-4" type="text" value={this.state.endtime} onChange={this.handleChange} placeholder="Enter end time" name="endtime"/>
            <button className="col-4 submit" onClick={this.submitbatch}>Add Schedule</button>
            <div className="col-4"></div>
            </div>
          </form>
          </div>

          <div className="container">
                <div className="row">
                <div className="col-3">StartTime</div>
                <div className="col-3">EndTime</div>
                <div className="col-3">Delete</div>
                </div>
                {
                  this.state.recordbatch.map((record)=>{
                    return(
                      <div className="row">
                        <div className="col-3">{record.starttime}</div>
                        <div className="col-3">{record.endtime}</div>
                        <div className="col-3"><button className="submit" onClick={()=>this.deleteBatch(record.id)}>Delete</button></div>
                      </div>
                    )
                  })
                }
          </div>
          <form>
            <div className="container">
            <h1>Add Schedules for Teachers</h1>
            <div className="row">
            <label className="col-3">Teacher Name</label>
            <select className="col-3" name="teachername" value={this.state.teachername} onChange={this.handleChange}>
              <option>--Please Select--</option>
              {
                this.state.recordTeacher.map((record)=>{
                  return(
                    <option value={record.name}>{record.name}</option>
                  )
                })
              }
            </select>
            <label className="col-3">Schedule Time</label>
            <select className="col-3" name="time" value={this.state.time} onChange={this.handleChange}>
            <option>--Please Select--</option>
              {
                this.state.recordbatch.map((record)=>{
                  return(
                    <option value={record.starttime + " - " +  record.endtime}>{record.starttime + " - " + record.endtime}</option>
                  )
                })
              }
            </select>
            </div> 
            <div className="row">
            <label className="col-3">Schedule Day</label>
            <select className="col-3" name="day" value={this.state.day} onChange={this.handleChange}>
            <option>--Please Select--</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            </select>
            <label className="col-3">Schedule Week</label>
            <select className="col-3" name="week" value={this.state.week} onChange={this.handleChange}>
            <option>--Please Select--</option>
            <option value="Week 1">Week 1</option>
            <option value="Week 2">Week 2</option>
            <option value="Week 3">Week 3</option>
            <option value="Week 4">Week 4</option>
            </select>
            <button className="submit" onClick={this.submitSchedule}>Submit</button>
            </div>
            </div>
          </form>

          <form>
            <div className="container">
            <h1>Teachers Schedule</h1>
            <div className="row">
            <label className="col-3">Teacher Name</label>
            <select className="col-3" name="teacher" value={this.state.teacher} onChange={this.handleChange}>
              <option>--Please Select--</option>
              {
                this.state.recordTeacher.map((record)=>{
                  return(
                    <option value={record.name}>{record.name}</option>
                  )
                })
              }
            </select>
            <label className="col-3">Day</label>
            <select className="col-3" name="teacherday" value={this.state.teacherday} onChange={this.handleChange}>
              <option>--Please Select--</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
            </div>
            <div className="row">
            <label className="col-3">Week</label>
            <select className="col-3" name="teacherweek" value={this.state.teacherweek} onChange={this.handleChange}>
              <option>--Please Select--</option>
              <option value="Week 1">Week 1</option>
              <option value="Week 2">Week 2</option>
              <option value="Week 3">Week 3</option>
              <option value="Week 4">Week 4</option>
            </select>
            </div>
            <div className="container">
            <div className="row">
            <div className="col-2">Name</div>
            <div className="col-2">Time</div>
            <div className="col-2">Day</div>
            <div className="col-2">Week</div>
            <div className="col-2">Delete</div>
            </div>
            {
            this.state.recordTeacherName.map((record)=>{
              return(
                <div className="row">
                  <div className="col-2">{record.teachername}</div>
                  <div className="col-2">{record.time}</div>
                  <div className="col-2">{record.day}</div>
                  <div className="col-2">{record.week}</div>
                  <div className="col-2"><button className="submit" onClick={()=>this.deleteSchedule(record.id)}>Delete</button></div>
                </div>
              )
            })
          }
                    </div>
          </div>
          </form>       
      </>
    )
  }
}

export default App;
