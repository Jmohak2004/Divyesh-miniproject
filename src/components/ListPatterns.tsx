import { motion } from "motion/react";
import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

// Vertical List Pattern
interface VerticalListProps {
  items: Array<{
    id: string;
    content: ReactNode;
    onClick?: () => void;
  }>;
  className?: string;
}

export function VerticalList({ items, className = "" }: VerticalListProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={item.onClick}
          className="p-4 bg-card border rounded-lg hover:bg-accent transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">{item.content}</div>
            {item.onClick && (
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Infinite List Pattern (Virtualized scrolling simulation)
interface InfiniteListProps {
  items: Array<{
    id: string;
    content: ReactNode;
  }>;
  loadMore?: () => void;
  hasMore?: boolean;
  className?: string;
}

export function InfiniteList({ 
  items, 
  loadMore, 
  hasMore = false,
  className = "" 
}: InfiniteListProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.03 }}
          className="p-4 bg-card border rounded-lg"
        >
          {item.content}
        </motion.div>
      ))}
      
      {hasMore && (
        <motion.button
          onClick={loadMore}
          className="w-full p-4 border border-dashed rounded-lg text-muted-foreground hover:bg-accent transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Load more...
        </motion.button>
      )}
    </div>
  );
}

// Thumbnail List Pattern
interface ThumbnailListProps {
  items: Array<{
    id: string;
    image: string;
    title: string;
    subtitle?: string;
    onClick?: () => void;
  }>;
  className?: string;
}

export function ThumbnailList({ items, className = "" }: ThumbnailListProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          onClick={item.onClick}
          className="flex items-center space-x-4 p-3 bg-card border rounded-lg hover:bg-accent transition-colors cursor-pointer"
          whileHover={{ x: 4 }}
        >
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium truncate">{item.title}</h4>
            {item.subtitle && (
              <p className="text-sm text-muted-foreground truncate">
                {item.subtitle}
              </p>
            )}
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        </motion.div>
      ))}
    </div>
  );
}

// Grid Pattern
interface GridListProps {
  items: Array<{
    id: string;
    content: ReactNode;
  }>;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function GridList({ 
  items, 
  columns = 2, 
  className = "" 
}: GridListProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4 ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          className="bg-card border rounded-lg p-4 hover:shadow-lg transition-shadow"
          whileHover={{ y: -4 }}
        >
          {item.content}
        </motion.div>
      ))}
    </div>
  );
}

// Alias for Grid
export const Grid = GridList;

// Fisheye List Pattern - Items scale up when focused
interface FisheyeListProps {
  items: Array<{
    id: string;
    content: ReactNode;
    onClick?: () => void;
  }>;
  className?: string;
}

export function FisheyeList({ items, className = "" }: FisheyeListProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={item.onClick}
          className="p-4 bg-card border rounded-lg cursor-pointer overflow-hidden"
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "hsl(var(--accent))",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">{item.content}</div>
            {item.onClick && (
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}