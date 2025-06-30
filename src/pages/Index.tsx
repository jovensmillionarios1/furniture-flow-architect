
import FurnitureQuoteForm from '@/components/FurnitureQuoteForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Design de Móveis Personalizados
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Crie seus móveis perfeitos com nosso formulário intuitivo de solicitação de orçamento. 
            Selecione seu ambiente, escolha os tipos de móveis e personalize cada detalhe.
          </p>
        </div>
        
        <FurnitureQuoteForm />
      </div>
    </div>
  );
};

export default Index;
