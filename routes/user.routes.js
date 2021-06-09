const { Router } = require('express');
const { check } = require('express-validator');
const { isRoleValid, isEmailExists, isUserByIdExists } = require('../helpers/db-validators.helper');
const { validateFields } = require('../middlewares/field-validate');

const {
  usersGET,
  usersPUT,
  usersPOST,
  usersDELETE
} = require('./../controllers/users.controller');
const router = Router();

router.get('/', usersGET);
router.put('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom( isUserByIdExists ),
  check('role').custom( isRoleValid ),
  validateFields
], usersPUT);
router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe contener mas de 6 caracteres').isLength({ min: 6 }),
  check('role').custom( isRoleValid ),
  check('correo', 'El correo no es valido').isEmail(),
  check('correo').custom( isEmailExists ),
  validateFields
], usersPOST);
router.delete('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom( isUserByIdExists ),
  validateFields
], usersDELETE);

module.exports = router;