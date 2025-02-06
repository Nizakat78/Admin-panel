export default {
    name: 'orderItem',
    title: 'Order Item',
    type: 'object',
    fields: [
      {
        name: 'productId',
        title: 'Product ID',
        type: 'string',
      },
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
      },
      {
        name: 'quantity',
        title: 'Quantity',
        type: 'number',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'string',  // URL of the image
        description: 'URL of the product image',
      },
    ],
  };
  