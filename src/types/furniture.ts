
export interface FurnitureItem {
  id: string;
  type: string;
  dimensions: {
    width: string;
    height: string;
    depth: string;
  };
  doors?: string;
  drawers?: string;
  internalColor?: string;
  externalColor?: string;
  accessories?: string[];
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

export const DOOR_OPTIONS = [
  { value: '0', label: 'Sem portas' },
  { value: '1', label: '1 porta' },
  { value: '2', label: '2 portas' },
  { value: '3', label: '3 portas' },
  { value: '4', label: '4 portas' },
];

export const DRAWER_OPTIONS = [
  { value: '0', label: 'Sem gavetas' },
  { value: '1', label: '1 gaveta' },
  { value: '2', label: '2 gavetas' },
  { value: '3', label: '3 gavetas' },
  { value: '4', label: '4 gavetas' },
  { value: '5', label: '5+ gavetas' },
];

export const COLOR_OPTIONS = [
  { value: 'white', label: 'Branco' },
  { value: 'black', label: 'Preto' },
  { value: 'wood-natural', label: 'Madeira Natural' },
  { value: 'wood-dark', label: 'Madeira Escura' },
  { value: 'gray', label: 'Cinza' },
  { value: 'custom', label: 'Cor Personalizada' },
];

export const ACCESSORY_OPTIONS = [
  { value: 'soft-close-hinges', label: 'Dobradiças com Amortecimento' },
  { value: 'telescopic-slides', label: 'Corrediças Telescópicas' },
  { value: 'aluminum-toe-kicks', label: 'Rodapés de Alumínio' },
  { value: 'led-lighting', label: 'Iluminação LED' },
  { value: 'pull-out-shelves', label: 'Prateleiras Deslizantes' },
  { value: 'glass-doors', label: 'Portas de Vidro' },
];
