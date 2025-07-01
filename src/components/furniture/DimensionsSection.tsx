
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UNIT_OPTIONS } from '@/types/furniture';

interface DimensionsSectionProps {
  dimensions: {
    width: string;
    widthUnit: 'cm' | 'm';
    height: string;
    heightUnit: 'cm' | 'm';
    depth: string;
    depthUnit: 'cm' | 'm';
  };
  onDimensionChange: (dimension: string, value: string) => void;
  validationErrors?: Record<string, string>;
  furnitureId: string;
}

const DimensionsSection: React.FC<DimensionsSectionProps> = ({
  dimensions,
  onDimensionChange,
  validationErrors = {},
  furnitureId,
}) => {
  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">Dimensões Personalizadas *</Label>
      <div className="grid grid-cols-1 gap-4">
        {/* Width */}
        <div className="flex gap-2 items-end">
          <div className="flex-1 space-y-2">
            <Label htmlFor={`width-${furnitureId}`}>Largura *</Label>
            <Input
              id={`width-${furnitureId}`}
              type="number"
              step="0.1"
              placeholder="0"
              value={dimensions.width}
              onChange={(e) => onDimensionChange('width', e.target.value)}
              className={validationErrors['dimensions.width'] ? 'border-red-500' : ''}
            />
            {validationErrors['dimensions.width'] && (
              <p className="text-sm text-red-500">{validationErrors['dimensions.width']}</p>
            )}
          </div>
          <div className="w-20 space-y-2">
            <Label>Unidade</Label>
            <Select
              value={dimensions.widthUnit}
              onValueChange={(value: 'cm' | 'm') => onDimensionChange('widthUnit', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white z-[200] border shadow-lg">
                {UNIT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="cursor-pointer hover:bg-gray-100">
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
            <Label htmlFor={`height-${furnitureId}`}>Altura *</Label>
            <Input
              id={`height-${furnitureId}`}
              type="number"
              step="0.1"
              placeholder="0"
              value={dimensions.height}
              onChange={(e) => onDimensionChange('height', e.target.value)}
              className={validationErrors['dimensions.height'] ? 'border-red-500' : ''}
            />
            {validationErrors['dimensions.height'] && (
              <p className="text-sm text-red-500">{validationErrors['dimensions.height']}</p>
            )}
          </div>
          <div className="w-20 space-y-2">
            <Label>Unidade</Label>
            <Select
              value={dimensions.heightUnit}
              onValueChange={(value: 'cm' | 'm') => onDimensionChange('heightUnit', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white z-[200] border shadow-lg">
                {UNIT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="cursor-pointer hover:bg-gray-100">
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
            <Label htmlFor={`depth-${furnitureId}`}>Profundidade *</Label>
            <Input
              id={`depth-${furnitureId}`}
              type="number"
              step="0.1"
              placeholder="0"
              value={dimensions.depth}
              onChange={(e) => onDimensionChange('depth', e.target.value)}
              className={validationErrors['dimensions.depth'] ? 'border-red-500' : ''}
            />
            {validationErrors['dimensions.depth'] && (
              <p className="text-sm text-red-500">{validationErrors['dimensions.depth']}</p>
            )}
          </div>
          <div className="w-20 space-y-2">
            <Label>Unidade</Label>
            <Select
              value={dimensions.depthUnit}
              onValueChange={(value: 'cm' | 'm') => onDimensionChange('depthUnit', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white z-[200] border shadow-lg">
                {UNIT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="cursor-pointer hover:bg-gray-100">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DimensionsSection;
