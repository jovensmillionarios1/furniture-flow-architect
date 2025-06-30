
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import { 
  FurnitureItem as FurnitureItemType, 
  FURNITURE_TYPES, 
  DOOR_OPTIONS, 
  DRAWER_OPTIONS, 
  STRUCTURE_MATERIAL_OPTIONS,
  DOOR_COLOR_OPTIONS,
  ACCESSORY_OPTIONS,
  UNIT_OPTIONS 
} from '@/types/furniture';

interface FurnitureItemProps {
  environmentType: string;
  furniture: FurnitureItemType;
  onUpdate: (furniture: FurnitureItemType) => void;
  onRemove: () => void;
  canRemove: boolean;
  validationErrors?: Record<string, string>;
}

const FurnitureItem: React.FC<FurnitureItemProps> = ({
  environmentType,
  furniture,
  onUpdate,
  onRemove,
  canRemove,
  validationErrors = {},
}) => {
  const [showCustomType, setShowCustomType] = useState(furniture.type === 'other');
  const [showCustomDoors, setShowCustomDoors] = useState(furniture.doors === 'other');
  const [showCustomDrawers, setShowCustomDrawers] = useState(furniture.drawers === 'other');
  const [showCustomStructure, setShowCustomStructure] = useState(furniture.structureMaterial === 'other');
  const [showCustomDoorColor, setShowCustomDoorColor] = useState(furniture.doorColor === 'other');
  const [showCustomAccessories, setShowCustomAccessories] = useState(furniture.accessories?.includes('other') || false);

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
    
    if (accessory === 'other') {
      setShowCustomAccessories(updatedAccessories.includes('other'));
    }
  };

  const handleTypeChange = (value: string) => {
    updateFurniture('type', value);
    if (value === 'other') {
      setShowCustomType(true);
    } else {
      setShowCustomType(false);
      updateFurniture('customType', '');
    }
  };

  const handleDoorsChange = (value: string) => {
    updateFurniture('doors', value);
    if (value === 'other') {
      setShowCustomDoors(true);
    } else {
      setShowCustomDoors(false);
      updateFurniture('customDoors', '');
    }
  };

  const handleDrawersChange = (value: string) => {
    updateFurniture('drawers', value);
    if (value === 'other') {
      setShowCustomDrawers(true);
    } else {
      setShowCustomDrawers(false);
      updateFurniture('customDrawers', '');
    }
  };

  const handleStructureChange = (value: string) => {
    updateFurniture('structureMaterial', value);
    if (value === 'other') {
      setShowCustomStructure(true);
    } else {
      setShowCustomStructure(false);
      updateFurniture('customStructureMaterial', '');
    }
  };

  const handleDoorColorChange = (value: string) => {
    updateFurniture('doorColor', value);
    if (value === 'other') {
      setShowCustomDoorColor(true);
    } else {
      setShowCustomDoorColor(false);
      updateFurniture('customDoorColor', '');
    }
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
          <Label htmlFor={`furniture-type-${furniture.id}`}>Tipo de Móvel *</Label>
          <Select
            value={furniture.type}
            onValueChange={handleTypeChange}
          >
            <SelectTrigger className={validationErrors.type ? 'border-red-500' : ''}>
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
          {validationErrors.type && (
            <p className="text-sm text-red-500">{validationErrors.type}</p>
          )}
          {showCustomType && (
            <div className="mt-2">
              <Input
                placeholder="Especifique o tipo de móvel"
                value={furniture.customType || ''}
                onChange={(e) => updateFurniture('customType', e.target.value)}
                className={validationErrors.customType ? 'border-red-500' : ''}
              />
              {validationErrors.customType && (
                <p className="text-sm text-red-500">{validationErrors.customType}</p>
              )}
            </div>
          )}
        </div>

        {/* Dynamic Fields - Only show if furniture type is selected */}
        {furniture.type && (
          <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
            {/* Dimensions */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Dimensões Personalizadas *</Label>
              <div className="grid grid-cols-1 gap-4">
                {/* Width */}
                <div className="flex gap-2 items-end">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`width-${furniture.id}`}>Largura *</Label>
                    <Input
                      id={`width-${furniture.id}`}
                      type="number"
                      step="0.1"
                      placeholder="0"
                      value={furniture.dimensions.width}
                      onChange={(e) => updateDimension('width', e.target.value)}
                      className={validationErrors['dimensions.width'] ? 'border-red-500' : ''}
                    />
                    {validationErrors['dimensions.width'] && (
                      <p className="text-sm text-red-500">{validationErrors['dimensions.width']}</p>
                    )}
                  </div>
                  <div className="w-20 space-y-2">
                    <Label>Unidade</Label>
                    <Select
                      value={furniture.dimensions.widthUnit}
                      onValueChange={(value: 'cm' | 'm') => updateDimension('widthUnit', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        {UNIT_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Height */}
                <div className="flex gap-2 items-end">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`height-${furniture.id}`}>Altura *</Label>
                    <Input
                      id={`height-${furniture.id}`}
                      type="number"
                      step="0.1"
                      placeholder="0"
                      value={furniture.dimensions.height}
                      onChange={(e) => updateDimension('height', e.target.value)}
                      className={validationErrors['dimensions.height'] ? 'border-red-500' : ''}
                    />
                    {validationErrors['dimensions.height'] && (
                      <p className="text-sm text-red-500">{validationErrors['dimensions.height']}</p>
                    )}
                  </div>
                  <div className="w-20 space-y-2">
                    <Label>Unidade</Label>
                    <Select
                      value={furniture.dimensions.heightUnit}
                      onValueChange={(value: 'cm' | 'm') => updateDimension('heightUnit', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        {UNIT_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Depth */}
                <div className="flex gap-2 items-end">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`depth-${furniture.id}`}>Profundidade *</Label>
                    <Input
                      id={`depth-${furniture.id}`}
                      type="number"
                      step="0.1"
                      placeholder="0"
                      value={furniture.dimensions.depth}
                      onChange={(e) => updateDimension('depth', e.target.value)}
                      className={validationErrors['dimensions.depth'] ? 'border-red-500' : ''}
                    />
                    {validationErrors['dimensions.depth'] && (
                      <p className="text-sm text-red-500">{validationErrors['dimensions.depth']}</p>
                    )}
                  </div>
                  <div className="w-20 space-y-2">
                    <Label>Unidade</Label>
                    <Select
                      value={furniture.dimensions.depthUnit}
                      onValueChange={(value: 'cm' | 'm') => updateDimension('depthUnit', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        {UNIT_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Number of Doors */}
              <div className="space-y-2">
                <Label>Número de Portas *</Label>
                <Select
                  value={furniture.doors || ''}
                  onValueChange={handleDoorsChange}
                >
                  <SelectTrigger className={validationErrors.doors ? 'border-red-500' : ''}>
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
                {validationErrors.doors && (
                  <p className="text-sm text-red-500">{validationErrors.doors}</p>
                )}
                {showCustomDoors && (
                  <div className="mt-2">
                    <Input
                      placeholder="Especifique o número de portas"
                      value={furniture.customDoors || ''}
                      onChange={(e) => updateFurniture('customDoors', e.target.value)}
                      className={validationErrors.customDoors ? 'border-red-500' : ''}
                    />
                    {validationErrors.customDoors && (
                      <p className="text-sm text-red-500">{validationErrors.customDoors}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Number of Drawers */}
              <div className="space-y-2">
                <Label>Número de Gavetas *</Label>
                <Select
                  value={furniture.drawers || ''}
                  onValueChange={handleDrawersChange}
                >
                  <SelectTrigger className={validationErrors.drawers ? 'border-red-500' : ''}>
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
                {validationErrors.drawers && (
                  <p className="text-sm text-red-500">{validationErrors.drawers}</p>
                )}
                {showCustomDrawers && (
                  <div className="mt-2">
                    <Input
                      placeholder="Especifique o número de gavetas"
                      value={furniture.customDrawers || ''}
                      onChange={(e) => updateFurniture('customDrawers', e.target.value)}
                      className={validationErrors.customDrawers ? 'border-red-500' : ''}
                    />
                    {validationErrors.customDrawers && (
                      <p className="text-sm text-red-500">{validationErrors.customDrawers}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Structure Material */}
              <div className="space-y-2">
                <Label>Material da Estrutura (interno) *</Label>
                <Select
                  value={furniture.structureMaterial || ''}
                  onValueChange={handleStructureChange}
                >
                  <SelectTrigger className={validationErrors.structureMaterial ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecione o material" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    {STRUCTURE_MATERIAL_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {validationErrors.structureMaterial && (
                  <p className="text-sm text-red-500">{validationErrors.structureMaterial}</p>
                )}
                {showCustomStructure && (
                  <div className="mt-2">
                    <Input
                      placeholder="Especifique o material da estrutura"
                      value={furniture.customStructureMaterial || ''}
                      onChange={(e) => updateFurniture('customStructureMaterial', e.target.value)}
                      className={validationErrors.customStructureMaterial ? 'border-red-500' : ''}
                    />
                    {validationErrors.customStructureMaterial && (
                      <p className="text-sm text-red-500">{validationErrors.customStructureMaterial}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Door Color */}
              <div className="space-y-2">
                <Label>Cor das Portas/Gavetas (externo) *</Label>
                <Select
                  value={furniture.doorColor || ''}
                  onValueChange={handleDoorColorChange}
                >
                  <SelectTrigger className={validationErrors.doorColor ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecione a cor" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    {DOOR_COLOR_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {validationErrors.doorColor && (
                  <p className="text-sm text-red-500">{validationErrors.doorColor}</p>
                )}
                {showCustomDoorColor && (
                  <div className="mt-2">
                    <Input
                      placeholder="Especifique a cor das portas/gavetas"
                      value={furniture.customDoorColor || ''}
                      onChange={(e) => updateFurniture('customDoorColor', e.target.value)}
                      className={validationErrors.customDoorColor ? 'border-red-500' : ''}
                    />
                    {validationErrors.customDoorColor && (
                      <p className="text-sm text-red-500">{validationErrors.customDoorColor}</p>
                    )}
                  </div>
                )}
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
              {showCustomAccessories && (
                <div className="mt-2">
                  <Input
                    placeholder="Especifique outros acessórios"
                    value={furniture.customAccessories || ''}
                    onChange={(e) => updateFurniture('customAccessories', e.target.value)}
                    className={validationErrors.customAccessories ? 'border-red-500' : ''}
                  />
                  {validationErrors.customAccessories && (
                    <p className="text-sm text-red-500">{validationErrors.customAccessories}</p>
                  )}
                </div>
              )}
            </div>

            {/* Observations */}
            <div className="space-y-2">
              <Label htmlFor={`observations-${furniture.id}`}>Observações</Label>
              <Textarea
                id={`observations-${furniture.id}`}
                placeholder="Comentários opcionais sobre este móvel (ex: incluir rodapé de alumínio, usar iluminação LED, etc.)"
                value={furniture.observations || ''}
                onChange={(e) => updateFurniture('observations', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FurnitureItem;
