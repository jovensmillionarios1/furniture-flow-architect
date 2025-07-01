
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ContactSectionProps {
  contactInfo: {
    name: string;
    email: string;
    whatsapp: string;
  };
  onUpdate: (field: string, value: string) => void;
  validationErrors?: Record<string, string>;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  contactInfo,
  onUpdate,
  validationErrors = {},
}) => {
  return (
    <Card className="border-2 border-gomob-primary">
      <CardHeader className="bg-gomob-primary text-white">
        <CardTitle className="text-xl text-center">Seus Dados para Contato</CardTitle>
        <p className="text-center text-sm opacity-90">Preencha suas informações para que possamos entrar em contato</p>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="contact-name" className="text-gomob-black font-semibold">
              Nome Completo *
            </Label>
            <Input
              id="contact-name"
              type="text"
              placeholder="Digite seu nome completo"
              value={contactInfo.name}
              onChange={(e) => onUpdate('name', e.target.value)}
              className={`border-2 ${
                validationErrors.name 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gomob-primary focus:border-gomob-secondary'
              }`}
            />
            {validationErrors.name && (
              <p className="text-sm text-red-500 font-medium">{validationErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="contact-email" className="text-gomob-black font-semibold">
              Email *
            </Label>
            <Input
              id="contact-email"
              type="email"
              placeholder="Digite seu email"
              value={contactInfo.email}
              onChange={(e) => onUpdate('email', e.target.value)}
              className={`border-2 ${
                validationErrors.email 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gomob-primary focus:border-gomob-secondary'
              }`}
            />
            {validationErrors.email && (
              <p className="text-sm text-red-500 font-medium">{validationErrors.email}</p>
            )}
          </div>

          {/* WhatsApp */}
          <div className="space-y-2">
            <Label htmlFor="contact-whatsapp" className="text-gomob-black font-semibold">
              WhatsApp *
            </Label>
            <Input
              id="contact-whatsapp"
              type="tel"
              placeholder="(49) 99999-9999"
              value={contactInfo.whatsapp}
              onChange={(e) => onUpdate('whatsapp', e.target.value)}
              className={`border-2 ${
                validationErrors.whatsapp 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gomob-primary focus:border-gomob-secondary'
              }`}
            />
            {validationErrors.whatsapp && (
              <p className="text-sm text-red-500 font-medium">{validationErrors.whatsapp}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactSection;
