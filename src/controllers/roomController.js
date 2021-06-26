const { open } = require('sqlite')
const Database = require('../db/config')

module.exports = {
    async create(req, res) {

        const db = await Database()

        const password = req.body.password

        let roomID

        let isRoom = true

        while (isRoom) {

            for (var i = 0; i < 6; i++) {

                i == 0 ? roomID = Math.floor(Math.random() * 10).toString() :

                    roomID += Math.floor(Math.random() * 10).toString()

            }

            const roomExistID = await db.all(`SELECT id FROM rooms`)

            let isRoom = roomExistID.some(roomExistID => roomExistID === roomID)


            if (isRoom == false) {

                await db.run(`INSERT INTO rooms (
                    id, 
                    password) VALUES (
                        ${parseInt(roomID)},
                        '${password}'
                        )`)
                break

            }

        }

        await db.close()

        res.redirect(`/room/${roomID}`)


    },

    async open(req, res) {

        const db = await Database()

        const roomID = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomID} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomID} and read = 1`)

        let noQuestions

        if(questions.length == 0) {
            if(questionsRead.length ==0){
                noQuestions = true
            }
        }
        

        res.render('room', { roomID: roomID, questions: questions, questionsRead: questionsRead, noQuestions: noQuestions})


    },

    async enter(req, res) {

        const db = await Database()

        const roomID = req.body.roomID

        const roomExistID = await db.all(`SELECT * FROM rooms WHERE id`)

        let checkRoom = false

        
       roomExistID.forEach((room => {

            if(room.id == roomID){

                checkRoom = true
            }


       }))

       checkRoom ? res.redirect(`/room/${roomID}`) :  res.redirect(`not-found`);

     
      
        await db.close()

    
    
        
    }
}