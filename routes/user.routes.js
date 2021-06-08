const { Router } = require('express');
const {
  usersGET,
  usersPUT,
  usersPOST,
  usersDELETE
} = require('./../controllers/users.controller');
const router = Router();

router.get('/', usersGET);
router.put('/:id', usersPUT);
router.post('/', usersPOST);
router.delete('/', usersDELETE);

module.exports = router;