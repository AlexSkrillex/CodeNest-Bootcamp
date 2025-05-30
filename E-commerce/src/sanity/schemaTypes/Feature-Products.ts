export const featuredProducts = {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'id',
        title: 'ID',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
        validation: (Rule: any) => Rule.required().positive()
      },
      {
        name: 'originalPrice',
        title: 'Original Price',
        type: 'number',
        validation: (Rule: any) => Rule.positive()
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true // Allows for responsive cropping
        },
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'category',
        title: 'Category',
        type: 'string',
        options: {
          list: [
            { title: 'Clothing', value: 'clothing' },
            { title: 'Footwear', value: 'footwear' },
            { title: 'Electronics', value: 'electronics' },
            { title: 'Accessories', value: 'accessories' }
          ],
          layout: 'dropdown' // Makes it a select dropdown
        },
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [{ type: 'string' }],
        options: {
          layout: 'tags' // Allows for easy tag input
        }
      }
    ],
    preview: {
      select: {
        title: 'name',
        media: 'image',
        price: 'price',
        category: 'category'
      },
      prepare(selection: any) {
        const { title, media, price, category } = selection
        return {
          title,
          subtitle: `${category} - $${price}`,
          media
        }
      }
    }
  }