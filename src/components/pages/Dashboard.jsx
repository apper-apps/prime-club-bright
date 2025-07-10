import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MetricCard from "@/components/molecules/MetricCard";
import Card from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { leadsService } from "@/services/api/leadsService";
import { dealsService } from "@/services/api/dealsService";
import { salesRepsService } from "@/services/api/salesRepsService";

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [deals, setDeals] = useState([]);
  const [salesReps, setSalesReps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [leadsData, dealsData, salesRepsData] = await Promise.all([
        leadsService.getAll(),
        dealsService.getAll(),
        salesRepsService.getAll()
      ]);
      
      setLeads(leadsData);
      setDeals(dealsData);
      setSalesReps(salesRepsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  // Calculate metrics
  const totalLeadsContacted = leads.filter(lead => lead.status === "contacted").length;
  const meetingsBooked = deals.filter(deal => deal.stage === "meeting-booked").length;
  const dealsClosed = deals.filter(deal => deal.stage === "closed").length;
  const conversionRate = leads.length > 0 ? Math.round((dealsClosed / leads.length) * 100) : 0;

  const recentActivities = [
    { id: 1, type: "deal", message: "New deal 'Enterprise Solution' moved to negotiation", time: "2 hours ago", icon: "TrendingUp" },
    { id: 2, type: "meeting", message: "Meeting scheduled with Acme Corp for tomorrow", time: "4 hours ago", icon: "Calendar" },
    { id: 3, type: "lead", message: "5 new leads added from LinkedIn campaign", time: "6 hours ago", icon: "UserPlus" },
    { id: 4, type: "closed", message: "Deal 'SaaS Platform' successfully closed - $50K", time: "1 day ago", icon: "CheckCircle" },
  ];

  const upcomingMeetings = [
    { id: 1, company: "Acme Corp", time: "10:00 AM", date: "Tomorrow", deal: "Enterprise Solution" },
    { id: 2, company: "TechStart Inc", time: "2:00 PM", date: "Tomorrow", deal: "SaaS Platform" },
    { id: 3, company: "Global Systems", time: "11:00 AM", date: "Friday", deal: "Cloud Migration" },
  ];

return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Leads Contacted"
          value={totalLeadsContacted}
          icon="Users"
          color="teal"
          trend={12}
          delay={0}
        />
        <MetricCard
          title="Meetings Booked"
          value={meetingsBooked}
          icon="Calendar"
          color="sky"
          trend={8}
          delay={0.1}
        />
        <MetricCard
          title="Deals Closed"
          value={dealsClosed}
          icon="Trophy"
          color="rose"
          trend={15}
          delay={0.2}
        />
        <MetricCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          icon="TrendingUp"
          color="violet"
          trend={conversionRate > 20 ? 5 : -2}
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card variant="premium" className="p-6 h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-lg">
                <ApperIcon name="Activity" size={20} className="text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Recent Activities</h3>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <ApperIcon name={activity.icon} size={16} className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 text-sm">{activity.message}</p>
                    <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Upcoming Meetings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card variant="premium" className="p-6 h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-lg">
                <ApperIcon name="CalendarCheck" size={20} className="text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Upcoming Meetings</h3>
            </div>
            
            <div className="space-y-4">
              {upcomingMeetings.map((meeting, index) => (
                <motion.div
                  key={meeting.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg">
                      <ApperIcon name="Building" size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{meeting.company}</div>
                      <div className="text-sm text-gray-600">{meeting.deal}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-rose-600 font-medium">{meeting.time}</div>
                    <div className="text-xs text-gray-600">{meeting.date}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card variant="premium" className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-lg">
              <ApperIcon name="Zap" size={20} className="text-violet-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg text-white hover:shadow-lg transition-shadow"
            >
              <ApperIcon name="UserPlus" size={20} />
              <span>Add Lead</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg text-white hover:shadow-lg transition-shadow"
            >
              <ApperIcon name="Plus" size={20} />
              <span>Create Deal</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-sky-500 to-blue-500 rounded-lg text-white hover:shadow-lg transition-shadow"
            >
              <ApperIcon name="Calendar" size={20} />
              <span>Schedule Meeting</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg text-white hover:shadow-lg transition-shadow"
            >
              <ApperIcon name="BarChart" size={20} />
              <span>View Reports</span>
            </motion.button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;