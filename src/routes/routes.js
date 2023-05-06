const router = require('express').Router()
const {show, index, create, update, dlt} = require('../controller/controller')

router.get('/', show) 
router.get('/:id', index) 
router.post('/', create) 
router.put('/:id', update) 
router.delete('/:id', dlt)

module.exports = router