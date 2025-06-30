
import FurnitureQuoteForm from '@/components/FurnitureQuoteForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Custom Furniture Design
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create your perfect furniture with our intuitive quote request form. 
            Select your environment, choose furniture types, and customize every detail.
          </p>
        </div>
        
        <FurnitureQuoteForm />
      </div>
    </div>
  );
};

export default Index;
