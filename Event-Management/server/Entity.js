// Entity.js
// This file defines the Entity class for the Event Management System.

const mongoose = require('mongoose');

class Entity {
    constructor(schemaModel) {
        this.model = schemaModel;
    }

    // Static methods for database operations
    static async deleteMany(filter) {
        return await mongoose.model('Entity').deleteMany(filter);
    }

    static async deleteOne(filter) {
        return await mongoose.model('Entity').deleteOne(filter);
    }

    static async find(filter) {
        return await mongoose.model('Entity').find(filter);
    }

    static async findById(id) {
        return await mongoose.model('Entity').findById(id);
    }

    static async findByIdAndDelete(id) {
        return await mongoose.model('Entity').findByIdAndDelete(id);
    }

    static async findByIdAndRemove(id) {
        return await mongoose.model('Entity').findByIdAndRemove(id);
    }

    static async findByIdAndUpdate(id, update, options = {}) {
        return await mongoose.model('Entity').findByIdAndUpdate(id, update, options);
    }

    static async findOne(filter) {
        return await mongoose.model('Entity').findOne(filter);
    }

    static async findOneAndDelete(filter, options = {}) {
        return await mongoose.model('Entity').findOneAndDelete(filter, options);
    }

    static async findOneAndReplace(filter, replacement, options = {}) {
        return await mongoose.model('Entity').findOneAndReplace(filter, replacement, options);
    }

    static async findOneAndUpdate(filter, update, options = {}) {
        return await mongoose.model('Entity').findOneAndUpdate(filter, update, options);
    }

    static async replaceOne(filter, replacement, options = {}) {
        return await mongoose.model('Entity').replaceOne(filter, replacement, options);
    }

    static async updateMany(filter, update, options = {}) {
        return await mongoose.model('Entity').updateMany(filter, update, options);
    }

    static async updateOne(filter, update, options = {}) {
        return await mongoose.model('Entity').updateOne(filter, update, options);
    }

    // Additional CRUD methods
    static async create(document) {
        return await mongoose.model('Entity').create(document);
    }

    static async countDocuments(filter = {}) {
        return await mongoose.model('Entity').countDocuments(filter);
    }

    static async aggregate(pipeline) {
        return await mongoose.model('Entity').aggregate(pipeline);
    }

    static async exists(filter) {
        return await mongoose.model('Entity').exists(filter);
    }
}

module.exports = Entity;