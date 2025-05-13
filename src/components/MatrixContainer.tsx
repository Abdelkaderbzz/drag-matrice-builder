
import { useState } from 'react';
import MatrixGrid, { Item } from './MatrixGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus } from 'lucide-react';

// Sample initial data
const getSampleItems = (): Record<string, Item[]> => {
  return {
    'cell-1-1': [
      { id: '1', title: 'Task 1', content: 'High priority task', color: 'hsl(0, 70%, 85%)' },
      { id: '2', title: 'Task 2', content: 'Medium priority', color: 'hsl(30, 70%, 85%)' }
    ],
    'cell-1-2': [
      { id: '3', title: 'Meeting', content: 'Team meeting at 2pm', color: 'hsl(60, 70%, 85%)' }
    ],
    'cell-2-3': [
      { id: '4', title: 'Project Alpha', content: 'Review documents', color: 'hsl(180, 70%, 85%)' },
      { id: '5', title: 'Feedback', content: 'Send feedback to team', color: 'hsl(210, 70%, 85%)' }
    ],
    'cell-3-1': [
      { id: '6', title: 'Research', content: 'Market research', color: 'hsl(270, 70%, 85%)' }
    ]
  };
};

const MatrixContainer = () => {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(4);
  const [title, setTitle] = useState('Matrix Container');

  const increaseRows = () => setRows(prev => Math.min(prev + 1, 10));
  const decreaseRows = () => setRows(prev => Math.max(prev - 1, 1));
  const increaseColumns = () => setColumns(prev => Math.min(prev + 1, 10));
  const decreaseColumns = () => setColumns(prev => Math.max(prev - 1, 1));

  return (
    <div className="p-4 max-w-full mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl font-bold bg-transparent border-none shadow-none mb-2 sm:mb-0 w-full sm:w-auto"
          placeholder="Matrix Title"
        />
        
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="mr-2 text-sm">Rows:</span>
            <Button size="icon" variant="outline" onClick={decreaseRows}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-2">{rows}</span>
            <Button size="icon" variant="outline" onClick={increaseRows}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center">
            <span className="mr-2 text-sm">Columns:</span>
            <Button size="icon" variant="outline" onClick={decreaseColumns}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-2">{columns}</span>
            <Button size="icon" variant="outline" onClick={increaseColumns}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-sm border">
        <MatrixGrid 
          rows={rows}
          columns={columns}
          initialItems={getSampleItems()}
        />
      </div>
      
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Drag items between cells to organize your content
      </div>
    </div>
  );
};

export default MatrixContainer;
