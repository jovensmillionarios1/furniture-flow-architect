
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Send } from 'lucide-react';
import { QuoteForm, Environment, FurnitureItem } from '@/types/furniture';
import EnvironmentSection from './EnvironmentSection';
import { useToast } from '@/hooks/use-toast';

const FurnitureQuoteForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<QuoteForm>({
    environments: [createNewEnvironment()],
  });

  function createNewEnvironment(): Environment {
    const newFurnitureItem: FurnitureItem = {
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
  };

  const removeEnvironment = (index: number) => {
    const updatedEnvironments = formData.environments.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      environments: updatedEnvironments,
    });
  };

  const handleSubmit = () => {
    console.log('=== FURNITURE QUOTE REQUEST ===');
    console.log(JSON.stringify(formData, null, 2));
    console.log('=== END QUOTE REQUEST ===');
    
    toast({
      title: "Quote Request Submitted!",
      description: "Your furniture quote request has been logged to the console.",
    });
  };

  const isFormValid = () => {
    return formData.environments.some(env => 
      env.type && env.furniture.some(furniture => 
        furniture.type && 
        furniture.dimensions.width && 
        furniture.dimensions.height && 
        furniture.dimensions.depth
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Card className="border-2 border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl text-center">Custom Furniture Quote Request</CardTitle>
          <p className="text-blue-100 text-center">Design your perfect furniture with our easy-to-use form</p>
        </CardHeader>
      </Card>

      <div className="space-y-6">
        {formData.environments.map((environment, index) => (
          <EnvironmentSection
            key={environment.id}
            environment={environment}
            onUpdate={(updatedEnvironment) => updateEnvironment(index, updatedEnvironment)}
            onRemove={() => removeEnvironment(index)}
            canRemove={formData.environments.length > 1}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Button
          onClick={addEnvironment}
          variant="outline"
          size="lg"
          className="w-full sm:w-auto border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Another Environment
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={!isFormValid()}
          size="lg"
          className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-8"
        >
          <Send className="h-5 w-5 mr-2" />
          Request My Quote
        </Button>
      </div>

      {!isFormValid() && (
        <p className="text-sm text-gray-500 text-center">
          Please fill in at least one environment with furniture type and dimensions to submit your quote.
        </p>
      )}
    </div>
  );
};

export default FurnitureQuoteForm;
