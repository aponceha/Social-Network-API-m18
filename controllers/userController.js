const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');



module.exports = {
    // get all users

    getUsers(req, res) {

        User.find({})
            .select('-__v')
            // .populate('thoughts')    
            .then(async (users) => {
                return res.json(users);
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json(err);            
            });
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                return res.json(user);
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json(err);
            });
    },
    // update user by ID
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true }
        )
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                Thought.updateMany(
                    {username: user.username}, 
                    {$set: {username: req.body.username}, }, 
                    {multi:true}  )
                .then((thought) => {
                    console.log(thought);
                    return res.json(thought);
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json(err);
                });

                
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json(err);
            });
    },

    createUser(req, res) {
        User.create(req.body)
            .then((user) => {
                return res.json(user);
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json(err);
            });
    },
    // delete user by ID and remove from friends list of other users
    // deleteUser(req, res) {
    //     User.updateMany({friends: req.params.userId}, {$pull: {friends: req.params.userId}})
    //         .then((user) => {
    //         console.log(user);
    //         !user
    //         ? res.status(404).json({ message: 'No user found with this id!' })
    //         : User.findOne({ _id: req.params.userId })
    //         })
    //         .then((user) => {
    //         console.log(user.username);
    //         Thought.deleteMany({username: user.username})
    //         })
    //         .then(() => {
    //         return 
    //         })
    //         .then(() => 
    //             res.json("User deleted"))
    //         .catch((err) => {
    //             console.error(err);
    //             return res.status(500).json(err);
    //         });
    // },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                Thought.deleteMany({_id: { $in: user.thoughts}})
                .then(() => {
                    return res.json("User deleted");
                })
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json(err);
            })
        }
    ,
    // add friend to user's friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        )
        .then((user) => {
            !user
                ?res
                    .status(404)
                    .json({ message: 'No user found with this id!' })
            :res.json(user);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json(err);
        })
    },

    // delete friend from user's friend list
    
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
        .then((user) => {
            !user
                ?res
                    .status(404)
                    .json({ message: 'No user found with this id!' })
                :res.json(user);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json(err);
        });
    },

}