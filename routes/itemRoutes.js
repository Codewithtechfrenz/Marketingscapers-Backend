const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemMasterController.js');

router.post('/messages', itemController.createMessage);
router.get('/getMessages', itemController.getMessages);
router.get('/message/:id', itemController.getMessage);
router.post('/deleteMessage', itemController.deleteMessage);
router.post('/updateMessage', itemController.updateMessage);



router.post('/demoBooking', itemController.createDemoBooking);
router.get('/getDemoBookings', itemController.getDemoBookings);
router.get('/demoBooking/:id', itemController.getDemoBooking);
router.post('/updateDemoBooking', itemController.updateDemoBooking);
router.post('/deleteDemoBooking', itemController.deleteDemoBooking);



// ====================== REVIEW ROUTER ======================

router.post('/reviews', itemController.createReview);
router.get('/getReviews', itemController.getReviews);
router.get('/review/:id', itemController.getReview);
router.post('/updateReview', itemController.updateReview);
router.post('/deleteReview', itemController.deleteReview);


router.post("/create", itemController.createClient);
router.get("/list", itemController.getClients);
router.get("/single/:id", itemController.getClient);
router.put("/update", itemController.updateClient);
router.delete("/delete", itemController.deleteClient);



router.get("/counts", itemController.getCounts);



module.exports = router;