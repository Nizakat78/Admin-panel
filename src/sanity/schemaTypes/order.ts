// Order schema definition
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
        {
          type: 'orderItem',  // Reference to the orderItem schema
        },
      ],
    },
    {
      name: 'shippingDetails',
      title: 'Shipping Details',
      type: 'shippingDetails', // Link to shipping details schema
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

// orderItem schema with an added image field
export const orderItem = {
  name: 'orderItem',
  title: 'Order Item',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',  // Name of the item in the order
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',  // Price of the item
    },
    {
      name: 'quantity',
      title: 'Quantity',
      type: 'number',  // Quantity of this item in the order
    },
    {
      name: 'image',  // Image field for the item
      title: 'Image',
      type: 'string',  // URL of the image
      description: 'URL of the product image',
    },
  ],
};


// shippingDetails schema
export const shippingDetails = {
  name: 'shippingDetails',
  title: 'Shipping Details',
  type: 'object',
  fields: [
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string',
    },
    {
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
    },
    {
      name: 'zipCode',
      title: 'Zip Code',
      type: 'string',
    },
    {
      name: 'address1',
      title: 'Address Line 1',
      type: 'string',
    },
    {
      name: 'address2',
      title: 'Address Line 2',
      type: 'string',
    },
  ],
};
