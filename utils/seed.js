const connection = require('../config/connection.js');
const { User, Thought, Reaction } = require('../models');
const { getEmail, getRandUsername, getRandMessage, getRandReaction } 
= require('./data')

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});
    await Thought.deleteMany({});

    function randomExcluded(min, max, excluded) {
        var n = Math.floor(Math.random() * (max-min) + min);
        if (n >= excluded) n++;
        return n;
    }

    const users = [];

    // Generate 15 users and their thoughts, reactions, and friends
    for (let i = 0; i < 15; i++) {
        const username = getRandUsername(1).toString();
        const email = getEmail(username);  
        const friendLength = Math.floor(Math.random() * 3) + 1;

        users.push({
            username,
            email,

        });
    }
    await User.collection.insertMany(users);
    // Find all users and loop through to insert a randomly chosen other User ObjectId into friends:
    const usersArr = await User.find({});
    for (let i = 0; i < usersArr.length; i++) {
        id = usersArr[i]._id;
        
        const friendLength = Math.floor(Math.random() * 3) + 1;
        var friendIndex = 0;
        var friendArr = [];
        // get 3 random indexes from usersArr
        for (let j = 0; j < friendLength; j++) {
            friendIndex = randomExcluded(0, usersArr.length-1, i);
            friendArr.push(usersArr[friendIndex]._id);
        }
        await User.findOneAndUpdate(
            { _id: id },
            { $push: { friends:  friendArr }},
            { new: true }
        );
    }

    // Generate 30 thoughts
    const thoughts = [];
    
    for (let i = 0; i < 30; i++) {
        const reactions = [];
        // grabs random message from data.js
        const thought = getRandMessage(1).toString();
        // assigns random index
        randIndex = Math.floor(Math.random() * usersArr.length);
        const usernameTh = usersArr[randIndex].username

        const reactionLength = Math.floor(Math.random() * 3) + 1;
        for (let j = 0; j < reactionLength; j++) {
            const reaction = getRandReaction();
            const reactionObj = { reaction: reaction}
            reactions.push(reactionObj);
            
            }
        console.log(reactions);
        thoughts.push ({
            thoughtText: thought,
            username: usernameTh,
            reactions: reactions,
        });
        
        await Thought.collection.insertOne(thoughts[i]);
        await User.findOneAndUpdate(
            { _id: usersArr[randIndex]._id },
            { $push: { thoughts:  thoughts[i]._id }},
            { new: true }
        );
    }





    // console.table(users);
    // console.table(thoughts);

    console.info('Seeding complete! 🌱');
    process.exit(0);
});