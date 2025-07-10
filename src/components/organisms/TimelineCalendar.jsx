import { useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const TimelineCalendar = ({ deals, onUpdateDeal }) => {
  const [draggedDeal, setDraggedDeal] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

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

    onUpdateDeal(draggedDeal.Id, {
      startMonth: newStartMonth,
      endMonth: newEndMonth
    });

    toast.success(`Deal timeline updated!`);
    setDraggedDeal(null);
  };

  const handleResizeStart = (e, deal, direction) => {
    e.stopPropagation();
    // Implement resize logic here
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
              className="absolute top-2 right-4 bottom-2 cursor-move group"
              style={{
                left: `calc(${getBarLeft(deal.startMonth)} + 16rem)`,
                width: `calc(${getBarWidth(deal.startMonth, deal.endMonth)} - 16rem)`,
                minWidth: "2rem"
              }}
              draggable
              onDragStart={(e) => handleDragStart(e, deal)}
            >
              <div className={`h-full bg-gradient-to-r ${colors[index % colors.length]} rounded-md shadow-lg group-hover:shadow-xl transition-shadow opacity-80 group-hover:opacity-100`}>
                {/* Resize Handles */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize bg-white/20 rounded-l-md opacity-0 group-hover:opacity-100 transition-opacity"
                  onMouseDown={(e) => handleResizeStart(e, deal, "left")}
                />
                <div
                  className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize bg-white/20 rounded-r-md opacity-0 group-hover:opacity-100 transition-opacity"
                  onMouseDown={(e) => handleResizeStart(e, deal, "right")}
                />
                
                {/* Timeline Info */}
                <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
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
            <span>Drag to move timeline</span>
          </div>
          <div className="flex items-center gap-2">
            <ApperIcon name="ArrowLeftRight" size={16} />
            <span>Resize handles to adjust duration</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TimelineCalendar;