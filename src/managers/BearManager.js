import ErrorManager from "./ErrorManager..js"
import { isValidID } from "../config/mongoose.config.js";
import bearModel from "../models/bear.model.js";
import { convertToBoolean } from "../utils/converter.js";

export default class BearManager {
    #bearModel;

    constructor() {
        this.#bearModel = bearModel;
    }

    
    async #findOneById(id) {
        if (!isValidID(id)) {
            throw new ErrorManager("ID no válido", 400);
        }

        const bear = await this.#bearModel.findById(id);

        if (!bear) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return bear;
    }

    
    async getAll(params) {
        try {
            const $and = [];

            if (params?.title) $and.push({ title: { $regex: params.title, $options: "i" } });
            const filters = $and.length > 0 ? { $and } : {};

            const sort = {
                asc: { title: 1 },
                desc: { title: -1 },
            };

            const paginationOptions = {
                limit: params?.limit || 10, 
                page: params?.page || 1, 
                sort: sort[params?.sort] ?? {}, 
                lean: true, 
            };

            return await this.#bearModel.paginate(filters, paginationOptions);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    
    async getOneById(id) {
        try {
            return await this.#findOneById(id);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    
    async insertOne(data) {
        try {
            const bear = await this.#bearModel.create({
                ...data,
                status: convertToBoolean(data.status),
            });

            return bear;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    
    async updateOneById(id, data) {
        try {
            const bear = await this.#findOneById(id);
            const newValues = {
                ...bear,
                ...data,
                status: data.status ? convertToBoolean(data.status) : bear.status,
            };

            bear.set(newValues);
            bear.save();

            return bear;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    
    async deleteOneById(id) {
        try {
            const bear = await this.#findOneById(id);
            await bear.deleteOne();
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }
}