import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const LeaderboardTable = ({ salesReps }) => {
  const sortedReps = [...salesReps].sort((a, b) => {
    // Primary sort by deals closed
    if (b.dealsClosed !== a.dealsClosed) {
      return b.dealsClosed - a.dealsClosed;
    }
    // Secondary sort by revenue
    if (b.revenue !== a.revenue) {
      return b.revenue - a.revenue;
    }
    // Tertiary sort by meetings booked
    return b.meetingsBooked - a.meetingsBooked;
  });

  const hunterOfMonth = sortedReps.find(rep => rep.isHunterOfMonth) || sortedReps[0];

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return "Trophy";
      case 1: return "Medal";
      case 2: return "Award";
      default: return "User";
    }
  };

  const getRankColor = (index) => {
    switch (index) {
      case 0: return "from-yellow-400 to-yellow-600";
      case 1: return "from-slate-400 to-slate-600";
      case 2: return "from-amber-600 to-amber-800";
      default: return "from-slate-600 to-slate-700";
    }
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
      {/* Hunter of the Month Highlight */}
      {hunterOfMonth && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card variant="premium" className="p-6 border-2 border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 to-amber-500/10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                  <ApperIcon name="Crown" size={24} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center animate-pulse">
                  <ApperIcon name="Star" size={12} className="text-white" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-white">{hunterOfMonth.name}</h3>
                  <Badge variant="warning" className="animate-pulse">
                    Hunter of the Month
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400">{hunterOfMonth.dealsClosed}</div>
                    <div className="text-sm text-slate-400">Deals Closed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{hunterOfMonth.meetingsBooked}</div>
                    <div className="text-sm text-slate-400">Meetings Booked</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{hunterOfMonth.leadsContacted}</div>
                    <div className="text-sm text-slate-400">Leads Contacted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{formatCurrency(hunterOfMonth.revenue)}</div>
                    <div className="text-sm text-slate-400">Revenue</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Leaderboard Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50 border-b border-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">
                  Rank
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">
                  Sales Rep
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">
                  Leads Contacted
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">
                  Meetings Booked
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">
                  Deals Closed
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">
                  Revenue
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {sortedReps.map((rep, index) => {
                const score = (rep.dealsClosed * 100) + (rep.meetingsBooked * 20) + (rep.leadsContacted * 5);
                
                return (
                  <motion.tr
                    key={rep.Id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 bg-gradient-to-r ${getRankColor(index)} rounded-full flex items-center justify-center`}>
                          <ApperIcon name={getRankIcon(index)} size={16} className="text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">#{index + 1}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                          <ApperIcon name="User" size={16} className="text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{rep.name}</div>
                          {rep.isHunterOfMonth && (
                            <Badge variant="warning" size="sm">
                              Hunter
                            </Badge>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-purple-400 font-semibold">{rep.leadsContacted}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-blue-400 font-semibold">{rep.meetingsBooked}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-emerald-400 font-semibold">{rep.dealsClosed}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-yellow-400 font-semibold">{formatCurrency(rep.revenue)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white font-bold">{score.toLocaleString()}</div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default LeaderboardTable;