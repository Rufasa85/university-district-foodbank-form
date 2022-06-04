const router = require('express').Router();
const { Order } = require('../../models');
const {Op} = require("sequelize")

router.post('/', async (req,res) => {
    try {
        console.log('=======================================')
        console.log(req.session)
        console.log(req.body)
        const orderData = await Order.create({...req.body, ClientId:req.session.userId});

        const order = orderData.get({ plain: true });
        // res.render('new-order', order);
        
        res.status(200).json(order)
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

router.get("/day/:date",(req,res)=>{
    console.log(req.params.date)
    const startDate = new Date(`${req.params.date} 00:01`)
    const endDate = new Date(`${req.params.date} 23:59`)
    Order.findAll({where:{
        pickupTime: {
            [Op.and]:{
                [Op.gte]:startDate,
                [Op.lte]:endDate,
            }
        }
    }
}).then(data=>{
   const hourBlocks = {
   
   }
   data.forEach(ord=>{
       const thisDate = new Date(ord.pickupTime);
       console.log(thisDate)
       const hr =  `${thisDate.getHours()}:00`
       hourBlocks[hr] = hourBlocks[hr]? hourBlocks[hr]+1:1
       console.log("=============")
   })

    res.json({
        orders:hourBlocks,
        startDate,
        endDate
    })
})
   
})

module.exports = router;