
import { Card, CardContent } from '@/components/ui/card';
import { Item } from './MatrixGrid';

interface MatrixItemProps {
  item: Item;
  onDragStart: () => void;
}

const MatrixItem: React.FC<MatrixItemProps> = ({ item, onDragStart }) => {
  return (
    <Card
      className="matrix-item cursor-grab active:cursor-grabbing"
      style={{ backgroundColor: item.color || 'white' }}
      draggable
      onDragStart={onDragStart}
    >
      <CardContent className="p-3">
        <div className="font-medium">{item.title}</div>
        <div className="text-sm text-muted-foreground mt-1">{item.content}</div>
      </CardContent>
    </Card>
  );
};

export default MatrixItem;
