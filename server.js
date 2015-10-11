    var express  = require('express');
    var app      = express();                               
    var mongoose = require('mongoose');                     
    var bodyParser = require('body-parser');    
    var methodOverride = require('method-override');


    mongoose.connect('mongodb://localhost:27017/todo',
		function(err, res){
			console.log(err);
	}
					);  

    app.use(express.static(__dirname + '/public'));                 
    app.use(bodyParser.urlencoded({'extended':'true'}));            
    app.use(bodyParser.json());                                     
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
    app.use(methodOverride());

    app.listen(8080);
    console.log("App listening on port 8080");


 var Todo = mongoose.model('todo', {
        text : String
    });

//Routes NodeJS Service =========================

    app.get('/api/todos', function(req, res) {
       Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos); 
        });
    });

    app.post('/api/todos', function(req, res) {
		console.log(req);
		console.log(req.body.text);
		
        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

    app.delete('/api/todos/:CodigoItem', function(req, res) {
		
        Todo.remove({
            _id : req.params.CodigoItem
        }, function(err, todo) {
            if (err)
                res.send(err);
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });


//AngularJS Route
app.get('*', function(req,res){
	res.sendfile('./public/index.html');
});
