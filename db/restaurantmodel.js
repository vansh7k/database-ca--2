import mongoose, { Schema } from 'mongoose';

const restaurantSchema = new Schema({

    name: {
        type: String,
        required: [true , 'Name is required']
    },

    location: {
        type: String,
        required: [true , 'Location is required']
    },
    cuisine:{
        type: String,
        required: [true , 'Cuisine is required']
    },
    rating:{
        type: Number,
        required: [true , 'Rating is required']
    },
    menu :[
        {
            name: {
                type: String,
                required: [true , 'Name is required']
            },
            description: {
                type: String,
            },
            price:{
                type: Number,
                required: [true , 'Price is required']
            },
        },
        
    ],
    
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;