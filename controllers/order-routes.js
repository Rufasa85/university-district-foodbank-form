const router = require('express').Router();
const { Order } = require('../models/');

router.post('/', async (req,res) => {
    try {
        const orderData = await Order.create({
        orderId,
        bag, 
        box,
        bag_quantity,
        box_quantity,
        // grain
        rice, 
        pasta, 
        oatmeal,
        cereal, 
        grain_preference,
        // canned
        canned_fruit,
        dried_fruit,
        any_fruit,
        fruit_preference,
        canned_corn,
        dried_fruit,
        any_fruit, 
        fruit_preference,
        canned_corn,
        canned_soup,
        canned_tomato,
        other_veg,
        vegetable_preference,
        canned_tuna,
        peanut_butter, 
        canned_beans,
        dried_beans,
        lentils,
        canned_protein_preference,
        // beverage
        coffee,
        tea,
        juice,
        seltzer,
        drink_preference,
        // dairy
        milk,
        milk_preference,
        rice_milk,
        nut_milk,
        soy_milk,
        oat_milk,
        goat_milk,
        coconut_milk,
        milk_alt_milk,
        milk_alt_preference,
        yogurt,
        yogurt_preference,
        cheese,
        cheese_preference,
        sour_cream,
        cream_cheese,
        cottage_cheese,
        eggs,
        butter,
        // produce
        salad_greens,
        kale_or_spinach,
        tomato,
        grapes_or_berries,
        herbs,
        zucchini_squash,
        peppers,
        carrots,
        broccoli_cauliflower_cabbage,
        celery_cucumber,
        orange,
        lemon, 
        lime,
        pear, 
        banana,
        avocado,
        potato,
        onion,
        apple, 
        melon,
        produce_preference,
        // frozen protein
        chicken,
        turkey,
        pork,
        fish,
        beef,
        non_meat,
        protein_preference,
        // no cook
        microwave_meals,
        pasta_deli_salad,
        garden_salad,
        sandwich,
        instant_oatmeal,
        instant_noodles,
        no_cook_preference,
        // baked
        white_bread,
        wheat_bread, 
        corn_tortillas,
        flour_tortillas,
        bagels,
        artisan_baguette, 
        rolls_buns,
        cake,
        cookies,
        pie,
        pastry,
        chocolate,
        baked_preference,
        // misc food items
        oil,
        salt,
        cake_mix,
        sugar,
        salsa, 
        hummus,
        misc_preference,
        // infant
        formula,
        infant_puree,
        toddler_food,
        diapers,
        diaper_size,
        baby_preference,
        // pets
        pet_food,
        pet_type,
        // hygiene
        maxi_pads,
        toilet_paper,
        tampons,
        soap,
        hygiene_preference,
        });
        res.status(200).json(orderData)
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;