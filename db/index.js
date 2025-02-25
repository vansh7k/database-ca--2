import express from 'express';
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import Restaurant from './restaurantmodel.js';
import connectDB from  './db/connectDB.js';

configDotenv();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

connectDB();

app.post("/create", async (req, res) => {

    try{
        const { name, location, cuisine, rating, menu } = req.body;

        const  newRestaurant = new Restaurant({
            name,
            location, 
            cuisine, 
            rating, 
            menu,
        });
    }
    if(!name){
        res.status(400).json({
            error: 'Name is required'
        });
    }
    if(!location){
        res.status(400).json({
            error: 'Location is required'
        });
    }
    if(!cuisine){
        res.status(400).json({
            error: 'Cuisine is required'
        });
    }
    if(!rating){
        res.status(400).json({
            error: 'Rating is required'
        });
    }
    if(!menu){
        res.status(400).json({
            error: 'Menu is required'
        });
    }
    await newRestaurant.save();

    res.status(201).json({
        success:true,
        message: 'Restaurant created successfully',
        restaurant: newRestaurant,

    });
    } catch (error) {
        res.status(500).json({
            error: 'Server error'
        });
        }
   app.get ('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find().select('-menu');
        res.status(200).json({
            success: true,
            restaurants: restaurants
   });
   } catch (error) {
    res.status(500).json({
        error: 'Server error'
        });
        }
        app.get ('/restaurants/:id', async (req, res) => {
            try {
                const restaurant = await Restaurant.findById(req.params.id).populate('menu').select('-menu');
                if(!restaurant){
                    res.status(404).json({
                        error: 'Restaurant not found'
                        });
                        }
                        res.status(200).json({
                            success: true,
                            restaurant: restaurant
                            });
                            } catch (error) {
                                res.status(500).json({
                                    error: 'Server error'
                                    });
                        }
              }

            app.put ('/restaurants/:id', async (req, res) => { 
                try {
                    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true});
                    res.status(200).json({
                        success: true,
                        restaurant: restaurant
                        });
                        } catch (error) {
                            res.status(500).json({
                                error: 'Server error'
                                });
                        }
                    }
                    app.delete ('/restaurants/:id', async (req, res) => { 
                        try {
                            await Restaurant.findByIdAndDelete(req.params.id);
                            res.status(200).json({
                                success: true,
                                message: 'Restaurant deleted successfully'
                                });
                                } catch (error) {
                                    res.status(500).json({
                                        error: 'Server error'
                                        });
                                    }
                                });
                                app.listen(PORT, () => {
                                    console.log(`Server is running on port ${PORT}`);
                                    });
                                    

        
});