import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import TimelineCalendar from "@/components/organisms/TimelineCalendar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { dealsService } from "@/services/api/dealsService";
import { toast } from "react-toastify";

const Calendar = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDeals = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dealsService.getAll();
      setDeals(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeals();
  }, []);

const handleUpdateDeal = async (dealId, updates) => {
    try {
      // Optimistically update the UI first
      setDeals(prevDeals => 
        prevDeals.map(deal => 
          deal.Id === dealId ? { ...deal, ...updates } : deal
        )
      );
      
      // Then update the backend
      const updatedDeal = await dealsService.update(dealId, updates);
      
      // Sync with the actual response
      setDeals(prevDeals => 
        prevDeals.map(deal => 
          deal.Id === dealId ? updatedDeal : deal
        )
      );
    } catch (err) {
      // Revert the optimistic update on error
      toast.error("Failed to update deal timeline");
      loadDeals(); // Reload to get correct state
    }
  };

  if (loading) return <Loading variant="timeline" />;
  if (error) return <Error message={error} onRetry={loadDeals} />;

  const activeDeals = deals.filter(deal => deal.stage !== "closed" && deal.stage !== "lost");
  const totalValue = activeDeals.reduce((sum, deal) => sum + deal.value, 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Deal Timeline</h1>
          <p className="text-slate-400">
            Visual timeline of your deals across the year. Drag and resize to adjust timelines.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-slate-400">Active Deals Value</div>
            <div className="text-xl font-bold text-emerald-400">{formatCurrency(totalValue)}</div>
          </div>
          <Button variant="primary" size="lg">
            <ApperIcon name="Plus" size={20} />
            Add Deal
          </Button>
        </div>
      </motion.div>

      {/* Timeline Stats */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg">
              <ApperIcon name="Calendar" size={20} className="text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{activeDeals.length}</div>
              <div className="text-sm text-slate-400">Active Deals</div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg">
              <ApperIcon name="Clock" size={20} className="text-purple-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {Math.round(activeDeals.reduce((sum, deal) => sum + (deal.endMonth - deal.startMonth), 0) / Math.max(activeDeals.length, 1))}
              </div>
              <div className="text-sm text-slate-400">Avg Duration (months)</div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg">
              <ApperIcon name="TrendingUp" size={20} className="text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {activeDeals.length > 0 ? Math.round(activeDeals.reduce((sum, deal) => sum + deal.probability, 0) / activeDeals.length) : 0}%
              </div>
              <div className="text-sm text-slate-400">Avg Probability</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Timeline Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {activeDeals.length === 0 ? (
          <Empty
            title="No active deals"
            description="Add deals to your pipeline to see them on the timeline calendar."
            icon="Calendar"
            action={{
              text: "Add Deal",
              icon: "Plus",
              onClick: () => toast.info("Add deal functionality coming soon!")
            }}
          />
        ) : (
          <TimelineCalendar
            deals={activeDeals}
            onUpdateDeal={handleUpdateDeal}
          />
        )}
      </motion.div>
    </div>
  );
};

export default Calendar;