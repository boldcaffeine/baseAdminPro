

import { createStore } from 'vuex'


import app from './modules/app.ts'
import errorLog from './modules/errorLog.ts'
import permission from './modules/permission.ts'
import settings from './modules/settings.ts'

const store = createStore({
  modules:{app,errorLog,permission,settings}
})

export default store
