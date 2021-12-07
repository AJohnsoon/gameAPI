import {createItem} from "./application/routers/CreateItem.js"
import {deleteItem} from "./application/routers/DeleteItem.js"
import {updateItem} from "./application/routers/UpdateItem.js"
import {listByID} from "./application/routers/ListByID.js"
import {listAll} from "./application/routers/ListAll.js"
import {auth} from "./authenticate/routers/auth.js"

export const authController = auth
export const listAllController = listAll
export const listByIdController = listByID
export const createController = createItem
export const deleteController = deleteItem
export const updateController = updateItem