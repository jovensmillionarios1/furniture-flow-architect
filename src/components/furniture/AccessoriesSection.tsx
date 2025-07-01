
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ACCESSORY_OPTIONS } from '@/types/furniture';

interface AccessoriesSectionProps {
  accessories?: string[];
  customAccessories?: string;
  showCustomAccessories: boolean;
  onToggleAccessory: (accessory: string) => void;
  onCustomAccessoriesChange: (value: string) => void;
  validationErrors?: Record<string, string>;
  furnitureId: string;
}

const AccessoriesSection: React.FC<AccessoriesSectionProps> = ({
  accessories,
  customAccessories,
  showCustomAccessories,
  onToggleAccessory,
  onCustomAccessoriesChange,
  validationErrors = {},
  furnitureId,
}) => {
  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">Acessórios</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {ACCESSORY_OPTIONS.map((accessory) => (
          <div key={accessory.value} className="flex items-center space-x-2">
            <Checkbox
              id={`${furnitureId}-${accessory.value}`}
              checked={(accessories || []).includes(accessory.value)}
              onCheckedChange={() => onToggleAccessory(accessory.value)}
            />
            <Label
              htmlFor={`${furnitureId}-${accessory.value}`}
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
            value={customAccessories || ''}
            onChange={(e) => onCustomAccessoriesChange(e.target.value)}
            className={validationErrors.customAccessories ? 'border-red-500' : ''}
          />
          {validationErrors.customAccessories && (
            <p className="text-sm text-red-500">{validationErrors.customAccessories}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AccessoriesSection;
