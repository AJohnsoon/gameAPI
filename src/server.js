import express from 'express';

import {listAllController} from './controller/application/index.js'
import {listByIdController} from './controller/application/index.js'
import {createController} from './controller/application/index.js'
import {deleteController} from './controller/application/index.js'
import {updateController} from './controller/application/index.js'

import {authController} from './controller/authenticate/index.js'

export const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.use('/', listAllController)
app.use('/', listByIdController)
app.use('/', createController)
app.use('/', deleteController)
app.use('/', updateController)
app.use('/', authController)