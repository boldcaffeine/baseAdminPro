

import { createStore } from 'vuex'


import app from './modules/app.ts'

const store = createStore({
  modules:{app}
})

export default store
