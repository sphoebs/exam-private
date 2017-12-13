/**
 * Created by fabio on 02/12/2017.
 */


const express = require('express'),
    bodyParser = require('body-parser');
const assignments = express.Router()

var uuid = require('uuid-v4');

const deliveredAssignments = []



assignments.get('/', function (req, res) {
    //console.log('get, delivering:',deliveredAssignments)
//TODO: check if there is a filter, and filter
    res.json(deliveredAssignments)

})

assignments.post('/', function (req, res) {
    const newAssignment = req.body
    newAssignment.assignmentID = uuid()
    deliveredAssignments.push(newAssignment)
    //console.log('post',newAssignment)
    res.json(newAssignment)
})

// assignments.put('/', function (req, res) {
//     console.log('put',req.body)
//     res.json(req.body)
// })

assignments.get('/:assignmentID', function (req, res) {
    const assignmentID = req.params.assignmentID
    const i = deliveredAssignments.findIndex(item => {return item.assignmentID === assignmentID})
    res.json(deliveredAssignments[i])
})

assignments.put('/:assignmentID', function (req, res) {
    const assignmentID = req.params.assignmentID
    const i = deliveredAssignments.findIndex(item => {return item.assignmentID === assignmentID})
    deliveredAssignments[i] = req.body
    res.json(deliveredAssignments[i])
})

assignments.delete('/:assignmentID', function (req, res) {
    // console.log('delete request:',req.body.assignmentID)
    // console.log('deliveredAssignments:',deliveredAssignments[0].assignmentID)

    const assignmentID = req.params.assignmentID
    const i = deliveredAssignments.findIndex(item => {return item.assignmentID === assignmentID})
    const deleted = deliveredAssignments[i]

    deliveredAssignments.splice(i,1)

    res.json(deleted)
})

module.exports = assignments