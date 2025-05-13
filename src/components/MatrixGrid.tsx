
import React, { useState } from 'react';
import MatrixItem from './MatrixItem';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Item {
  id: string;
  title: string;
  content: string;
  color?: string;
}

interface MatrixGridProps {
  rows: number;
  columns: number;
  initialItems?: Record<string, Item[]>;
}

const MatrixGrid: React.FC<MatrixGridProps> = ({ 
  rows = 3, 
  columns = 4, 
  initialItems = {} 
}) => {
  const [items, setItems] = useState<Record<string, Item[]>>(initialItems);
  const [draggedItem, setDraggedItem] = useState<{ item: Item; fromCell: string } | null>(null);
  const [targetCell, setTargetCell] = useState<string | null>(null);

  // Generate unique cell IDs
  const getCellId = (row: number, col: number) => `cell-${row}-${col}`;

  // Handle the start of dragging an item
  const handleDragStart = (item: Item, cellId: string) => {
    setDraggedItem({ item, fromCell: cellId });
  };

  // Handle when an item is being dragged over a cell
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, cellId: string) => {
    e.preventDefault();
    if (draggedItem && cellId !== targetCell) {
      setTargetCell(cellId);
    }
  };

  // Handle dropping an item into a cell
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, cellId: string) => {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    const { item, fromCell } = draggedItem;
    
    // Remove the item from its original cell
    const fromCellItems = [...(items[fromCell] || [])];
    const updatedFromCellItems = fromCellItems.filter(i => i.id !== item.id);
    
    // Add the item to the new cell
    const toCellItems = [...(items[cellId] || [])];
    toCellItems.push(item);
    
    // Update state
    setItems({
      ...items,
      [fromCell]: updatedFromCellItems,
      [cellId]: toCellItems
    });
    
    // Reset drag state
    setDraggedItem(null);
    setTargetCell(null);
  };

  // Handle when dragging leaves a cell
  const handleDragLeave = () => {
    setTargetCell(null);
  };

  // Add a new item to a cell
  const addItemToCell = (cellId: string) => {
    const newItem: Item = {
      id: `item-${Date.now()}`,
      title: 'New Item',
      content: 'Click to edit',
      color: getRandomPastelColor()
    };
    
    setItems({
      ...items,
      [cellId]: [...(items[cellId] || []), newItem]
    });
  };

  // Generate a random pastel color
  const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 85%)`;
  };

  // Render the grid
  return (
    <div className="overflow-x-auto pb-4">
      <div 
        className="grid gap-4"
        style={{ 
          gridTemplateColumns: `repeat(${columns}, minmax(250px, 1fr))`,
          minWidth: columns * 250
        }}
      >
        {Array.from({ length: rows * columns }).map((_, index) => {
          const row = Math.floor(index / columns) + 1;
          const col = (index % columns) + 1;
          const cellId = getCellId(row, col);
          const cellItems = items[cellId] || [];
          
          return (
            <div
              key={cellId}
              className={cn(
                "bg-card rounded-lg border-2 border-border p-4 min-h-[200px] flex flex-col",
                targetCell === cellId && "cell-highlight"
              )}
              onDragOver={(e) => handleDragOver(e, cellId)}
              onDrop={(e) => handleDrop(e, cellId)}
              onDragLeave={handleDragLeave}
            >
              <div className="text-sm font-medium mb-2 text-muted-foreground">
                Row {row}, Column {col}
              </div>
              
              <div className="flex-1 flex flex-col gap-2">
                {cellItems.map(item => (
                  <MatrixItem
                    key={item.id}
                    item={item}
                    onDragStart={() => handleDragStart(item, cellId)}
                  />
                ))}
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-2 border border-dashed border-muted"
                onClick={() => addItemToCell(cellId)}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Item
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatrixGrid;
