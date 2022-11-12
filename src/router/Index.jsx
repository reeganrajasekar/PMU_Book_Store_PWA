import Logo from '../assets/icon.png'
import React from 'react'
import {Link , useHistory} from "react-router-dom";


export default function Login(){
    const history = useHistory();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [staff, setStaff] = React.useState(false);
    const [err,setErr] = React.useState("")
    React.useEffect(() => {
        document.body.style = "background-color:#F5DBCC !important;display:flex";
        async function mine(){
          const jsonValue = localStorage.getItem('Login');
          if(jsonValue=="student"){
            history.push('/home')
          }else if(jsonValue=="staff"){
            history.push('/staffHome')
          }else{
            history.push('/')
          }
        }
        mine();
    } , []);

    return(
        <>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',width:"100vw",height:"100%",marginTop:40}}>
            <img src={Logo} width="100" height="100"/>
            <h1 style={{padding:"20px 0px 20px 0px",fontSize:26,fontWeight:'bold',color:"#042744"}}>
                <b>PMU Bookstore</b>
            </h1>

                <input onChange={(i)=>{setEmail(i.target.value)}} placeholder='Email' type="email" style={{marginBottom:20,width:300,height:50,borderWidth:1,borderRadius:20,borderColor:'#042744',backgroundColor:'#eee',fontSize:22,textAlign:'left',padding:15,}}/>
                <input onChange={(i)=>{setPassword(i.target.value)}} min={12} placeholder='Password' type="password" style={{marginBottom:20,width:300,height:50,borderWidth:1,borderRadius:20,borderColor:'#042744',backgroundColor:'#eee',fontSize:22,textAlign:'left',padding:15,}}/>
                <p style={{color:'red',textAlign:"center"}}>{err}</p>
                <div>
                    <input onClick={()=>{setStaff((staff)?false:true)}} type="checkbox" name=""  style={{marginRight:7,marginBottom:20,borderWidth:1,borderRadius:20,borderColor:'#042744',backgroundColor:'red !important',fontSize:22,textAlign:'left',paddingLeft:15,}}/>
                    <label style={{color:"#042744",marginBottom:20}}>login as an Academic Staff</label>
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
                      if(email!="" && password!=""){
                        let stureg = /[0-9]@(pmu)\.edu\.sa\b$/g;
                        let reg = /[a-zA-Z0-9]@(pmu)\.edu\.sa\b$/g;
                        if (reg.test(email) === true && staff) {
                          document.getElementById("loader").style.display = "block"
                          fetch('https://wakeful-flower-wind.glitch.me/api/staff/', {
                              method: 'POST',
                              body: JSON.stringify({
                                staff_email:email,
                                staff_password:password
                              }),
                              headers: {
                                "Content-Type": "application/json"
                              },
                          })
                          .then((response) => response.json())
                          .then(async (data) => {
                            if(data.code=="Ok"){
                              const jsonValue = JSON.stringify(data.staff)
                              localStorage.setItem('Login','staff')
                              localStorage.setItem('data',jsonValue)
                            document.getElementById("loader").style.display = "none"
                              history.push("/staffHome")
                            }else{
                              setErr(data.code);
                            }
                          })
                          .catch((error) => {
                            setErr("Server Error Try Again")
                            console.error(error);
                          });
                        }else if(stureg.test(email) === true && !staff){
                          document.getElementById("loader").style.display = "block"
                          fetch('https://wakeful-flower-wind.glitch.me/api/', {
                            method: 'POST',
                            body: JSON.stringify({
                              student_email:email,
                              student_password:password
                            }),
                            headers: {
                              "Content-Type": "application/json"
                            },
                          })
                          .then((response) => response.json())
                          .then(async (data) => {
                            if(data.code=="Ok"){
                              const jsonValue = JSON.stringify(data.student)
                              localStorage.setItem('Login','student')
                              localStorage.setItem('data',jsonValue)
                              localStorage.setItem('intro',false)
                              document.getElementById("loader").style.display = "none"
                              history.push("/home")
                            }else{
                              setErr(data.code);
                            }
                          })
                          .catch((error) => {
                            setErr("Server Error Try Again")
                            console.error(error);
                          });
                        }else{
                          setErr("Email is incorrect!")
                        }
                      }else{
                        setErr("Enter all details!")
                      }
                    }}
                >
                    Login
                </button>
                <a href="https://wakeful-flower-wind.glitch.me/api/forgot" target={"blind"} style={{padding:30,color:'#F67327'}}>Forgot Password?</a>

            <p
            style = {{marginTop:10,fontSize:18,color:'#042744'}}
            >
            Don’t you have an Account? <Link to="register"  style={{color:"#F67327"}}>Click here</Link>
            </p>
        </div>
        </>
    )
}