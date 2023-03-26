const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction} = require('../models');

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            // .sort({ _id: -1 })
            .then((thoughts) => {
                res.json(thoughts);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json(err);
            });
    },

    // create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                console.log(thought);
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $push: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json(user);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json(err);
            });
    },

    //  get a single thought by its _id and populated thought's reactions
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .populate({
                path: 'reactions',
                select: '-__v',
            })
            .select('-__v')
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                res.json(thought);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json(err);
            });
    },

    // Update a thought by its _id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId }, 
            { $set: req.body },
            { new: true, runValidators: true,}
        )
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                res.json(thought);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json(err);
            });
    },

    // delete a thought by its _id

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id!' })
                    : Reaction.deleteMany({ _id: { $in: thought.reactions } })
                        .then(() => {
                            return User.findOneAndUpdate(
                                { _id: req.params.userId },
                                { $pull: { thoughts: thought._id } },
                                { new: true }
                            );
                        })
                        .then((user) => {
                            if (!user) {
                                return res.status(404).json({ message: 'No user found with this id!' });
                            }
                            res.json(user);
                        })
                        .catch((err) => {
                            console.error(err);
                            res.status(500).json(err);
                        });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json(err);
            });
    },

    // create a reaction stored in a single thought's reactions array field

    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions:  req.body } },
            { new: true }
        )
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                res.json(thought);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json(err);
            });
    },
    
    // delete a reaction by the reaction's reactionId value

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                res.json(thought);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json(err);
            });
    }


};