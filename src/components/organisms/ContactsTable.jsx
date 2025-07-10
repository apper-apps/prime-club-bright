import { useState } from "react";
import { motion } from "framer-motion";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import TagInput from "@/components/molecules/TagInput";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const ContactsTable = ({ contacts, onUpdateContact, onDeleteContact }) => {
  const [editingContact, setEditingContact] = useState(null);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const statusOptions = [
    { value: "new", label: "New" },
    { value: "contacted", label: "Contacted" },
    { value: "qualified", label: "Qualified" },
    { value: "unqualified", label: "Unqualified" },
    { value: "closed", label: "Closed" },
  ];

  const statusColors = {
    new: "info",
    contacted: "warning",
    qualified: "success",
    unqualified: "danger",
    closed: "ghost",
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleEdit = (contact) => {
    setEditingContact({ ...contact });
  };

  const handleSave = () => {
    if (editingContact) {
      onUpdateContact(editingContact.Id, editingContact);
      setEditingContact(null);
      toast.success("Contact updated successfully!");
    }
  };

  const handleCancel = () => {
    setEditingContact(null);
  };

  const handleDelete = (contactId) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      onDeleteContact(contactId);
      toast.success("Contact deleted successfully!");
    }
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    const aValue = a[sortField]?.toString().toLowerCase() || "";
    const bValue = b[sortField]?.toString().toLowerCase() || "";
    
    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ApperIcon name="ArrowUpDown" size={16} className="text-slate-400" />;
    return sortDirection === "asc" 
      ? <ApperIcon name="ArrowUp" size={16} className="text-indigo-400" />
      : <ApperIcon name="ArrowDown" size={16} className="text-indigo-400" />;
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900/50 border-b border-slate-700">
            <tr>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Name
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort("email")}
                  className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Email
                  <SortIcon field="email" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort("company")}
                  className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Company
                  <SortIcon field="company" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort("status")}
                  className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Status
                  <SortIcon field="status" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort("assignedRep")}
                  className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Assigned Rep
                  <SortIcon field="assignedRep" />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">
                Tags
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {sortedContacts.map((contact, index) => (
              <motion.tr
                key={contact.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="hover:bg-slate-700/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="text-white font-medium">{contact.name}</div>
                  <div className="text-slate-400 text-sm">{contact.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-slate-300">{contact.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-slate-300">{contact.company}</div>
                </td>
                <td className="px-6 py-4">
                  {editingContact?.Id === contact.Id ? (
                    <Select
                      options={statusOptions}
                      value={editingContact.status}
                      onChange={(e) => setEditingContact({ ...editingContact, status: e.target.value })}
                      className="w-32"
                    />
                  ) : (
                    <Badge variant={statusColors[contact.status] || "default"}>
                      {contact.status}
                    </Badge>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-slate-300">{contact.assignedRep}</div>
                </td>
                <td className="px-6 py-4">
                  {editingContact?.Id === contact.Id ? (
                    <TagInput
                      tags={editingContact.tags || []}
                      onTagsChange={(tags) => setEditingContact({ ...editingContact, tags })}
                      className="min-w-[200px]"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {contact.tags?.map((tag) => (
                        <Badge key={tag} variant="ghost" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {editingContact?.Id === contact.Id ? (
                      <>
                        <Button variant="success" size="sm" onClick={handleSave}>
                          <ApperIcon name="Check" size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleCancel}>
                          <ApperIcon name="X" size={16} />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(contact)}>
                          <ApperIcon name="Edit" size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(contact.Id)}>
                          <ApperIcon name="Trash2" size={16} />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactsTable;