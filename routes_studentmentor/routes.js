import express from 'express'
import { getAllStudents, checkStudentExist, addStudent, getAllMentors, addMentor, assignMentor, updateMentor, unAssignedStudents, getPerticlurMentorStudentList, assignMentorMultipleStudent } from '../server/server_dbquery.js';

const router=express.Router()
//list of students
router.get("/students/",async(req,res)=>{
    
    const studentlist=await getAllStudents();
    res.send({msg:"list of students",studentlist})
    })
    
    
    
    //add students
   
    
     router.post("/addstudent",async(req,res)=>{
        const data=req.body;
    
        //check student present with email id before ADD new student
        const checkstudentexist=await checkStudentExist(data);
     
        checkstudentexist>0?
        res.send({mes:"student already present"})
        :addStudent(data);
        res.send({mes: "added new students successfully"});
    
    })
    
    //get list of mentor
    router.get("/mentors",async(req,res)=>{
        const mentorlist=await getAllMentors();
        res.send({msg:"list of mentors",mentorlist})
        })
    
    //add mentors
    router.post("/addmentor",async(req,res)=>{
        const data=req.body;
        const result=await addMentor(data);
        res.send({mes:"added mentor successfully"});
    })
    
    //assignMentor
    router.post("/assignmentor",async(req,res)=>{
        let filter=req.body;
    
        let data=await assignMentor(filter);
        res.send({msg: "assigned  mentor successfully !!!"});
    
    })
    
    
    //change mentor for perticular student
    router.put("/changeMentor/:studentId",async(req,res)=>{
       
        let filter=req.body;
        let data=await updateMentor(filter);
        res.send({msg: "updated  mentor successfully !!!"});
    })
    
    //get unassigned list
    router.get("/unassignedstudents",async(req,res)=>{
    const studentlist=await unAssignedStudents();
    res.send({msg:"list of unassigned students",studentlist})
    })
    
    //get student list for perticular mentor
    router.get("/students/:mentorId",async(req,res)=>{
        const { mentorId } = req.params;
       
        const studentlist=await getPerticlurMentorStudentList(mentorId);
        studentlist.length > 0 ?
        res.send({msg:"llist of students for the  mentor",studentlist})
        :
        res.send({msg: "NO students assigned"})
        })
    
    //select one mentor and Add multiple Student 
    
    
    router.post("/assignmentor-students",async(req,res)=>{
        let filter=req.body;
        let data=await assignMentorMultipleStudent(filter);
        res.send({msg: "assigned  mentor for selected students successfully !!!"});
    
    })
    
export default router;
    
    
    
    

