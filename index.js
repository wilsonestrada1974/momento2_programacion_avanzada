'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Booking = require('./models/booking');
const booking = require('./models/booking');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/booking', (req, res) => {
    Booking.find({}, (err, bookings) => {
        if (err)
            return res.status(500).send({ message: `Error al enlazar con la base de datos: ${err}` });

        if (!bookings)
            return res.status(404).send({ message: `No existen datos en la base de datos` });

        res.status(200).send({ bookings });

    });

});

app.get('/api/booking/:bookingId', (req, res) => {
    let bookingId = req.params.bookingId;

    Booking.findById(bookingId, (err, booking) => {
        if (err)
            return res.status(500).send({ message: `Error al buscar en la base de datos: ${err}` });
        if (!booking)
            return res.status(404).send({ message: `El producto no existe` });

        res.status(200).send({ booking });

    });
});

app.post('/api/booking', (req, res) => {
    console.log('POST /api/booking');
    console.log(req.body);

    let booking = new Booking();
    booking.name = req.body.name;
    booking.Idhost = req.body.Idhost;
    booking.days = req.body.days;
    booking.amount = req.body.amount;
    booking.discount = req.body.discount;
    booking.room = req.body.room;

    booking.save((err, bookingStored) => {
        if (err)
            res.status(500).send({ message: `Error al salvar en la base de datos ${err}` });

        res.status(200).send({ booking: bookingStored });
    });
});

app.put('/api/booking/:bookingId', (req, res) => {
    let bookingId = req.params.bookingId;
    let updateData = req.body;

    Booking.findByIdAndUpdate (bookingId, updateData, (err, bookingUpdated) => {
        if (err)
            return res.status(500).send({ message: `Error al conectar con la base de datos` })
        
        res.status(200).send({ booking: bookingUpdated });

    });
});

app.delete('/api/booking/:bookingId', (req, res) => {
    let bookingId = req.params.bookingId;

    Booking.findById(bookingId, (err, booking) => {
        if (err)
            return res.status(500).send({ message: `Error al conectar con la base de datos` })
        if (!bookingId)
            return res.status(404).send({ message: `El producto no existe` });

        booking.remove(err => {
            if (err)
                return res.status(500).send({ message: `Error al conectar con la base de datos` });
            res.status(200).send({ message: `El producto se ha eliminado satisfactoriamente` });
        })

    });

});





mongoose.connect('mongodb://localhost:27017/momento2', (err, res) => {
    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`);
    }
    console.log('conexion establecida con la base de datos correctamente');

    app.listen(port, () => {
        console.log(`API REST corriendo en http://localhost:${port}`);
    });
});