const sequelize = require('../config/connection.js');
const { Client, Order, Feedback } = require('../models');

const orders = [{
    ClientId: 1,
    milk: true,
    futureOrder:true,
    pickupTime: new Date("06-06-2022 11:00")
},
{
    ClientId: 1,
    milk: true,
    futureOrder:true,
    pickupTime: new Date("06-06-2022 11:00")
},
{
    ClientId: 1,
    milk: true,
    futureOrder:true,
    pickupTime: new Date("06-06-2022 11:00")
},
{
    ClientId: 1,
    milk: true,
    futureOrder:true,
    pickupTime: new Date("06-06-2022 11:00")
}
];

const admin = {
    email: process.env.ADMIN,
    password: process.env.ADMIN_PASSWORD,
    clientName: "admin",
    householdSize: 1,
    role: "admin",
};

const feedbacks = [
    {
        feedback: "App is great"
    },
    {
        feedback: "yay for food"
    }
]

const seed = async () => {
    await sequelize.sync({ force: true });
    const cli = await Client.create(admin, { individualHooks: true });
    await Order.bulkCreate(orders, { individualHooks: true });
    await Feedback.bulkCreate(feedbacks)
    console.log(cli)
    process.exit(0)
};


seed();
