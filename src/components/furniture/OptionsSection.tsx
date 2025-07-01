
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  DOOR_OPTIONS, 
  DRAWER_OPTIONS, 
  STRUCTURE_MATERIAL_OPTIONS,
  DOOR_COLOR_OPTIONS 
} from '@/types/furniture';

interface OptionsSectionProps {
  doors?: string;
  customDoors?: string;
  drawers?: string;
  customDrawers?: string;
  structureMaterial?: string;
  customStructureMaterial?: string;
  doorColor?: string;
  customDoorColor?: string;
  showCustomDoors: boolean;
  showCustomDrawers: boolean;
  showCustomStructure: boolean;
  showCustomDoorColor: boolean;
  onDoorsChange: (value: string) => void;
  onDrawersChange: (value: string) => void;
  onStructureChange: (value: string) => void;
  onDoorColorChange: (value: string) => void;
  onFieldUpdate: (field: string, value: string) => void;
  validationErrors?: Record<string, string>;
}

const OptionsSection: React.FC<OptionsSectionProps> = ({
  doors,
  customDoors,
  drawers,
  customDrawers,
  structureMaterial,
  customStructureMaterial,
  doorColor,
  customDoorColor,
  showCustomDoors,
  showCustomDrawers,
  showCustomStructure,
  showCustomDoorColor,
  onDoorsChange,
  onDrawersChange,
  onStructureChange,
  onDoorColorChange,
  onFieldUpdate,
  validationErrors = {},
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Number of Doors */}
      <div className="space-y-2">
        <Label>Número de Portas *</Label>
        <Select
          value={doors || ''}
          onValueChange={onDoorsChange}
        >
          <SelectTrigger className={validationErrors.doors ? 'border-red-500' : ''}>
            <SelectValue placeholder="Selecione as portas" />
          </SelectTrigger>
          <SelectContent className="bg-white z-[200] border shadow-lg max-h-[200px] overflow-y-auto">
            {DOOR_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value} className="cursor-pointer hover:bg-gray-100">
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
              value={customDoors || ''}
              onChange={(e) => onFieldUpdate('customDoors', e.target.value)}
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
          value={drawers || ''}
          onValueChange={onDrawersChange}
        >
          <SelectTrigger className={validationErrors.drawers ? 'border-red-500' : ''}>
            <SelectValue placeholder="Selecione as gavetas" />
          </SelectTrigger>
          <SelectContent className="bg-white z-[200] border shadow-lg max-h-[200px] overflow-y-auto">
            {DRAWER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value} className="cursor-pointer hover:bg-gray-100">
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
              value={customDrawers || ''}
              onChange={(e) => onFieldUpdate('customDrawers', e.target.value)}
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
          value={structureMaterial || ''}
          onValueChange={onStructureChange}
        >
          <SelectTrigger className={validationErrors.structureMaterial ? 'border-red-500' : ''}>
            <SelectValue placeholder="Selecione o material" />
          </SelectTrigger>
          <SelectContent className="bg-white z-[200] border shadow-lg max-h-[200px] overflow-y-auto">
            {STRUCTURE_MATERIAL_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value} className="cursor-pointer hover:bg-gray-100">
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
              value={customStructureMaterial || ''}
              onChange={(e) => onFieldUpdate('customStructureMaterial', e.target.value)}
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
          value={doorColor || ''}
          onValueChange={onDoorColorChange}
        >
          <SelectTrigger className={validationErrors.doorColor ? 'border-red-500' : ''}>
            <SelectValue placeholder="Selecione a cor" />
          </SelectTrigger>
          <SelectContent className="bg-white z-[200] border shadow-lg max-h-[200px] overflow-y-auto">
            {DOOR_COLOR_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value} className="cursor-pointer hover:bg-gray-100">
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
              value={customDoorColor || ''}
              onChange={(e) => onFieldUpdate('customDoorColor', e.target.value)}
              className={validationErrors.customDoorColor ? 'border-red-500' : ''}
            />
            {validationErrors.customDoorColor && (
              <p className="text-sm text-red-500">{validationErrors.customDoorColor}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OptionsSection;
