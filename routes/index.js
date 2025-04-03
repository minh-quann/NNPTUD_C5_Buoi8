var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send(
    {
      message:"heheeheheh"
    }
  );
}
);
 router.get('/slug/:category', async function(req, res) {
    try {
        let category = await categoryModel.findOne({ slug: req.params.category });
        if (!category) {
            return res.status(404).send({ success: false, message: 'Category không tồn tại' });
        }
        let products = await productModel.find({ category: category._id });
        res.status(200).send({ success: true, data: products });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
  });
  router.get('/slug/:category/:product', async function(req, res) {
    try {
        let category = await categoryModel.findOne({ slug: req.params.category });
        if (!category) {
            return res.status(404).send({ success: false, message: 'Category không tồn tại' });
        }
        let product = await productModel.findOne({ slug: req.params.product, category: category._id });
        if (!product) {
            return res.status(404).send({ success: false, message: 'Product không tồn tại' });
        }
        res.status(200).send({ success: true, data: product });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
  });



module.exports = router;
