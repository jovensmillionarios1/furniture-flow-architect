
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import { Environment, FurnitureItem as FurnitureItemType, ENVIRONMENT_OPTIONS } from '@/types/furniture';
import FurnitureItem from './FurnitureItem';

interface EnvironmentSectionProps {
  environment: Environment;
  onUpdate: (environment: Environment) => void;
  onRemove: () => void;
  canRemove: boolean;
  validationErrors?: Record<string, any>;
  environmentIndex: number;
}

const EnvironmentSection: React.FC<EnvironmentSectionProps> = ({
  environment,
  onUpdate,
  onRemove,
  canRemove,
  validationErrors = {},
  environmentIndex,
}) => {
  const [showCustomEnvironment, setShowCustomEnvironment] = useState(environment.type === 'other');

  const updateEnvironmentType = (type: string) => {
    console.log('Environment type selected:', type);
    
    const updatedEnvironment = {
      ...environment,
      type,
      furniture: environment.furniture.length > 0 ? environment.furniture : [createNewFurnitureItem()],
    };

    // Handle "Other" logic
    if (type === 'other') {
      setShowCustomEnvironment(true);
    } else {
      setShowCustomEnvironment(false);
      updatedEnvironment.customType = '';
    }

    onUpdate(updatedEnvironment);
  };

  const updateCustomEnvironmentType = (customType: string) => {
    onUpdate({
      ...environment,
      customType,
    });
  };

  const createNewFurnitureItem = (): FurnitureItemType => ({
    id: `furniture-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: '',
    dimensions: {
      width: '',
      widthUnit: 'cm',
      height: '',
      heightUnit: 'cm',
      depth: '',
      depthUnit: 'cm',
    },
    doors: '',
    drawers: '',
    structureMaterial: '',
    doorColor: '',
    accessories: [],
    observations: '',
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

  const getValidationErrorsForFurniture = (furnitureIndex: number) => {
    const errors: Record<string, string> = {};
    const prefix = `environments.${environmentIndex}.furniture.${furnitureIndex}`;
    
    Object.keys(validationErrors).forEach(key => {
      if (key.startsWith(prefix)) {
        const fieldName = key.replace(`${prefix}.`, '');
        errors[fieldName] = validationErrors[key];
      }
    });
    
    return errors;
  };

  return (
    <Card className="w-full animate-in slide-in-from-left-4 duration-500">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-gray-800">Ambiente</CardTitle>
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
          <Label htmlFor={`environment-${environment.id}`}>Selecionar Ambiente *</Label>
          <Select
            value={environment.type || ""}
            onValueChange={updateEnvironmentType}
          >
            <SelectTrigger className={validationErrors[`environments.${environmentIndex}.type`] ? 'border-red-500' : ''}>
              <SelectValue placeholder="Escolha um ambiente" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              {ENVIRONMENT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {validationErrors[`environments.${environmentIndex}.type`] && (
            <p className="text-sm text-red-500">{validationErrors[`environments.${environmentIndex}.type`]}</p>
          )}
          {showCustomEnvironment && (
            <div className="mt-2">
              <Input
                placeholder="Especifique o tipo de ambiente"
                value={environment.customType || ''}
                onChange={(e) => updateCustomEnvironmentType(e.target.value)}
                className={validationErrors[`environments.${environmentIndex}.customType`] ? 'border-red-500' : ''}
              />
              {validationErrors[`environments.${environmentIndex}.customType`] && (
                <p className="text-sm text-red-500">{validationErrors[`environments.${environmentIndex}.customType`]}</p>
              )}
            </div>
          )}
        </div>

        {/* Furniture Items - Only show if environment is selected */}
        {environment.type && (
          <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-medium">Itens de Móveis</Label>
              <Button
                onClick={addFurnitureItem}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                Adicionar Móvel
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
                  validationErrors={getValidationErrorsForFurniture(index)}
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
