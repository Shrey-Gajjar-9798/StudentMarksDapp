import { useState,useEffect } from "react";
import "./demo.css";
const {ethers, BigNumber} = require("ethers");

function App() {

  const [examcode, setexamcode] = useState("");
  const [totalmarks, settotalmarks] = useState();
  const [requiremarks, setrequiremarks] = useState();
  const [studentid, setstudentid] = useState("");
  const [assignsid, setassignsid] = useState("");
  const [aexamcode, setaexamcode] = useState("");
  const [assignmarks, setassignmarks] = useState();
  const [totalstudents, settotalstudents] = useState([]);
  const [getstudentid, setgetstudentid] = useState("");
  const [getexamcode, setgetexamcode] = useState("");
  const [getresult, setgetresult] = useState([]);
  const [obtainedmarks, setobtainedmarks] = useState("");
  const [resultstatus, setresultstatus] = useState("");
  const [assignstatus, setassignstatus] = useState("");

  const handleexamcode = (e) =>{
    setexamcode(e.target.value);
  }
  const handletotalmarks = (e) =>{
    settotalmarks(e.target.value);
  }
  const handlerequiremarks = (e) =>{
    setrequiremarks(e.target.value);
  }
  const handlestudentid = (e) =>{
    setstudentid(e.target.value);
  }
  const handleassignsid = (e) =>{
    setassignsid(e.target.value);
  }
  const handleaexamcode = (e) =>{
    setaexamcode(e.target.value);
  }
  const handleassignmarks = (e) =>{
    setassignmarks(e.target.value);
  }
  const handlegetexamcode = (e) =>{
    setgetexamcode(e.target.value);
  }
  const handlegetstudentid = (e) =>{
    setgetstudentid(e.target.value);
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractadress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "_studentID",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_exam_code",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "_isMarksAssign",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_studentsMarks",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "studentsExamResult",
          "type": "bool"
        }
      ],
      "name": "showDetails",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_exam_code",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_total_marks",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_require_marks",
          "type": "uint256"
        }
      ],
      "name": "add_exam",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_studentID",
          "type": "string"
        }
      ],
      "name": "add_students",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_studentID",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_exam_code",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_assigned_marks",
          "type": "uint256"
        }
      ],
      "name": "assign_marks",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_studentID",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_exam_code",
          "type": "string"
        }
      ],
      "name": "getDetails",
      "outputs": [
        {
          "internalType": "string",
          "name": "studentid",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "examcode",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "studentMarks",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "obtainedmarks",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "Result",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "studentadded",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalstudents",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  useEffect(() => {
    const requestAccounts = async () => {
      await provider.send("eth_requestAccounts", []);
    }

    requestAccounts()
      .catch(console.error)

  }, []);

  const contract = new ethers.Contract(contractadress, abi, signer);

  const addexam = async(e) =>{
    e.preventDefault();
    try {
      const addexamdetails = await contract.add_exam(examcode,parseInt(totalmarks),parseInt(requiremarks));
    } catch (error) {
      alert(error);
    }
    console.log("exam added ",examcode);
    console.log(totalmarks);
    console.log(requiremarks);
  }

  const addstudent = async(e) =>{
    e.preventDefault();
    try {
      const addstudentdetails = await contract.add_students(studentid);
    } catch (error) {
      alert(error.reason);
    }
    console.log("Student is added");
  }

  const addstudentmarks = async(e) =>{
    e.preventDefault();
    try {
      const addstudentmarks = await contract.assign_marks(assignsid,aexamcode,parseInt(assignmarks));
    } catch (error) {
      console.log(error.reason);
    }
  }

  const gettotalstudents = async() =>{
    const totalstudentno = (await contract.totalstudents()).toNumber();
    console.log(totalstudentno);
    let totalstudentsid = [];
    for (let i = 0; i < totalstudentno; i++) {
      totalstudentsid[i] = await contract.studentadded(i);
    }
    settotalstudents(totalstudentsid);
    console.log(totalstudents);
  }

  const getstudentresult = async() =>{
    try {
      const result = await contract.getDetails(getstudentid,getexamcode);
      console.log(result);
      setgetresult(result);
      setobtainedmarks((result.obtainedmarks.toNumber()).toString());
      if (result.Result) {
        setresultstatus("Pass");
      } else {
        setresultstatus("Fail");
      }
      if (result.studentMarks) {
        setassignstatus("Yes");
      } else {
        setassignstatus("No");
      }
    } catch (error) {
      alert(error);
    }
    
  }

  return (
    <>
    <div class="main-block">
      <div class="left-part">
        <img src="https://th.bing.com/th/id/OIP.wWRjqxDJcLTOmb-hgPMZOwHaBh?pid=ImgDet&rs=1"></img>
      </div>
    <div className="rightpart">
      <form onSubmit={addexam}>
        <h1>Marks Management System</h1>
        <div class="info">
          <h3 className="formheading">Add Exam Information</h3>
          <input class="fname" type="text" name="examcode" value={examcode} onChange={handleexamcode} placeholder="Exam Code" />
          <input type="number" name="tmarks" value={totalmarks} placeholder="Total Marks" onChange={handletotalmarks} />
          <input type="number" name="rmarks" value={requiremarks} placeholder="Require Marks" onChange={handlerequiremarks} />
        </div>
        <button type="submit" >Add Exam Information</button>
      </form>
      <form onSubmit={addstudent}>
          <h3 className="addstudent">Add Students</h3>
          <input class="fname" type="text" name="examcode" value={studentid} onChange={handlestudentid} placeholder="Students ID" />
        <button type="submit" href="/">Add Student</button>
      </form>
      </div>
    </div>
    <div className="addstudentmarks">
    <form onSubmit={addstudentmarks} className="assignMarksform">
      <h1>Assign marks</h1>
      <div class="info">
        <h3 className="formheading">Assign Marks</h3>
        <input class="fname" type="text" name="examcode" value={assignsid} onChange={handleassignsid} placeholder="Student Id" />
        <input type="text" name="tmarks" placeholder="Exam Code" value={aexamcode} onChange={handleaexamcode} />
        <input type="text" name="rmarks" placeholder="Assigned Marks" value={assignmarks} onChange={handleassignmarks} />
      </div>
      <button type="submit">Add Marks</button>
    </form>
    <div className="getresult">
    <form >
      <h1>Get Result</h1>
      <div class="info">
        <h3 className="formheading"></h3>
        <input class="fname" type="text" name="examcode" value={getstudentid} onChange={handlegetstudentid}  placeholder="Student Id" />
        <input type="text" name="tmarks" placeholder="Exam Code" value={getexamcode} onChange={handlegetexamcode} />
      </div>
      <button type="button" onClick={getstudentresult}>Get Result</button>
    </form>
    <table className="getresulttable">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Student Id</th>
              <th scope="col">Exam Code</th>
              <th scope="col">Marks Assigned</th>
              <th scope="col">Ontained Marks</th>
              <th scope="col">Result</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>{getresult[0]}</td>
                <td>{getresult[1]}</td>
                <td>{assignstatus}</td>
                <td>{obtainedmarks}</td>
                <td>{resultstatus}</td>
              </tr>   
          </tbody>
        </table>
    </div>
    </div>
    <div className="getstudentsinfo" >
      <div className="gettotalstudent">
      <h1>Total Students : {totalstudents.length}</h1>
      <button type="button" onClick={gettotalstudents} className="totalbtn">Total Students</button>
      </div>
    <table className="infotable">
          <thead className="thead-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Student Id</th>
            </tr>
          </thead>
          <tbody>{
            totalstudents.map((record,i)=>{
              return(
              <tr>
                <td>{i+1}</td>
                <td>{record}</td>
              </tr>
              );
            })
            }    
          </tbody>
        </table>
    </div>
  </>
  );
}
export default App;