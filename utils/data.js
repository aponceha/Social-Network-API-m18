const usernames2 = [
    'AaronG',
    'BrianS',
    'CameronM',
    'DaisyL',
    'EthanB',
    'FionaS',
    'GavinM',
    'HannahB',
    'IsaacS',
    'JamesB',
    'KatieM',
    'LiamS',
    'MiaB',
    'NathanS',
    'OliviaB',
    'PaulM',
    'QuinnS',
    'RachelB',
    'SamM',
    'TobyS',
    'UmaB',
    'VinceS',
    'WendyB',
    'XavierM',
    'YvonneS',
    'ZoeB',
    'AlisonS',
    'BobbyB',
    'CarolineM',
    'DylanS',
    'EvanB',
    'FeliciaS',
    'GeorgeM',
    'HankB',
    'IrisS',
    'JackB',
    'KyleM',
    'LilyS',
    'MasonB',
    'NatalieS',
    'OscarM',
    'PennyB',
    'QuentinS',
    'RileyB',
    'SimonM',
    'TessaS',
    'UlyssesB',
    'VioletM',
    'WinstonS',
    'XuanB',
    'YolandaS',
    'ZacharyM'

];

const messages = [
    'Hello, World!',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed ut perspiciatis unde omnis iste natus error icabo.',
    'I love Software Development!',
    'I love JavaScript!',
    'I hate Node.js!',
    'React is so confusing!',
    'MongoDB is so cool!',
    'CSS is complicated as heck!',
    'Avatar is overrated',
    'I love the movie Avatar!',
    'Can you believe Rihanna got paid to perform at the Super Bowl?',
    'Harry Potter is my fave',
    'Harry Potter Movies were better than the books',
    'Star wars is better than Star Trek',
    'Star Trek is better than Star Wars',
    'Elon Musk is a genius',
    'Elon Musk is a fraud',
    'I love the movie The Matrix',
    'I love the movie The Matrix Reloaded',
    'I love the movie The Matrix Revolutions',
    'We are living in the Matrix',
    'Science is the best subject',
    'Math is the best subject',
    'English is boring',
    'I love the movie The Notebook',
    'Smeagle is lowkey cute'
];

const reactions = [
    '😀',
    '😁',
    '😂',
    '🤣',
    '😃',
    'I know right!',
    'I disagree!',
    'Love this!',
    'Period.',
    'What do you mean?',
    'Tough day?',
    'I feel you!'

];

const getEmail = (username) => {
    return `${username}@gmail.com`;
};

// get random username and remove that username from username array
const getRandUsername = (num) => {
    var uname = [];
    for (var i = 0; i < num; i++) {
        uname.push(usernames2[Math.floor(Math.random() * usernames2.length)]);
        usernames2.splice(usernames2.indexOf(uname), 1);
    }
    return uname;

};

const getRandMessage = (num) => {
    // get num random messages from messages array
    var randMessages = [];
    for (var i = 0; i < num; i++) {
    randMessages.push(messages[Math.floor(Math.random() * messages.length)]);
    }
    return randMessages;
};

const getRandReaction = () => {
    // get num random reactions from reactions array
    return reactions[Math.floor(Math.random() * reactions.length)];
};

module.exports = { getEmail, getRandUsername, getRandMessage, getRandReaction };
