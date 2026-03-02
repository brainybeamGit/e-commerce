const express = require('express');
const Product = require('../model/Product');
const router = express.Router()
const multer = require('multer');
const { verifyToken } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const uploads = multer({ storage: storage })

router.post('/add', verifyToken, isAdmin, uploads.single('productImage'), async (req, res) => {
    try {
        const { productName, productDescription, productPrice } = req.body;
        console.log(productName, productDescription, productPrice, req.file.filename)

        await Product.create(
            { productName, productDescription, productPrice, productImage: req.file.filename }
        )
        res.status(200).json({
            message: 'Product is Added'
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Server Error"
        })
    }
})

router.put('/edit/:editId', verifyToken, isAdmin, uploads.single('productImage'), async (req, res) => {
    try {
        const { productName, productDescription, productPrice } = req.body;
        const { editId } = req.params
        console.log(productName, productDescription, productPrice, req.file.filename)
        console.log(editId)

        const product = await Product.findById({ _id: editId });

        if (product) {

            await Product.findByIdAndUpdate(editId, {
                productName, productDescription, productPrice, productImage: req.file.filename
            }
            )
            res.status(200).json({
                message: 'Product is Updated'
            })
        }


    }
    catch (err) {
        res.status(500).json({
            message: "Server Error"
        })
    }
})

router.get('/list', async (req, res) => {
    try {

        const productList = await Product.find();

        res.status(200).json({
            productList: productList

        })
    }
    catch (err) {
        res.status(500).json({
            message: "Server Error"
        })
    }
})

router.get('/product-detail/:id', async (req, res) => {
    try {

        const { id } = req.params;

        const product = await Product.findById({ _id: id });

        res.status(200).json({
            product: product

        })
    }
    catch (err) {
        res.status(500).json({
            message: "Server Error"
        })
    }
})

router.delete('/delete/:id', verifyToken, isAdmin, async (req, res) => {
    try {

        const { id } = req.params

        await Product.findByIdAndDelete({ _id: id })

        res.status(200).json({
            message: "Product is Deleted"

        })
    }
    catch (err) {
        res.status(500).json({
            message: "Server Error"
        })
    }
})


module.exports = router
