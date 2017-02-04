import 'babel-polyfill';
import Router from 'koa-better-router';

import * as Auth from '../../controllers/authentication';

const router = Router().loadMethods();


/**
 * Resources
 *
 * authenticate -> POST, GET
 */

/**
 *
 * Route
 * /authenticate/*
 *
 * @api public
 */
router.post('/authenticate', Auth.bearer);
router.post('/login/access_token');

/**
 *
 * Route
 * /*
 *
 * @api public
 */
router.get('/', Auth.basic);

export default router;
