import { useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const TimelineCalendar = ({ deals, onUpdateDeal }) => {
  const [draggedDeal, setDraggedDeal] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizingDeal, setResizingDeal] = useState(null);
  const [resizeDirection, setResizeDirection] = useState(null);
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
  const [initialDealData, setInitialDealData] = useState(null);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const colors = [
    "from-indigo-500 to-purple-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-orange-500",
    "from-rose-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-violet-500 to-purple-500",
  ];

const handleDragStart = (e, deal) => {
    if (resizingDeal) return; // Prevent drag during resize
    setDraggedDeal(deal);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetMonth) => {
    e.preventDefault();
    if (!draggedDeal) return;

    const duration = draggedDeal.endMonth - draggedDeal.startMonth;
    const newStartMonth = targetMonth;
    const newEndMonth = Math.min(newStartMonth + duration, 12);

    // Validate the new position
    if (newStartMonth >= 1 && newEndMonth <= 12) {
      onUpdateDeal(draggedDeal.Id, {
        startMonth: newStartMonth,
        endMonth: newEndMonth
      });
      toast.success(`Deal timeline updated!`);
    } else {
      toast.error("Invalid timeline position");
    }
    
    setDraggedDeal(null);
  };

  const handleResizeStart = (e, deal, direction) => {
    e.stopPropagation();
    e.preventDefault();
    
    setResizingDeal(deal);
    setResizeDirection(direction);
    setInitialMousePos({ x: e.clientX, y: e.clientY });
    setInitialDealData({ 
      startMonth: deal.startMonth, 
      endMonth: deal.endMonth 
    });

    // Add global mouse event listeners
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  const handleResizeMove = (e) => {
    if (!resizingDeal || !initialDealData) return;

    const deltaX = e.clientX - initialMousePos.x;
    const monthWidth = window.innerWidth / 12; // Approximate month width
    const monthsDelta = Math.round(deltaX / monthWidth);

    let newStartMonth = initialDealData.startMonth;
    let newEndMonth = initialDealData.endMonth;

    if (resizeDirection === 'left') {
      newStartMonth = Math.max(1, Math.min(initialDealData.startMonth + monthsDelta, initialDealData.endMonth - 1));
    } else if (resizeDirection === 'right') {
      newEndMonth = Math.min(12, Math.max(initialDealData.endMonth + monthsDelta, initialDealData.startMonth + 1));
    }

    // Only update if the values have changed
    if (newStartMonth !== resizingDeal.startMonth || newEndMonth !== resizingDeal.endMonth) {
      onUpdateDeal(resizingDeal.Id, {
        startMonth: newStartMonth,
        endMonth: newEndMonth
      });
    }
  };

  const handleResizeEnd = () => {
    if (resizingDeal) {
      toast.success(`Deal duration updated!`);
    }
    
    setResizingDeal(null);
    setResizeDirection(null);
    setInitialMousePos({ x: 0, y: 0 });
    setInitialDealData(null);

    // Remove global mouse event listeners
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  };

  const getBarWidth = (startMonth, endMonth) => {
    const duration = endMonth - startMonth;
    return `${(duration / 12) * 100}%`;
  };

  const getBarLeft = (startMonth) => {
    return `${((startMonth - 1) / 12) * 100}%`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Month Headers */}
      <div className="grid grid-cols-12 gap-2 mb-6">
        {months.map((month, index) => (
          <motion.div
            key={month}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="text-center p-3 bg-slate-800 rounded-lg border border-slate-700"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index + 1)}
          >
            <div className="text-white font-medium">{month}</div>
            <div className="text-slate-400 text-sm">2024</div>
          </motion.div>
        ))}
      </div>

      {/* Deal Timeline Bars */}
      <div className="space-y-4">
        {deals.map((deal, index) => (
          <motion.div
            key={deal.Id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative h-16 bg-slate-800 rounded-lg border border-slate-700 overflow-hidden"
          >
            {/* Deal Info */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
              <div className="text-white font-medium">{deal.name}</div>
              <div className="text-slate-400 text-sm">
                {deal.leadName} • {formatCurrency(deal.value)}
              </div>
            </div>

            {/* Timeline Bar */}
<div
              className={`absolute top-2 right-4 bottom-2 group transition-all duration-200 ${
                draggedDeal?.Id === deal.Id ? 'opacity-50 scale-105' : 'cursor-move'
              } ${resizingDeal?.Id === deal.Id ? 'cursor-ew-resize' : ''}`}
              style={{
                left: `calc(${getBarLeft(deal.startMonth)} + 16rem)`,
                width: `calc(${getBarWidth(deal.startMonth, deal.endMonth)} - 16rem)`,
                minWidth: "2rem"
              }}
              draggable={!resizingDeal}
              onDragStart={(e) => handleDragStart(e, deal)}
            >
              <div className={`h-full bg-gradient-to-r ${colors[index % colors.length]} rounded-md shadow-lg group-hover:shadow-xl transition-all duration-200 ${
                draggedDeal?.Id === deal.Id ? 'opacity-70' : 'opacity-80 group-hover:opacity-100'
              } ${resizingDeal?.Id === deal.Id ? 'ring-2 ring-white/30' : ''}`}>
                {/* Resize Handles */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize bg-white/20 rounded-l-md transition-all duration-200 ${
                    resizingDeal?.Id === deal.Id && resizeDirection === 'left' ? 'opacity-100 bg-white/40' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  onMouseDown={(e) => handleResizeStart(e, deal, "left")}
                />
                <div
                  className={`absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize bg-white/20 rounded-r-md transition-all duration-200 ${
                    resizingDeal?.Id === deal.Id && resizeDirection === 'right' ? 'opacity-100 bg-white/40' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  onMouseDown={(e) => handleResizeStart(e, deal, "right")}
                />
                
                {/* Timeline Info */}
                <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium pointer-events-none">
                  {months[deal.startMonth - 1]} - {months[deal.endMonth - 1]}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
<Card className="p-4">
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <ApperIcon name="Move" size={16} />
            <span>Drag timeline bars to move dates</span>
          </div>
          <div className="flex items-center gap-2">
            <ApperIcon name="ArrowLeftRight" size={16} />
            <span>Drag handles to resize duration</span>
          </div>
          {(draggedDeal || resizingDeal) && (
            <div className="flex items-center gap-2 text-blue-400">
              <ApperIcon name="MousePointer" size={16} />
              <span>{draggedDeal ? 'Moving...' : 'Resizing...'}</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TimelineCalendar;