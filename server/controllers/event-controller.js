const EventService = require('../service/event-service')
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

class EventController{
    async create(req, res, next){
        try {
            const {email, startDate, startTime,endDate, endTime, header, description} = req.body;
            const eventData = await EventService.create(email, startDate, startTime,endDate, endTime,header, description);
            return res.json(eventData)
        } catch (e){
            next(e);
        }
    }

    async getAll(req, res, next){
        try{
            const {email} = req.params;
            const eventsData = await EventService.getAll(email);
            return res.json(eventsData)
        } catch (e){
            next(e)
        }

    }

    async update(req, res, next){
        try{
            const {email} = req.params;
            const {oldEvent, newEvent} = req.body;
            const response = await EventService.updateEvent(email, oldEvent, newEvent);
            return res.json(response);
        } catch (e) {
            next(e)
        }
    }
    async deleteOne(req, res, next){
        try{
            const {id} = req.params;
            const response = await EventService.deleteOne(id);
            return res.json(response);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new EventController();