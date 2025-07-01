
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FURNITURE_TYPES } from '@/types/furniture';

interface FurnitureTypeSelectorProps {
  environmentType: string;
  furnitureType: string;
  customType?: string;
  showCustomType: boolean;
  onTypeChange: (value: string) => void;
  onCustomTypeChange: (value: string) => void;
  validationErrors?: Record<string, string>;
  furnitureId: string;
}

const FurnitureTypeSelector: React.FC<FurnitureTypeSelectorProps> = ({
  environmentType,
  furnitureType,
  customType,
  showCustomType,
  onTypeChange,
  onCustomTypeChange,
  validationErrors = {},
  furnitureId,
}) => {
  const furnitureOptions = FURNITURE_TYPES[environmentType as keyof typeof FURNITURE_TYPES] || [];

  return (
    <div className="space-y-2">
      <Label htmlFor={`furniture-type-${furnitureId}`}>Tipo de Móvel *</Label>
      <Select
        value={furnitureType || ""}
        onValueChange={onTypeChange}
      >
        <SelectTrigger className={validationErrors.type ? 'border-red-500' : ''}>
          <SelectValue placeholder="Selecione o tipo de móvel" />
        </SelectTrigger>
        <SelectContent className="bg-white z-[200] border shadow-lg max-h-[200px] overflow-y-auto">
          {furnitureOptions.map((option) => (
            <SelectItem key={option.value} value={option.value} className="cursor-pointer hover:bg-gray-100">
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
            value={customType || ''}
            onChange={(e) => onCustomTypeChange(e.target.value)}
            className={validationErrors.customType ? 'border-red-500' : ''}
          />
          {validationErrors.customType && (
            <p className="text-sm text-red-500">{validationErrors.customType}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FurnitureTypeSelector;
