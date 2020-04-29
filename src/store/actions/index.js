import auth from './authetication'
import ui from './ui'
import adminUsers from './adminUsers'
import customers from './customers'
import orders from './orders'

export default {
  ...auth,
  ...ui,
  ...adminUsers,
  ...customers,
  ...orders
}
