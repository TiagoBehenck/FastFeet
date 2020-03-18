import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

/**
 * CONTROLLERS
 */

import SessionController from './app/controllers/SessionController';
import DeliverymanPendingController from './app/controllers/DeliverymanPendingController';
import DeliverymanActionController from './app/controllers/DeliverymanActionController';
import DeliveredController from './app/controllers/DeliveredController';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import ProblemAdminController from './app/controllers/ProblemAdminController';
import WithdrawController from './app/controllers/WithdrawController';

/**
 * VALIDATORS
 */

import validateSession from './app/validators/Session';
import validateDelivery from './app/validators/Delivery';
import validateDeliveryman from './app/validators/Deliveryman';
import validateDeliveryProblem from './app/validators/DeliveryProblem';
import validateRecipient from './app/validators/Recipient';
import validateUser from './app/validators/User';
import validateWithdraw from './app/validators/Withdraw';

/**
 * MIDDLEWARE
 */
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', validateSession.store, SessionController.store);

routes.get('/deliverymen/:id', DeliverymanPendingController.index); // Pendentes
routes.get('/deliverymen/:id/deliveries', DeliverymanActionController.index); // Entregues

routes.patch(
  '/deliveryman/:id/deliveries/:delivery_id/withdraw',
  validateWithdraw.update,
  WithdrawController.update
); // Retirada

routes.patch(
  '/deliveryman/:id/deliveries/:delivery_id/deliver',
  upload.single('file'),
  DeliveredController.update
); // Foto assinatura

routes.get('/delivery/:delivery_id/problems', DeliveryProblemController.index); // Listar Problemas
routes.post(
  '/delivery/:delivery_id/problems',
  validateDeliveryProblem.store,
  DeliveryProblemController.store
); // Criar Problemas

routes.get('/deliveryman/:id', DeliverymanController.show); // Login APP

routes.post('/files', upload.single('file'), FileController.store);

routes.use(authMiddleware);

routes.post('/users', validateUser.store, UserController.store);
// routes.put('/users/:id', UserController.update);

routes.post('/recipient', validateRecipient.store, RecipientController.store);
routes.put(
  '/recipient/:id',
  validateRecipient.store,
  RecipientController.update
);
routes.get('/recipient', RecipientController.index);
routes.get('/recipient/:id', RecipientController.show);
routes.delete('/recipient/:id', RecipientController.delete);

routes.post(
  '/deliveryman',
  validateDeliveryman.store,
  DeliverymanController.store
);
routes.get('/deliveryman', DeliverymanController.index);

routes.put(
  '/deliveryman/:id',
  validateDeliveryman.update,
  DeliverymanController.update
);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

routes.post('/delivery', validateDelivery.store, DeliveryController.store);
routes.get('/delivery', DeliveryController.index);
routes.get('/delivery/:id', DeliveryController.show);
routes.put('/delivery/:id', validateDelivery.update, DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.delete);

routes.get('/problem', ProblemAdminController.index);
routes.patch(
  '/problem/:problem_id/cancel-delivery',
  ProblemAdminController.update
);

export default routes;
