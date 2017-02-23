var express = require('express');

var routes = function(guides) {

    var guideRouter = express.Router();
    guideRouter.route('/guides')
        .post(function(req, res) {
            var guide = new guides(req.body);
            guide.save();
            res.status(201).send(guide);

        })
        .get(function(req, response) {
            var query = req.query;
            guides.find(query, function(err, guide) {
                if (err) { console.log(err); } else {
                    response.json(guide);
                }
            });

        });

    //this is the middleware to pass it in to the get functions
    guideRouter.use('/guides/:guideId', function(req, res, next) {
        guides.findById(req.params.guideId, function(err, guide) {
            if (err) { console.log(err); } else if (guide) {
                req.guide = guide;
                next();
            } else {
                res.status(404).send("No guide found");
            }
        });
    });

    guideRouter.route('/guides/:guideId')
        .get(function(req, response) {
            response.json(req.guide);
        })
        .put(function(req, response) {
            req.guide.name = req.body.name;
            req.guide.phone = req.body.phone;
            req.guide.email = req.body.email;
            req.guide.location = req.body.location;
            req.guide.role = req.body.role;
            req.guide.save(function(err) {
                if (err) {
                    res.status(500).send("error saving:" + err);
                } else {
                    response.json(req.guide);
                }
            });
        })
        .patch(function(req, response) {
            if (req.body._id)
                delete req.body._id;
            for (var p in req.body) {
                req.guide[p] = req.body[p];
            }
            req.guide.save(function(err) {
                if (err) {
                    res.status(500).send("error saving:" + err);
                } else {
                    response.json(req.guide);
                }
            });
        })
        .delete(function(req, response) {
            req.guide.remove(function(err) {
                if (err)
                    response.status(500).send(err);
                else {
                    response.status(204).send("remove");
                }
            });
        });

    return guideRouter;
}

module.exports = routes;