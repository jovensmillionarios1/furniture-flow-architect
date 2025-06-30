
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
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'bathroom', label: 'Bathroom' },
  { value: 'closet', label: 'Closet' },
  { value: 'living-room', label: 'Living Room' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'office', label: 'Office' },
];

export const FURNITURE_TYPES = {
  kitchen: [
    { value: 'lower-cabinet', label: 'Lower Cabinet' },
    { value: 'wall-cabinet', label: 'Wall Cabinet' },
    { value: 'pantry', label: 'Pantry' },
    { value: 'island', label: 'Kitchen Island' },
  ],
  bathroom: [
    { value: 'vanity', label: 'Vanity' },
    { value: 'medicine-cabinet', label: 'Medicine Cabinet' },
    { value: 'linen-cabinet', label: 'Linen Cabinet' },
  ],
  closet: [
    { value: 'wardrobe', label: 'Wardrobe' },
    { value: 'dresser', label: 'Dresser' },
    { value: 'shoe-cabinet', label: 'Shoe Cabinet' },
  ],
  'living-room': [
    { value: 'tv-unit', label: 'TV Unit' },
    { value: 'bookshelf', label: 'Bookshelf' },
    { value: 'sideboard', label: 'Sideboard' },
  ],
  bedroom: [
    { value: 'nightstand', label: 'Nightstand' },
    { value: 'wardrobe', label: 'Wardrobe' },
    { value: 'dresser', label: 'Dresser' },
  ],
  office: [
    { value: 'desk', label: 'Desk' },
    { value: 'bookshelf', label: 'Bookshelf' },
    { value: 'filing-cabinet', label: 'Filing Cabinet' },
  ],
};

export const DOOR_OPTIONS = [
  { value: '0', label: 'No doors' },
  { value: '1', label: '1 door' },
  { value: '2', label: '2 doors' },
  { value: '3', label: '3 doors' },
  { value: '4', label: '4 doors' },
];

export const DRAWER_OPTIONS = [
  { value: '0', label: 'No drawers' },
  { value: '1', label: '1 drawer' },
  { value: '2', label: '2 drawers' },
  { value: '3', label: '3 drawers' },
  { value: '4', label: '4 drawers' },
  { value: '5', label: '5+ drawers' },
];

export const COLOR_OPTIONS = [
  { value: 'white', label: 'White' },
  { value: 'black', label: 'Black' },
  { value: 'wood-natural', label: 'Natural Wood' },
  { value: 'wood-dark', label: 'Dark Wood' },
  { value: 'gray', label: 'Gray' },
  { value: 'custom', label: 'Custom Color' },
];

export const ACCESSORY_OPTIONS = [
  { value: 'soft-close-hinges', label: 'Soft Close Hinges' },
  { value: 'telescopic-slides', label: 'Telescopic Slides' },
  { value: 'aluminum-toe-kicks', label: 'Aluminum Toe Kicks' },
  { value: 'led-lighting', label: 'LED Lighting' },
  { value: 'pull-out-shelves', label: 'Pull-out Shelves' },
  { value: 'glass-doors', label: 'Glass Doors' },
];
