import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import { FurnitureItem as FurnitureItemType } from '@/types/furniture';
import FurnitureTypeSelector from './furniture/FurnitureTypeSelector';
import DimensionsSection from './furniture/DimensionsSection';
import OptionsSection from './furniture/OptionsSection';
import AccessoriesSection from './furniture/AccessoriesSection';

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
  const [showCustomType, setShowCustomType] = useState(false);
  const [showCustomDoors, setShowCustomDoors] = useState(false);
  const [showCustomDrawers, setShowCustomDrawers] = useState(false);
  const [showCustomStructure, setShowCustomStructure] = useState(false);
  const [showCustomDoorColor, setShowCustomDoorColor] = useState(false);
  const [showCustomAccessories, setShowCustomAccessories] = useState(false);

  // Initialize states based on furniture values
  useEffect(() => {
    setShowCustomType(furniture.type === 'other');
    setShowCustomDoors(furniture.doors === 'other');
    setShowCustomDrawers(furniture.drawers === 'other');
    setShowCustomStructure(furniture.structureMaterial === 'other');
    setShowCustomDoorColor(furniture.doorColor === 'other');
    setShowCustomAccessories(furniture.accessories?.includes('other') || false);
  }, [furniture.type, furniture.doors, furniture.drawers, furniture.structureMaterial, furniture.doorColor, furniture.accessories]);

  const updateFurniture = (field: string, value: any) => {
    console.log(`Updating furniture field ${field} with value:`, value);
    onUpdate({
      ...furniture,
      [field]: value,
    });
  };

  const updateDimension = (dimension: string, value: string) => {
    console.log(`Updating dimension ${dimension} with value:`, value);
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

    console.log('Updated accessories:', updatedAccessories);
    updateFurniture('accessories', updatedAccessories);

    if (accessory === 'other') {
      setShowCustomAccessories(updatedAccessories.includes('other'));
    }
  };

  const handleTypeChange = (value: string) => {
    console.log('Furniture type selected:', value);
    updateFurniture('type', value);
    if (value === 'other') {
      setShowCustomType(true);
    } else {
      setShowCustomType(false);

      if (furniture.customType) {
        updateFurniture('customType', '');
      }
    }
  };

  const handleDoorsChange = (value: string) => {
    console.log('Doors selected:', value);
    updateFurniture('doors', value);
    if (value === 'other') {
      setShowCustomDoors(true);
    } else {
      setShowCustomDoors(false);
      if (furniture.customDoors) {
        updateFurniture('customDoors', '');
      }
    }
  };

  const handleDrawersChange = (value: string) => {
    console.log('Drawers selected:', value);
    updateFurniture('drawers', value);
    if (value === 'other') {
      setShowCustomDrawers(true);
    } else {
      setShowCustomDrawers(false);
      if (furniture.customDrawers) {
        updateFurniture('customDrawers', '');
      }
    }
  };

  const handleStructureChange = (value: string) => {
    console.log('Structure material selected:', value);
    updateFurniture('structureMaterial', value);
    if (value === 'other') {
      setShowCustomStructure(true);
    } else {
      setShowCustomStructure(false);
      if (furniture.customStructureMaterial) {
        updateFurniture('customStructureMaterial', '');
      }
    }
  };

  const handleDoorColorChange = (value: string) => {
    console.log('Door color selected:', value);
    updateFurniture('doorColor', value);
    if (value === 'other') {
      setShowCustomDoorColor(true);
    } else {
      setShowCustomDoorColor(false);
      if (furniture.customDoorColor) {
        updateFurniture('customDoorColor', '');
      }
    }
  };

  return (
    <Card className="relative animate-in slide-in-from-top-4 duration-300 border-2 border-gomob-primary">
      <CardHeader className="pb-4 bg-gomob-primary text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Item de Móvel</CardTitle>
          {canRemove && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="text-white hover:text-red-200 hover:bg-red-500/20"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Furniture Type Selection */}
        <FurnitureTypeSelector
          environmentType={environmentType}
          furnitureType={String(furniture.type ?? '')} // <- garante que sempre é string
          customType={furniture.customType}
          showCustomType={showCustomType}
          onTypeChange={handleTypeChange}
          onCustomTypeChange={(value) => updateFurniture('customType', value)}
          validationErrors={validationErrors}
          furnitureId={furniture.id}
        />

        {/* Dynamic Fields - Only show if furniture type is selected */}
        {furniture.type && (
          <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
            {/* Dimensions */}
            <DimensionsSection
              dimensions={furniture.dimensions}
              onDimensionChange={updateDimension}
              validationErrors={validationErrors}
              furnitureId={furniture.id}
            />

            {/* Additional Options */}
            <OptionsSection
              doors={furniture.doors}
              customDoors={furniture.customDoors}
              drawers={furniture.drawers}
              customDrawers={furniture.customDrawers}
              structureMaterial={furniture.structureMaterial}
              customStructureMaterial={furniture.customStructureMaterial}
              doorColor={furniture.doorColor}
              customDoorColor={furniture.customDoorColor}
              showCustomDoors={showCustomDoors}
              showCustomDrawers={showCustomDrawers}
              showCustomStructure={showCustomStructure}
              showCustomDoorColor={showCustomDoorColor}
              onDoorsChange={handleDoorsChange}
              onDrawersChange={handleDrawersChange}
              onStructureChange={handleStructureChange}
              onDoorColorChange={handleDoorColorChange}
              onFieldUpdate={updateFurniture}
              validationErrors={validationErrors}
            />

            {/* Accessories */}
            <AccessoriesSection
              accessories={furniture.accessories}
              customAccessories={furniture.customAccessories}
              showCustomAccessories={showCustomAccessories}
              onToggleAccessory={toggleAccessory}
              onCustomAccessoriesChange={(value) => updateFurniture('customAccessories', value)}
              validationErrors={validationErrors}
              furnitureId={furniture.id}
            />

            {/* Observations */}
            <div className="space-y-2">
              <Label htmlFor={`observations-${furniture.id}`} className="text-gomob-black font-semibold">Observações</Label>
              <Textarea
                id={`observations-${furniture.id}`}
                placeholder="Comentários opcionais sobre este móvel (ex: incluir rodapé de alumínio, usar iluminação LED, etc.)"
                value={furniture.observations || ''}
                onChange={(e) => updateFurniture('observations', e.target.value)}
                rows={3}
                className="border-2 border-gomob-primary focus:border-gomob-secondary"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FurnitureItem;
