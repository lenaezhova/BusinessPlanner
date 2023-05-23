const EventModel = require('../models/event-model')
const {ObjectId} = require("mongodb");

class EventService {
    async getOne(email, date){
        const events  = await EventModel.find({email, startDate: date})
        return {
            ...events
        }
    }
    async create(email,startDate, startTime,endDate, endTime,header, description){
        return await EventModel.create({email, startDate, startTime,endDate, endTime,header, description})
    }

    async getAll(email){
        const events  = await EventModel.find({email})
        return {
            ...events
        }
    }

    async updateEvent(email, oldEvent, newEvent) {
        const {startDate, startTime, endDate, endTime} = oldEvent
        const event = await EventModel.findOne({email, startDate, startTime, endDate, endTime})
        event.startDate = newEvent.startDate
        event.startTime = newEvent.startTime
        event.endDate = newEvent.endDate
        event.endTime = newEvent.endTime
        event.description = newEvent.description
        await event.save();
    }

    async deleteOne(id){
        await EventModel.deleteOne({_id: new ObjectId(id)})
    }
}
module.exports = new EventService();