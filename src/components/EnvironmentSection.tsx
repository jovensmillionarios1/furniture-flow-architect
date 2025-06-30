
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { Environment, FurnitureItem as FurnitureItemType, ENVIRONMENT_OPTIONS } from '@/types/furniture';
import FurnitureItem from './FurnitureItem';

interface EnvironmentSectionProps {
  environment: Environment;
  onUpdate: (environment: Environment) => void;
  onRemove: () => void;
  canRemove: boolean;
}

const EnvironmentSection: React.FC<EnvironmentSectionProps> = ({
  environment,
  onUpdate,
  onRemove,
  canRemove,
}) => {
  const updateEnvironmentType = (type: string) => {
    onUpdate({
      ...environment,
      type,
      furniture: [createNewFurnitureItem()], // Reset furniture when environment changes
    });
  };

  const createNewFurnitureItem = (): FurnitureItemType => ({
    id: `furniture-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: '',
    dimensions: {
      width: '',
      height: '',
      depth: '',
    },
    doors: '',
    drawers: '',
    internalColor: '',
    externalColor: '',
    accessories: [],
  });

  const addFurnitureItem = () => {
    const newFurniture = createNewFurnitureItem();
    onUpdate({
      ...environment,
      furniture: [...environment.furniture, newFurniture],
    });
  };

  const updateFurnitureItem = (index: number, furniture: FurnitureItemType) => {
    const updatedFurniture = [...environment.furniture];
    updatedFurniture[index] = furniture;
    onUpdate({
      ...environment,
      furniture: updatedFurniture,
    });
  };

  const removeFurnitureItem = (index: number) => {
    const updatedFurniture = environment.furniture.filter((_, i) => i !== index);
    onUpdate({
      ...environment,
      furniture: updatedFurniture,
    });
  };

  return (
    <Card className="w-full animate-in slide-in-from-left-4 duration-500">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-gray-800">Environment</CardTitle>
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
      <CardContent className="p-6 space-y-6">
        {/* Environment Type Selection */}
        <div className="space-y-2">
          <Label htmlFor={`environment-${environment.id}`}>Select Environment</Label>
          <Select
            value={environment.type}
            onValueChange={updateEnvironmentType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose an environment" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              {ENVIRONMENT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Furniture Items - Only show if environment is selected */}
        {environment.type && (
          <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-medium">Furniture Items</Label>
              <Button
                onClick={addFurnitureItem}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Furniture
              </Button>
            </div>

            <div className="space-y-4">
              {environment.furniture.map((furniture, index) => (
                <FurnitureItem
                  key={furniture.id}
                  environmentType={environment.type}
                  furniture={furniture}
                  onUpdate={(updatedFurniture) => updateFurnitureItem(index, updatedFurniture)}
                  onRemove={() => removeFurnitureItem(index)}
                  canRemove={environment.furniture.length > 1}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnvironmentSection;
