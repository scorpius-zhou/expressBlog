var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var url = require('url');

var Comments = require('../model').Comments;
var Session = require('../model').Session;
var Tag = require('../model').Tag;

router.get('/', function( req, res, next) {
    Session.findAll({
        include: [{
            model: Tag,
            as: 'SessTags'
        }]
    }).then(function(results){
        res.render( 'index',{sessions: results, admin: true}, function(err, html){
            if( err ) {
                res.send('error');
            } else {
                res.send(html);
            }
            res.end();
        } );
    })
});

router.get('/session/read', function(req, res) {
    let session_id = url.parse(req.url,true).query.id;

    Session.findOne({
        include: [{
            model: Comments,
            as: 'SessComment'
        }],
        where: {
            id: session_id
        }
    }).then(session => {
        console.log(session.created_at)
        res.render( 'session',{session: session, admin: true}, function(err, html){
            if( err ) {
                res.send('error');
            } else {
                res.send(html);
            }
            res.end();
        } );
    }).catch(err => {
        console.log(err)
    })
});

router.post('/session/postComment', function(req,res) {
    let postData = req.body;
    console.log(postData)
    Comments.create({
        sessionId: postData.session_id,
        nickname: postData.nick_name,
        email: postData.email,
        content: postData.content,
    }).then(comment => {
        console.log(comment);
        res.redirect(`/session/read?id=${postData.session_id}`)
        res.end()
    }).catch(err => {
        console.log(err)
    })
});

router.post('/session/edit', function(req,res) {
    let postData = req.body;
    console.log(postData)
    let session_id = postData.session_id;
    Session.findOne({
        include: [{
            model: Comments,
            as: 'SessComment'
        }],
        where: {
            id: session_id
        }
    }).then(session => {
        console.log(session.created_at)
        res.render( 'admin_session_edit',{session: session}, function(err, html){
            if( err ) {
                res.send('error');
            } else {
                res.send(html);
            }
            res.end();
        } );
    }).catch(err => {
        console.log(err)
    });
});

router.post('/session/save', function(req,res) {
    let postData = req.body;
    Session.update({
        content: postData.session_content
    },{
        where: {
            id: postData.session_id
        }
    }).then(function(){
        console.log('save success');
        res.redirect(`/session/read?id=${postData.session_id}`)
        res.end()
    }).catch(function(err){
        console.log(err);
    });
});

router.get('/session/delete', function(req,res){
    let session_id = url.parse(req.url,true).query.id;
    console.log(session_id);
    Session.destroy({
        where: {
            id: session_id
        }
    }).then(function(){
        console.log('destroy success')
        res.redirect('/')
        res.end()
    }).catch(function(err){
        console.log(err);
    });
});

module.exports = router;