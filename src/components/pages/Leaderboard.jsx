import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LeaderboardTable from "@/components/organisms/LeaderboardTable";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { salesRepsService } from "@/services/api/salesRepsService";

const Leaderboard = () => {
  const [salesReps, setSalesReps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSalesReps = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await salesRepsService.getAll();
      setSalesReps(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSalesReps();
  }, []);

  if (loading) return <Loading variant="table" />;
  if (error) return <Error message={error} onRetry={loadSalesReps} />;

  const totalLeadsContacted = salesReps.reduce((sum, rep) => sum + rep.leadsContacted, 0);
  const totalMeetingsBooked = salesReps.reduce((sum, rep) => sum + rep.meetingsBooked, 0);
  const totalDealsClosed = salesReps.reduce((sum, rep) => sum + rep.dealsClosed, 0);
  const totalRevenue = salesReps.reduce((sum, rep) => sum + rep.revenue, 0);

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
        className="text-center"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
          Sales Leaderboard
        </h1>
        <p className="text-slate-400">
          Track performance and celebrate your top performers
        </p>
      </motion.div>

      {/* Team Stats */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg">
              <ApperIcon name="Users" size={20} className="text-purple-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{totalLeadsContacted}</div>
              <div className="text-sm text-slate-400">Total Leads</div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg">
              <ApperIcon name="Calendar" size={20} className="text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{totalMeetingsBooked}</div>
              <div className="text-sm text-slate-400">Total Meetings</div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg">
              <ApperIcon name="Trophy" size={20} className="text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{totalDealsClosed}</div>
              <div className="text-sm text-slate-400">Total Deals</div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg">
              <ApperIcon name="DollarSign" size={20} className="text-yellow-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{formatCurrency(totalRevenue)}</div>
              <div className="text-sm text-slate-400">Total Revenue</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {salesReps.length === 0 ? (
          <Empty
            title="No sales reps found"
            description="Add sales team members to start tracking performance."
            icon="Trophy"
            action={{
              text: "Add Sales Rep",
              icon: "UserPlus",
              onClick: () => console.log("Add sales rep functionality")
            }}
          />
        ) : (
          <LeaderboardTable salesReps={salesReps} />
        )}
      </motion.div>
    </div>
  );
};

export default Leaderboard;