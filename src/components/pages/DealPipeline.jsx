import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import KanbanBoard from "@/components/organisms/KanbanBoard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { dealsService } from "@/services/api/dealsService";
import { toast } from "react-toastify";

const DealPipeline = () => {
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
      const updatedDeal = await dealsService.update(dealId, updates);
      setDeals(deals.map(deal => 
        deal.Id === dealId ? updatedDeal : deal
      ));
    } catch (err) {
      toast.error("Failed to update deal");
    }
  };

  if (loading) return <Loading variant="kanban" />;
  if (error) return <Error message={error} onRetry={loadDeals} />;

  const totalDeals = deals.length;
  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const closedDeals = deals.filter(deal => deal.stage === "closed").length;
  const closedValue = deals.filter(deal => deal.stage === "closed").reduce((sum, deal) => sum + deal.value, 0);

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
          <h1 className="text-2xl font-bold text-white mb-2">Deal Pipeline</h1>
          <p className="text-slate-400">
            Manage your deals across all stages. Track progress and close more deals.
          </p>
        </div>
        
        <Button variant="primary" size="lg">
          <ApperIcon name="Plus" size={20} />
          Add Deal
        </Button>
      </motion.div>

      {/* Pipeline Stats */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg">
              <ApperIcon name="GitBranch" size={20} className="text-indigo-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{totalDeals}</div>
              <div className="text-sm text-slate-400">Total Deals</div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg">
              <ApperIcon name="DollarSign" size={20} className="text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{formatCurrency(totalValue)}</div>
              <div className="text-sm text-slate-400">Pipeline Value</div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg">
              <ApperIcon name="Trophy" size={20} className="text-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{closedDeals}</div>
              <div className="text-sm text-slate-400">Closed Deals</div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg">
              <ApperIcon name="TrendingUp" size={20} className="text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{formatCurrency(closedValue)}</div>
              <div className="text-sm text-slate-400">Closed Value</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Kanban Board */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {deals.length === 0 ? (
          <Empty
            title="No deals found"
            description="Start building your pipeline by adding your first deal."
            icon="GitBranch"
            action={{
              text: "Add Deal",
              icon: "Plus",
              onClick: () => toast.info("Add deal functionality coming soon!")
            }}
          />
        ) : (
          <KanbanBoard
            deals={deals}
            onUpdateDeal={handleUpdateDeal}
          />
        )}
      </motion.div>
    </div>
  );
};

export default DealPipeline;