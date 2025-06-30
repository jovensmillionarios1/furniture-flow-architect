
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';
import { FurnitureItem as FurnitureItemType, FURNITURE_TYPES, DOOR_OPTIONS, DRAWER_OPTIONS, COLOR_OPTIONS, ACCESSORY_OPTIONS } from '@/types/furniture';

interface FurnitureItemProps {
  environmentType: string;
  furniture: FurnitureItemType;
  onUpdate: (furniture: FurnitureItemType) => void;
  onRemove: () => void;
  canRemove: boolean;
}

const FurnitureItem: React.FC<FurnitureItemProps> = ({
  environmentType,
  furniture,
  onUpdate,
  onRemove,
  canRemove,
}) => {
  const updateFurniture = (field: string, value: any) => {
    onUpdate({
      ...furniture,
      [field]: value,
    });
  };

  const updateDimension = (dimension: string, value: string) => {
    onUpdate({
      ...furniture,
      dimensions: {
        ...furniture.dimensions,
        [dimension]: value,
      },
    });
  };

  const toggleAccessory = (accessory: string) => {
    const accessories = furniture.accessories || [];
    const updatedAccessories = accessories.includes(accessory)
      ? accessories.filter(a => a !== accessory)
      : [...accessories, accessory];
    
    updateFurniture('accessories', updatedAccessories);
  };

  const furnitureOptions = FURNITURE_TYPES[environmentType as keyof typeof FURNITURE_TYPES] || [];

  return (
    <Card className="relative animate-in slide-in-from-top-4 duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Item de Móvel</CardTitle>
          {canRemove && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Furniture Type Selection */}
        <div className="space-y-2">
          <Label htmlFor={`furniture-type-${furniture.id}`}>Tipo de Móvel</Label>
          <Select
            value={furniture.type}
            onValueChange={(value) => updateFurniture('type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de móvel" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              {furnitureOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Dynamic Fields - Only show if furniture type is selected */}
        {furniture.type && (
          <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
            {/* Dimensions */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Dimensões Personalizadas (centímetros)</Label>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`width-${furniture.id}`}>Largura (cm)</Label>
                  <Input
                    id={`width-${furniture.id}`}
                    type="number"
                    step="1"
                    placeholder="0"
                    value={furniture.dimensions.width}
                    onChange={(e) => updateDimension('width', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`height-${furniture.id}`}>Altura (cm)</Label>
                  <Input
                    id={`height-${furniture.id}`}
                    type="number"
                    step="1"
                    placeholder="0"
                    value={furniture.dimensions.height}
                    onChange={(e) => updateDimension('height', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`depth-${furniture.id}`}>Profundidade (cm)</Label>
                  <Input
                    id={`depth-${furniture.id}`}
                    type="number"
                    step="1"
                    placeholder="0"
                    value={furniture.dimensions.depth}
                    onChange={(e) => updateDimension('depth', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Number of Doors */}
              <div className="space-y-2">
                <Label>Número de Portas</Label>
                <Select
                  value={furniture.doors || ''}
                  onValueChange={(value) => updateFurniture('doors', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione as portas" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    {DOOR_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Number of Drawers */}
              <div className="space-y-2">
                <Label>Número de Gavetas</Label>
                <Select
                  value={furniture.drawers || ''}
                  onValueChange={(value) => updateFurniture('drawers', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione as gavetas" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    {DRAWER_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Internal Color */}
              <div className="space-y-2">
                <Label>Cor Interna</Label>
                <Select
                  value={furniture.internalColor || ''}
                  onValueChange={(value) => updateFurniture('internalColor', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a cor interna" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    {COLOR_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* External Color */}
              <div className="space-y-2">
                <Label>Cor Externa</Label>
                <Select
                  value={furniture.externalColor || ''}
                  onValueChange={(value) => updateFurniture('externalColor', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a cor externa" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    {COLOR_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Accessories */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Acessórios</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ACCESSORY_OPTIONS.map((accessory) => (
                  <div key={accessory.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${furniture.id}-${accessory.value}`}
                      checked={(furniture.accessories || []).includes(accessory.value)}
                      onCheckedChange={() => toggleAccessory(accessory.value)}
                    />
                    <Label
                      htmlFor={`${furniture.id}-${accessory.value}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {accessory.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FurnitureItem;
