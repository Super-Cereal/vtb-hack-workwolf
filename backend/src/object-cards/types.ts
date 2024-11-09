import type { ObjectCategoryEnum } from 'src/models/object-category.model';

export interface Transaction {
  id: 2617;
  type: 'in' | 'out';
  category: {
    id: number;
    name: ObjectCategoryEnum;
  };
  value: number;
  status: 'Consumed';
}
