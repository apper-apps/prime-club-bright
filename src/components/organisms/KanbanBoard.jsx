import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const KanbanBoard = ({ deals, onUpdateDeal }) => {
  const stages = [
    { id: "connected", title: "Connected", color: "info" },
    { id: "locked", title: "Locked", color: "warning" },
    { id: "meeting-booked", title: "Meeting Booked", color: "primary" },
    { id: "meeting-done", title: "Meeting Done", color: "success" },
    { id: "negotiation", title: "Negotiation", color: "warning" },
    { id: "closed", title: "Closed", color: "success" },
    { id: "lost", title: "Lost", color: "danger" },
  ];

  const getDealsByStage = (stageId) => {
    return deals.filter(deal => deal.stage === stageId);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId !== destination.droppableId) {
      const dealId = parseInt(draggableId);
      const newStage = destination.droppableId;
      
      onUpdateDeal(dealId, { stage: newStage });
      
      const stageName = stages.find(stage => stage.id === newStage)?.title;
      toast.success(`Deal moved to ${stageName}!`);
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
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-6">
        {stages.map((stage) => {
          const stageDeals = getDealsByStage(stage.id);
          const stageValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
          
          return (
            <div key={stage.id} className="flex-shrink-0 w-80">
              <div className="bg-slate-800 rounded-xl border border-slate-700 h-full">
                <div className="p-4 border-b border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{stage.title}</h3>
                    <Badge variant={stage.color}>
                      {stageDeals.length}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400">
                    {formatCurrency(stageValue)}
                  </p>
                </div>
                
                <Droppable droppableId={stage.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`p-4 space-y-3 min-h-[200px] transition-colors ${
                        snapshot.isDraggingOver ? "bg-indigo-500/5" : ""
                      }`}
                    >
                      {stageDeals.map((deal, index) => (
                        <Draggable
                          key={deal.Id}
                          draggableId={deal.Id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <motion.div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.05 }}
                              className={`${
                                snapshot.isDragging ? "rotate-2 shadow-2xl" : ""
                              }`}
                            >
                              <Card
                                variant="glass"
                                className="p-4 cursor-move hover:shadow-lg transition-shadow"
                              >
                                <div className="space-y-3">
                                  <div>
                                    <h4 className="font-medium text-white mb-1">
                                      {deal.name}
                                    </h4>
                                    <p className="text-sm text-slate-400">
                                      {deal.leadName}
                                    </p>
                                  </div>
                                  
                                  <div className="flex items-center justify-between">
                                    <span className="text-emerald-400 font-semibold">
                                      {formatCurrency(deal.value)}
                                    </span>
                                    <div className="flex items-center gap-1 text-xs text-slate-400">
                                      <ApperIcon name="User" size={12} />
                                      {deal.assignedRep}
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-xs text-slate-400">
                                      <ApperIcon name="Calendar" size={12} />
                                      {deal.timeline}
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-slate-400">
                                      <ApperIcon name="TrendingUp" size={12} />
                                      {deal.probability}%
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </motion.div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;