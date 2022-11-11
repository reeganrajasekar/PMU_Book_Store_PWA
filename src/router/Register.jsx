import Logo from '../assets/icon.png'
import React from 'react'
import {Link , useHistory} from "react-router-dom";

export default function Register(){
    const history = useHistory();
    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [id, setId] = React.useState();
    const [dept, setDept] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [staff, setStaff] = React.useState(false);
    const [err,setErr] = React.useState("")
    return(
        <>
        <div style={{display:'flex',justifyContent:'center',width:"100vw",height:"100%",marginTop:40,alignItems:'center',flexDirection:'column'}}>
            <img src={Logo} width="100" height="100" />
            <h1 style={{padding:"20px 0px 20px 0px",fontSize:26,fontWeight:'bold',color:"#042744"}}>
                <b>PMU Bookstore</b>
            </h1>
                <input onChange={(i)=>{setName(i.target.value)}} placeholder='Name' type="text" required style={{marginBottom:20,width:300,height:50,borderWidth:1,borderRadius:20,borderColor:'#042744',backgroundColor:'#eee',fontSize:22,textAlign:'left',padding:15,}}/>
                <input onChange={(i)=>{setId(i.target.value)}} placeholder='ID Number' type="text" required style={{marginBottom:20,width:300,height:50,borderWidth:1,borderRadius:20,borderColor:'#042744',backgroundColor:'#eee',fontSize:22,textAlign:'left',padding:15,}}/>
                <select style={{marginBottom:20,width:300,height:50,borderWidth:1,borderRadius:20,borderColor:'#042744',backgroundColor:'#eee',fontSize:22,textAlign:'left',paddingLeft:15,}} onChange={(i)=>{setDept(i.target.value)}} required >
                  <optgroup label="College of Engineering">
                    <option disabled defaultValue={""} selected>Department</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                  </optgroup>
                  <optgroup label="College of Computer Engineering and Science">
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Software Engineering">Software Engineering</option>
                  </optgroup>
                  <optgroup label="College of Business Administration">
                    <option value="Accounting">Accounting</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Finance">Finance</option>
                    <option value="Human Resource Management">Human Resource Management</option>
                    <option value="Management Information Systems">Management Information Systems</option>
                  </optgroup>

                  <optgroup label="College of Architecture and Design">
                    <option value="Architecture (ARCH)">Architecture (ARCH)</option>
                    <option value="Interior Design (IDES)">Interior Design (IDES)</option>
                    <option value="Graphic Design (GDES)">Graphic Design (GDES)</option>
                  </optgroup>

                  <optgroup label="College of Sciences and Human Studies">
                    <option value="Master of Science in Education and Human Development">Master of Science in Education and Human Development</option>
                  </optgroup>

                  <optgroup label="College of LAW">
                    <option value="College of LAW">College of LAW</option>
                  </optgroup>

                </select>
                <input onChange={(i)=>{setEmail(i.target.value)}} placeholder='Email' type="email" required style={{marginBottom:20,width:300,height:50,borderWidth:1,borderRadius:20,borderColor:'#042744',backgroundColor:'#eee',fontSize:22,textAlign:'left',padding:15,}}/>
                <input onChange={(i)=>{setPassword(i.target.value)}} placeholder='Password' type="password" required style={{marginBottom:20,width:300,height:50,borderWidth:1,borderRadius:20,borderColor:'#042744',backgroundColor:'#eee',fontSize:22,textAlign:'left',padding:15,}}/>
                <ul>
                  <li>Password should be at least 12 characters</li>
                  <li>mixture of both uppercase and lowercase letters</li>
                  <li>mixture of letters and numbers</li>
                </ul>
                <p style={{color:'red',textAlign:"center"}}>{err}</p>

                <div style={{display:"inline-block"}}>
                    <input onClick={()=>{setStaff((staff)?false:true)}} type="checkbox" name=""  style={{marginRight:7,marginBottom:20,borderWidth:1,borderRadius:20,borderColor:'#042744',backgroundColor:'#eee',fontSize:22,textAlign:'left',paddingLeft:15,}}/>
                    <label style={{color:"#042744",marginBottom:20}}>Register as an Academic Staff</label>
                </div>

                <button
                    style={{
                        paddingLeft: 80,
                        paddingRight: 80,
                        fontSize:22,
                        paddingTop:8,
                        paddingBottom:8,
                        color:'#fff',
                        border:'none',
                        borderRadius:30,
                        backgroundColor: '#F67327'
                    }}

                    onClick={()=>{
                        if(email!="" && name!="" && id!="" && password!="" && dept!=""){
                          let stureg = /[0-9]@(pmu)\.edu\.sa\b$/g;
                          let reg = /[a-zA-Z0-9]@(pmu)\.edu\.sa\b$/g;
                          let regstuid = /[0-9]\b$/g;
                          let regid = /[FAC][0-9]+[\d\.\-\/]+[0-9]/g;
                          if (reg.test(email) === true && staff) {
                            if(regid.test(id) === true){
                              if(password.length >= 12){
                                let format = /[A-Z]/;
                                let format1 = /[a-z]/;
                                if(format.test(password)===true && format1.test(password)===true){
                                  let newFormat =  /[0-9]/;
                                  if(newFormat.test(password)===true){
                                    fetch('https://wakeful-flower-wind.glitch.me/api/staff/register', {
                                      method: 'POST',
                                      body: JSON.stringify({
                                        staff_id:id,
                                        staff_name:name,
                                        staff_email:email,
                                        staff_password:password,
                                        dept:dept
                                      }),
                                      headers: {
                                        "Content-Type": "application/json"
                                      },
                                    })
                                    .then((response) => response.json())
                                    .then((responseJson) => {
                                      if(responseJson.code == "registered"){
                                        history.push("/")
                                      }else{
                                        setErr(responseJson.code);
                                      }
                                    })
                                    .catch((error) => {
                                      setErr("Server Error Try Again")
                                      console.error(error);
                                    });
                                  }else{
                                    setErr("Password should be a mixture of letters and numbers")
                                  }
                                }else{
                                  setErr("Password should be a mixture of both uppercase and lowercase letters")
                                }
                              }else{
                              setErr("Password length should be at least 12 characters")
                              }
                            }else{
                              setErr("ID Number is incorrect")
                            }
                          }else if(stureg.test(email) === true && !staff){
                            if(regstuid.test(id) === true){
                              if(password.length >= 12){
                                let format = /[A-Z]/;
                                let format1 = /[a-z]/;
                                if(format.test(password)===true && format1.test(password)===true){
                                  let newFormat =  /[0-9]/;
                                  if(newFormat.test(password)===true){
                                    fetch('https://wakeful-flower-wind.glitch.me/api/register', {
                                      method: 'POST',
                                      body: JSON.stringify({
                                        student_id:id,
                                        student_name:name,
                                        student_email:email,
                                        student_password:password,
                                        dept:dept
                                      }),
                                      headers: {
                                        "Content-Type": "application/json"
                                      },
                                    })
                                    .then((response) => response.json())
                                    .then((responseJson) => {
                                      if(responseJson.code == "registered"){
                                        history.push("/")
                                      }else{
                                        setErr(responseJson.code);
                                      }
                                    })
                                    .catch((error) => {
                                      setErr("Server Error Try Again")
                                      console.error(error);
                                    });
                                  }else{
                                    setErr("Password should be a mixture of letters and numbers")
                                  }
                                }else{
                                  setErr("Password should be a mixture of both uppercase and lowercase letters")
                                }
                              }else{
                                setErr("Password length should be at least 12 characters")
                              }
                            }else{
                              setErr("ID Number is incorrect")
                            }
                          }else{
                            setErr("Email is incorrect")
                          }
                        }else{
                          setErr("Enter all details!")
                        }
                    }}
                >
                    Register
                </button>

            <p
            style = {{marginTop:20,fontSize:18,color:'#042744'}}
            >
            Do you have an Account? <Link to="/"  style={{color:"#F67327"}}>Click here</Link>
            </p>
        </div>
        
        </>
    )
}