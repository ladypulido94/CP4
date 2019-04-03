const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/Agenda', {
    useNewUrlParser: true
});

const agendaSchema = new mongoose.Schema({
    date: String,
    time: String,
    type: String,
    description: String
});

agendaSchema.virtual('id')
    .get(function () {
        return this._id.toHexString();
    });

agendaSchema.set('toJSON', {
    virtuals: true
});

const Agenda = mongoose.model('Agenda', agendaSchema);

app.get('/api/items', async (req, res) => {
    try {
        let items = await Agenda.find();
        res.send(items);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.post('/api/items', async (req, res) => {
    const agenda = new Agenda({
        date: req.body.date,
        time: req.body.time,
        type: req.body.type,
        description: req.body.description
    });
    try {
        await agenda.save();
        res.send(agenda);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/items/:id', async (req, res) => {
    try {
        await Agenda.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/items/:id', async (req, res) => {

    try {
        let item = await Agenda.findOne({
            _id: req.params.id
        });

        item.date = req.body.date;
        item.time = req.body.time;
        item.type = req.body.type;
        item.description = req.body.description;
        await item.save();
        res.send(item);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

});

app.listen(3000, () => console.log('Server listening on port 3000!'));