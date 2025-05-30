import { type SchemaTypeDefinition } from 'sanity'
import { featuredProducts } from './Feature-Products'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [featuredProducts],
}
