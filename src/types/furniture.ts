
import { z } from 'zod';

export interface FurnitureItem {
  id: string;
  type: string;
  dimensions: {
    width: string;
    height: string;
    depth: string;
    unit: 'cm' | 'm';
  };
  doors?: string;
  customDoors?: string;
  drawers?: string;
  customDrawers?: string;
  structureMaterial?: string;
  customStructureMaterial?: string;
  doorColor?: string;
  customDoorColor?: string;
  accessories?: string[];
  customAccessories?: string;
  observations?: string;
}

export interface Environment {
  id: string;
  type: string;
  furniture: FurnitureItem[];
}

export interface QuoteForm {
  environments: Environment[];
}

export const ENVIRONMENT_OPTIONS = [
  { value: 'kitchen', label: 'Cozinha' },
  { value: 'bathroom', label: 'Banheiro' },
  { value: 'closet', label: 'Closet' },
  { value: 'living-room', label: 'Sala de Estar' },
  { value: 'bedroom', label: 'Quarto' },
  { value: 'office', label: 'Escritório' },
];

export const FURNITURE_TYPES = {
  kitchen: [
    { value: 'lower-cabinet', label: 'Armário Inferior' },
    { value: 'wall-cabinet', label: 'Armário de Parede' },
    { value: 'pantry', label: 'Despensa' },
    { value: 'island', label: 'Ilha de Cozinha' },
  ],
  bathroom: [
    { value: 'vanity', label: 'Gabinete de Banheiro' },
    { value: 'medicine-cabinet', label: 'Armário de Remédios' },
    { value: 'linen-cabinet', label: 'Armário de Roupas de Banho' },
  ],
  closet: [
    { value: 'wardrobe', label: 'Guarda-roupa' },
    { value: 'dresser', label: 'Cômoda' },
    { value: 'shoe-cabinet', label: 'Sapateira' },
  ],
  'living-room': [
    { value: 'tv-unit', label: 'Rack para TV' },
    { value: 'bookshelf', label: 'Estante' },
    { value: 'sideboard', label: 'Aparador' },
  ],
  bedroom: [
    { value: 'nightstand', label: 'Criado-mudo' },
    { value: 'wardrobe', label: 'Guarda-roupa' },
    { value: 'dresser', label: 'Cômoda' },
  ],
  office: [
    { value: 'desk', label: 'Mesa' },
    { value: 'bookshelf', label: 'Estante' },
    { value: 'filing-cabinet', label: 'Arquivo' },
  ],
};

export const UNIT_OPTIONS = [
  { value: 'cm', label: 'cm' },
  { value: 'm', label: 'm' },
];

export const DOOR_OPTIONS = [
  { value: '0', label: 'Sem portas' },
  { value: '1', label: '1 porta' },
  { value: '2', label: '2 portas' },
  { value: '3', label: '3 portas' },
  { value: '4', label: '4 portas' },
  { value: 'other', label: 'Outro' },
];

export const DRAWER_OPTIONS = [
  { value: '0', label: 'Sem gavetas' },
  { value: '1', label: '1 gaveta' },
  { value: '2', label: '2 gavetas' },
  { value: '3', label: '3 gavetas' },
  { value: '4', label: '4 gavetas' },
  { value: '5', label: '5+ gavetas' },
  { value: 'other', label: 'Outro' },
];

export const STRUCTURE_MATERIAL_OPTIONS = [
  { value: 'mdf-branco', label: 'MDF Branco' },
  { value: 'mdf-carvalho', label: 'MDF Carvalho' },
  { value: 'mdf-freijo', label: 'MDF Freijó' },
  { value: 'mdf-nogueira', label: 'MDF Nogueira' },
  { value: 'mdf-mogno', label: 'MDF Mogno' },
  { value: 'other', label: 'Outro' },
];

export const DOOR_COLOR_OPTIONS = [
  { value: 'branco-fosco', label: 'Branco Fosco' },
  { value: 'azul-vel', label: 'Azul Vel' },
  { value: 'preto-fosco', label: 'Preto Fosco' },
  { value: 'cinza-concreto', label: 'Cinza Concreto' },
  { value: 'verde-sage', label: 'Verde Sage' },
  { value: 'madeira-natural', label: 'Madeira Natural' },
  { value: 'other', label: 'Outro' },
];

export const ACCESSORY_OPTIONS = [
  { value: 'soft-close-hinges', label: 'Dobradiças com Amortecimento' },
  { value: 'telescopic-slides', label: 'Corrediças Telescópicas' },
  { value: 'aluminum-toe-kicks', label: 'Rodapés de Alumínio' },
  { value: 'led-lighting', label: 'Iluminação LED' },
  { value: 'pull-out-shelves', label: 'Prateleiras Deslizantes' },
  { value: 'glass-doors', label: 'Portas de Vidro' },
  { value: 'other', label: 'Outro' },
];

// Zod validation schemas
export const furnitureItemSchema = z.object({
  id: z.string(),
  type: z.string().min(1, 'Tipo de móvel é obrigatório'),
  dimensions: z.object({
    width: z.string().min(1, 'Largura é obrigatória').refine(val => !isNaN(Number(val)) && Number(val) > 0, 'Largura deve ser um número positivo'),
    height: z.string().min(1, 'Altura é obrigatória').refine(val => !isNaN(Number(val)) && Number(val) > 0, 'Altura deve ser um número positivo'),
    depth: z.string().min(1, 'Profundidade é obrigatória').refine(val => !isNaN(Number(val)) && Number(val) > 0, 'Profundidade deve ser um número positivo'),
    unit: z.enum(['cm', 'm']),
  }),
  doors: z.string().min(1, 'Número de portas é obrigatório'),
  customDoors: z.string().optional(),
  drawers: z.string().min(1, 'Número de gavetas é obrigatório'),
  customDrawers: z.string().optional(),
  structureMaterial: z.string().min(1, 'Material da estrutura é obrigatório'),
  customStructureMaterial: z.string().optional(),
  doorColor: z.string().min(1, 'Cor das portas/gavetas é obrigatória'),
  customDoorColor: z.string().optional(),
  accessories: z.array(z.string()).optional(),
  customAccessories: z.string().optional(),
  observations: z.string().optional(),
}).refine((data) => {
  // If "other" is selected, custom field becomes required
  if (data.doors === 'other' && (!data.customDoors || data.customDoors.trim() === '')) {
    return false;
  }
  if (data.drawers === 'other' && (!data.customDrawers || data.customDrawers.trim() === '')) {
    return false;
  }
  if (data.structureMaterial === 'other' && (!data.customStructureMaterial || data.customStructureMaterial.trim() === '')) {
    return false;
  }
  if (data.doorColor === 'other' && (!data.customDoorColor || data.customDoorColor.trim() === '')) {
    return false;
  }
  if (data.accessories?.includes('other') && (!data.customAccessories || data.customAccessories.trim() === '')) {
    return false;
  }
  return true;
}, {
  message: 'Campos personalizados são obrigatórios quando "Outro" é selecionado',
});

export const environmentSchema = z.object({
  id: z.string(),
  type: z.string().min(1, 'Tipo de ambiente é obrigatório'),
  furniture: z.array(furnitureItemSchema).min(1, 'Pelo menos um móvel é obrigatório'),
});

export const quoteFormSchema = z.object({
  environments: z.array(environmentSchema).min(1, 'Pelo menos um ambiente é obrigatório'),
});
