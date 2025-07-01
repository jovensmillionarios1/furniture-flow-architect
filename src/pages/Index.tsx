
import FurnitureQuoteForm from '@/components/FurnitureQuoteForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gomob-white">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gomob-primary mb-4">
            Go.Mob
          </h1>
          <h2 className="text-3xl font-semibold text-gomob-secondary mb-4">
            Ambientes Planejados
          </h2>
          <p className="text-lg text-gomob-black max-w-2xl mx-auto">
            Crie seus móveis perfeitos com nosso formulário intuitivo de solicitação de orçamento. 
            Selecione seu ambiente, escolha os tipos de móveis e personalize cada detalhe.
          </p>
        </div>
        
        <FurnitureQuoteForm />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
