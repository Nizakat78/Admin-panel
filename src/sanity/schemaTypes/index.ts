import { type SchemaTypeDefinition } from 'sanity'
import food from './food'
import order from './order'
import orderItem from './orderItem'
import shippingDetails from './shippingDetails'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [food, order, orderItem,shippingDetails],
}
