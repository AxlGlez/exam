import auth from './auth'
import customer from './customer'
import orders from './orders'

export default {
  ...auth,
  ...customer,
  ...orders
}
