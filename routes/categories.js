var express = require('express');
var router = express.Router();
let categoryModel = require('../schemas/category')
let slugify = require('slugify');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  

  let categories = await categoryModel.find({});

  res.status(200).send({
    success:true,
    data:categories
  });
});
router.get('/:id', async function(req, res, next) {
  try {
    let id = req.params.id;
    let category = await categoryModel.findById(id);
    res.status(200).send({
      success:true,
      data:category
    });
  } catch (error) {
    res.status(404).send({
      success:false,
      message:"khong co id phu hop"
    });
  }
});

router.post('/', async function(req, res) {
  try {
      let newCategory = new categoryModel({
          name: req.body.name,
          slug: slugify(req.body.name, { lower: true, strict: true })
      });
      await newCategory.save();
      res.status(200).send({ success: true, data: newCategory });
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
});
router.put('/:id', async function(req, res) {
  try {
      let updateObj = {};
      if (req.body.name) {
          updateObj.name = req.body.name;
          updateObj.slug = slugify(req.body.name, { lower: true, strict: true });
      }
      let updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id, updateObj, { new: true });
      res.status(200).send({ success: true, data: updatedCategory });
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;