import home from "../assets/Nav/home-color.png"
import collection from "../assets/Nav/collection.png"
import profile from "../assets/Nav/profile.png"
import intro1 from "../assets/search.mp4"
import intro2 from "../assets/request.mp4"
import intro3 from "../assets/status.png"
import { useState,useEffect } from 'react';
import {Link , useHistory} from "react-router-dom";


export default function Home(){
    const history = useHistory();
    const [data,setData] = useState([]);
    const [person_name,setName] = useState("");
    const [person_id,setId] = useState("");
    const [get_time,setGetTime] = useState();
    const [pic, setPic] = useState(null);
    useEffect(() => {
        document.body.style = "background-color:whitesmoke !important;display:block";
        var intro = localStorage.getItem('intro');
        console.log(intro);
        if(intro=="false"){
            document.getElementById("intromodel").style.display="block";
            document.getElementById("vid1").playbackRate = 0.3;
        }

        async function mine(){
            var jsonValue = localStorage.getItem('Login');
            if(jsonValue=="student"){
                history.push('/home')
            }else if(jsonValue=="staff"){
                history.push('/staffHome')
            }else{
                history.push('/')
            }
            var jsonValue = localStorage.getItem("data")
            let list = JSON.parse(jsonValue)
            document.getElementById("loader").style.display = "block"
            fetch('https://wakeful-flower-wind.glitch.me/api/books?dept='+list[0].dept)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                document.getElementById("loader").style.display = "none"
            })
            .catch((error) => {
              alert(JSON.stringify(error));
              console.error(error);
            });
            const student = localStorage.getItem("data")
            const student_list = JSON.parse(student)
            setName(student_list[0].student_name)
            setId(student_list[0].student_id)
          }
          mine();
      },[]);

      const handleFileChange = (e) => {
        if (e.currentTarget.files) {
          setPic(e.currentTarget.files[0]);
        }
      };
    return(
        <>
            <div id="intromodel" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Welcome to PMU Bookstore</h3>
                    </div>
                    <div class="modal-body">
                        <div id="in1" style={{display:"block"}}>
                            <video id="vid1" src={intro1} width="100%" play autoPlay></video>
                        </div>

                        <div id="in2" style={{display:"none"}}>
                            <video id="vid2" src={intro2} controls width="100%" ></video>
                        </div>

                        <div id="in3" style={{display:"none"}}>
                            <img src={intro3} width="100%" />
                        </div>

                        <hr />
                    </div>
                    <div lass="modal-footer" style={{display:"flex",justifyContent:"space-between",padding:"0 20px"}}>
                        <p style={{color:"#444"}} onClick={()=>{
                            document.getElementById("intromodel").style.display="none";
                            localStorage.setItem("intro",true)
                        }}>Skip</p>
                        <p style={{color:"#F67327"}} onClick={()=>{
                            if(document.getElementById("in1").style.display=="block"){
                                document.getElementById("in1").style.display="none"
                                document.getElementById("in2").style.display="block"
                            }else if(document.getElementById("in2").style.display=="block"){
                                document.getElementById("in2").style.display="none"
                                document.getElementById("in3").style.display="block"
                            }else if(document.getElementById("in3").style.display=="block"){
                                document.getElementById("intromodel").style.display="none"
                                localStorage.setItem("intro",true)

                            }
                        }}>Next</p>
                    </div>
                </div>
            </div>


            <div style={{display:"flex",justifyContent:'center',alignItems:'center',flexDirection:'column',width:"100%"}}>
                <div style={{position:'sticky',top:0,padding:10,width:"98vw",backdropFilter:"blur(8px)",borderRadius:"0px 0px 15px 15px"}}>
                    <input onChange={
                        async (text) => {
                            const jsonValue = localStorage.getItem("data")
                            let list = JSON.parse(jsonValue)
                            document.getElementById("loader").style.display = "block"
                            fetch('https://wakeful-flower-wind.glitch.me/api/books?dept='+list[0].dept+'&book_name='+text.target.value)
                              .then((response) => response.json())
                              .then((data) => {setData(data)
                                document.getElementById("loader").style.display = "none"
                            })
                            .catch((error) => {
                              alert("Something went wrong");
                              console.error(error);
                            });
                          }
                    } type="text" style={{width:"100%",height:50,borderRadius:15,border:'1px solid #F67327',fontSize:22,textAlign:'left',paddingLeft:15,}} placeholder="Search "/>
                </div>
                
                {(!data[0])?<p  style={{paddingTop:50,textAlign:'center',fontSize:22,fontWeight:'bold',color:'#F5DBCC'}}>Nothing Found !</p>:""}

                {
                    data.map((item)=>
                        <>
                        <div key={item._id} onClick={()=>{
                            document.getElementById("model"+item._id).style.display="block"
                        }}
                            style={{boxShadow:"0px 0px 2px #F67327",display:"flex",padding:10,justifyContent:'space-evenly',marginLeft:10,flexDirection:'column',marginRight:10,width:"95%",height:'100%',minHeight:150,marginTop:15,borderRadius:10,border:'1px solid #F5DBCC',backgroundColor:'#fff'}}>
                        <span style={{color:'#aaa',fontSize:20}}>Book    :{"\t"}<span style={{color:'#042744'}}>{item.book_name}</span></span>
                        <span style={{color:'#aaa',fontSize:20}}>Author :{"\t"}<span style={{color:'#042744'}}>{item.author_name}</span></span>
                        <span style={{color:'#aaa',fontSize:20}}>ISBN    :{"\t"}<span style={{color:'#042744'}}>{item.ISBN}</span></span>
                        <span style={{color:'#aaa',fontSize:20}}>Edition :{"\t"}<span style={{color:'#042744'}}>{item.version} / {item.year}</span></span>
                        </div>

                        <div id={"model"+item._id} class="modal" >
                            <div class="modal-content"  >
                                <div class="modal-header">
                                    <h2>Create Request:</h2>
                                    <span class="close" onClick={()=>{
                                        document.getElementById("model"+item._id).style.display="none"
                                    }}>&times;</span>
                                </div>
                                <div class="modal-body">
                                    <p>Book Name : {item.book_name}</p>
                                    <p>Author Name : {item.author_name}</p>
                                    <label style={{color:"#999"}}>Schedule Time : </label>
                                    <input type="datetime-local" min={new Date().toISOString().substring(0,16)} class="form-control" onChange={(i)=>{setGetTime(i.target.value)}} name="gettime"/>
                                    <br/>
                                    <label style={{color:"#999"}}>Coupon (pdf) : </label>
                                    <input type="file" accept="application/pdf" id={"file"+item._id} class="form-control" name="file" onChange={handleFileChange}/>
                            
                                    <button style={{width:"100%",height:40,fontSize:18,fontWeight:600,color:"#fff",border:"none",backgroundColor:"#F67327",marginTop:20,borderRadius:10}} onClick={
                                        ()=>{
                                            if(pic!=="" && get_time!=""){
                                                var picimg = document.getElementById("file"+item._id);
                                                const formData = new FormData()
                                                formData.append("student_id",person_id)
                                                formData.append("student_name",person_name)
                                                formData.append("book_id",item._id)
                                                formData.append("book_name",item.book_name)
                                                formData.append("get_time",get_time)
                                                formData.append("file",picimg.files[0])
                                                fetch('https://wakeful-flower-wind.glitch.me/api/request', {
                                                    mode: 'no-cors',
                                                    method: 'POST',
                                                    body: formData,
                                                    headers: {
                                                      "Content-Type": "application/json"
                                                    },
                                                })
                                                .then((response) => {
                                                    history.push("/book")
                                                })
                                                .catch((error) => {
                                                    console.error(error);
                                                })
                                            }else{
                                                alert("Enter all details")
                                            }
                                        }}>Create</button>
                                </div>
                            </div>
                        </div>
                        </>

                    )
                }


                <div style={{height:80}}></div>
            </div>
            <div style={{position: 'fixed', left: 0, right: 0, bottom: 0,height:60,backgroundColor:"#F5DBCC",display:"flex",flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                <Link to="/home">
                    <img style={{width:30,height:30}} src={home} />
                </Link>

                <Link to="/book">
                    <img style={{width:30,height:30}} src={collection} />
                </Link>

                <Link to="/profile">
                    <img style={{width:30,height:30}} src={profile} />
                </Link>
            </div>
        </>
    )
}