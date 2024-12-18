import ErrorManager from "./ErrorManager..js"
import { isValidID } from "../config/mongoose.config.js";
import CartModel from "../models/cart.model.js";

export default class CartManager {
    #cartModel;

    constructor() {
        this.#cartModel = CartModel;
    }

    
    async #findOneById(id) {
        if (!isValidID(id)) {
            throw new ErrorManager("ID no válido", 400);
        }

        const recipe = await this.#cartModel.findById(id).populate("bears.bear");

        if (!cart) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return cart;
    }

    
    async getAll(params) {
        try {
            const paginationOptions = {
                limit: params?.limit || 10, 
                page: params?.page || 1, 
                populate: "bears.bear", 
                lean: true, 
            };

            return await this.#cartModel.paginate({}, paginationOptions);
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
            const cart = await this.#cartModel.create(data);
            return cart;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    
    async addOneBear(id, bearId) {
        try {
            const cart = await this.#findOneById(id);
            const bearIndex = cart.bears.findIndex((item) => item.bear._id.toString() === bearId);

            if (bearIndex >= 0) {
                cart.bears[bearIndex].quantity++;
            } else {
                cart.carts.push({ bear: bearId, quantity: 1 });
            }

            await cart.save();

            return cart;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }
}