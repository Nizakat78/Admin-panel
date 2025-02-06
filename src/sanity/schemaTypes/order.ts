
export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'userId',
      title: 'User ID',
      type: 'string',
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        { type: 'orderItem' },  // Referencing the orderItem schema
      ],
    },
    {
      name: 'shippingDetails',
      title: 'Shipping Details',
      type: 'shippingDetails',  // Referencing the shippingDetails schema
    },
    {
      name: 'total',
      title: 'Total',
      type: 'number',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Completed', value: 'completed' },
        ],
      },
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
    },
  ],
};
