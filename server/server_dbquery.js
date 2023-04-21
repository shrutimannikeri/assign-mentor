import {client} from "../index.js"
import { ObjectId } from "mongodb";
export async function getPerticlurMentorStudentList(mentorId) {
    return await client.db("studentmentor")
        .collection("students")
        .find({ mentorId: new ObjectId(mentorId) })
        .toArray();
}
export async function unAssignedStudents() {
    return await client.db("studentmentor")
        .collection("students")
        .find({ $or: [{ mentorId: { $exists: false } }, { mentorId: { $eq: '' } }] })
        .toArray();
}
export async function addMentor(data) {
    return await client.db("studentmentor")
        .collection("mentor")
        .insertOne(data);
}
export async function getAllMentors() {
    return await client.db("studentmentor")
        .collection("mentor")
        .find({})
        .toArray();
}
export async function getAllStudents() {
    return await client.db("studentmentor")
        .collection("students")
        .find({})
        .toArray();
}
export const checkStudentExist = async (data) => {

    const isExist = await client.db("studentmentor")
        .collection("students")
        .count({ email: data.email });

    return isExist;
};
export const addStudent = async (data) => {
    const result = await client.db("studentmentor")
        .collection("students")
        .insertOne(data);
    return result;
};
export async function assignMentor(filter) {
    return await client.db("studentmentor")
        .collection("students")
        .updateOne({ _id: new ObjectId(filter.studentID) }, { $set: { mentorId: new ObjectId(filter.mentorID) } });
}
export async function updateMentor(filter) {
    return await client.db("studentmentor")
        .collection("students")
        .updateOne({ _id: new ObjectId(filter.studentID) }, { $set: { mentorId: new ObjectId(filter.mentorID) } });
}
export async function assignMentorMultipleStudent(filter) {
    const studentidlist = filter.studentID.map((studid) => (new ObjectId(studid)));
    const result = await client.db("studentmentor")
        .collection("students")
        .updateMany({ _id: { $in: studentidlist } },
            { $set: { mentorId: new ObjectId(filter.mentorID) } },
            { multi: true }
        );
    return result;
}
