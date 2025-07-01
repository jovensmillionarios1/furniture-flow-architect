
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Send } from 'lucide-react';
import { QuoteForm, Environment, FurnitureItem, quoteFormSchema } from '@/types/furniture';
import EnvironmentSection from './EnvironmentSection';
import ContactSection from './ContactSection';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

// Extend the quote form schema to include contact info
const extendedQuoteFormSchema = quoteFormSchema.extend({
  contactInfo: z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
    whatsapp: z.string().min(1, 'WhatsApp é obrigatório'),
  }),
});

type ExtendedQuoteForm = z.infer<typeof extendedQuoteFormSchema>;

const FurnitureQuoteForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ExtendedQuoteForm>({
    environments: [createNewEnvironment()],
    contactInfo: {
      name: '',
      email: '',
      whatsapp: '',
    },
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, any>>({});

  function createNewEnvironment(): Environment {
    const newFurnitureItem: FurnitureItem = {
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
    };

    return {
      id: `env-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: '',
      furniture: [newFurnitureItem],
    };
  }

  const addEnvironment = () => {
    setFormData({
      ...formData,
      environments: [...formData.environments, createNewEnvironment()],
    });
  };

  const updateEnvironment = (index: number, environment: Environment) => {
    const updatedEnvironments = [...formData.environments];
    updatedEnvironments[index] = environment;
    setFormData({
      ...formData,
      environments: updatedEnvironments,
    });
    
    // Clear validation errors for this environment
    const newErrors = { ...validationErrors };
    delete newErrors[`environments.${index}`];
    setValidationErrors(newErrors);
  };

  const removeEnvironment = (index: number) => {
    const updatedEnvironments = formData.environments.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      environments: updatedEnvironments,
    });
  };

  const updateContactInfo = (field: string, value: string) => {
    setFormData({
      ...formData,
      contactInfo: {
        ...formData.contactInfo,
        [field]: value,
      },
    });
    
    // Clear validation errors for this field
    const newErrors = { ...validationErrors };
    delete newErrors[`contactInfo.${field}`];
    setValidationErrors(newErrors);
  };

  const handleSubmit = () => {
    try {
      // Validate form data
      const validatedData = extendedQuoteFormSchema.parse(formData);
      
      console.log('=== SOLICITAÇÃO DE ORÇAMENTO DE MÓVEIS - GO.MOB ===');
      console.log(JSON.stringify(validatedData, null, 2));
      console.log('=== FIM DA SOLICITAÇÃO ===');
      
      setValidationErrors({});
      toast({
        title: "Solicitação de Orçamento Enviada!",
        description: "Sua solicitação de orçamento foi registrada no console.",
      });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        const errors: Record<string, any> = {};
        error.errors.forEach((err: any) => {
          const path = err.path.join('.');
          errors[path] = err.message;
        });
        setValidationErrors(errors);
        
        toast({
          title: "Erro na Validação",
          description: "Por favor, verifique os campos obrigatórios e tente novamente.",
          variant: "destructive",
        });
      }
    }
  };

  const isFormValid = () => {
    return formData.contactInfo.name && 
           formData.contactInfo.email && 
           formData.contactInfo.whatsapp &&
           formData.environments.some(env => 
             env.type && env.furniture.some(furniture => 
               furniture.type && 
               furniture.dimensions.width && 
               furniture.dimensions.height && 
               furniture.dimensions.depth &&
               furniture.doors &&
               furniture.drawers &&
               furniture.structureMaterial &&
               furniture.doorColor
             )
           );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Card className="border-2 border-gomob-secondary">
        <CardHeader className="bg-gradient-to-r from-gomob-secondary to-gomob-primary text-white rounded-t-lg">
          <CardTitle className="text-2xl text-center">Solicitação de Orçamento de Móveis Personalizados</CardTitle>
          <p className="text-center opacity-90">Projete seus móveis perfeitos com nosso formulário fácil de usar</p>
        </CardHeader>
      </Card>

      {/* Contact Information Section */}
      <ContactSection
        contactInfo={formData.contactInfo}
        onUpdate={updateContactInfo}
        validationErrors={validationErrors}
      />

      <div className="space-y-6">
        {formData.environments.map((environment, index) => (
          <EnvironmentSection
            key={environment.id}
            environment={environment}
            onUpdate={(updatedEnvironment) => updateEnvironment(index, updatedEnvironment)}
            onRemove={() => removeEnvironment(index)}
            canRemove={formData.environments.length > 1}
            validationErrors={validationErrors}
            environmentIndex={index}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Button
          onClick={addEnvironment}
          variant="outline"
          size="lg"
          className="w-full sm:w-auto border-2 border-gomob-secondary text-gomob-secondary hover:bg-gomob-secondary hover:text-white"
        >
          <Plus className="h-5 w-5 mr-2" />
          Adicionar Outro Ambiente
        </Button>

        <Button
          onClick={handleSubmit}
          size="lg"
          className="w-full sm:w-auto bg-gomob-secondary hover:bg-gomob-primary text-white font-semibold py-3 px-8"
        >
          <Send className="h-5 w-5 mr-2" />
          Solicitar Orçamento
        </Button>
      </div>

      <div className="text-sm text-gomob-black text-center">
        <p>* Campos obrigatórios</p>
        <p>Campos marcados com "Outro" requerem especificação adicional</p>
      </div>
    </div>
  );
};

export default FurnitureQuoteForm;
