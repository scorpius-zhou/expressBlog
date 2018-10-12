// var express = require('express');

var Comments = require('../model').Comments;
var Session = require('../model').Session;
var Tag = require('../model').Tag;

// var setTags = ['es6', 'nodejs', 'sequelize']

function addTag(tags) {
    let arrayOfTags = tags.map(element => {
        return Tag.findOrCreate({where: {name: element}})
    });
    return arrayOfTags;
};

exports.createSession = function( title, content, tags ) {
    Promise.all([
        Session.create({title: title, content: content}),
        ...addTag(tags)
    ]).then(function(results){
        let session = results[0];
    
        for( let i = 1; i < results.length; ++i ) {
            let tag = results[i][0];
            session.setSessTags(tag);
        };
    }).catch(err => {
        console.log(err);
    });
};

exports.createComment = function( session_id, nick_name, email, content ) {
    Comments.create({
        sessionId: session_id,
        nickname: nick_name,
        email: email,
        content: content,
    }).then(comment => {
        console.log(comment);
    });
};
// Promise.all([
//     Session.create({title: 'how to create multiple tag 4', content: 'this is create content'}),
//     ...addTag(setTags)
// ]).then(function(results){
//     let session = results[0];

//     for( let i = 1; i < results.length; ++i ) {
//         let tag = results[i][0];
//         session.setSessTags(tag);
//     };
// }).catch(err => {
//     console.log(err);
// });