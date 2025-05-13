
import MatrixContainer from "@/components/MatrixContainer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="container px-4 mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Matrix Content Organizer</h1>
        <p className="text-center text-gray-600 mb-8">Drag and drop items between cells to organize your content</p>
        
        <MatrixContainer />
      </div>
    </div>
  );
};

export default Index;
