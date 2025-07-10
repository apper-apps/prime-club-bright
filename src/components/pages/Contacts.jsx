import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import FilterSelect from "@/components/molecules/FilterSelect";
import ContactsTable from "@/components/organisms/ContactsTable";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { leadsService } from "@/services/api/leadsService";
import { toast } from "react-toastify";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [repFilter, setRepFilter] = useState("");

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await leadsService.getAll();
      setContacts(data);
      setFilteredContacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  useEffect(() => {
    let filtered = contacts;

    if (searchTerm) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(contact => contact.status === statusFilter);
    }

    if (repFilter) {
      filtered = filtered.filter(contact => contact.assignedRep === repFilter);
    }

    setFilteredContacts(filtered);
  }, [contacts, searchTerm, statusFilter, repFilter]);

  const handleUpdateContact = async (contactId, updates) => {
    try {
      const updatedContact = await leadsService.update(contactId, updates);
      setContacts(contacts.map(contact => 
        contact.Id === contactId ? updatedContact : contact
      ));
    } catch (err) {
      toast.error("Failed to update contact");
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      await leadsService.delete(contactId);
      setContacts(contacts.filter(contact => contact.Id !== contactId));
      toast.success("Contact deleted successfully");
    } catch (err) {
      toast.error("Failed to delete contact");
    }
  };

  if (loading) return <Loading variant="table" />;
  if (error) return <Error message={error} onRetry={loadContacts} />;

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "new", label: "New" },
    { value: "contacted", label: "Contacted" },
    { value: "qualified", label: "Qualified" },
    { value: "unqualified", label: "Unqualified" },
    { value: "closed", label: "Closed" },
  ];

  const repOptions = [
    { value: "", label: "All Reps" },
    ...Array.from(new Set(contacts.map(contact => contact.assignedRep)))
      .map(rep => ({ value: rep, label: rep }))
  ];

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
          <h1 className="text-2xl font-bold text-white mb-2">Contacts</h1>
          <p className="text-slate-400">
            Manage your leads and contacts. Total: {filteredContacts.length}
          </p>
        </div>
        
        <Button variant="primary" size="lg">
          <ApperIcon name="UserPlus" size={20} />
          Add Contact
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <SearchBar
          placeholder="Search contacts..."
          onSearch={setSearchTerm}
          onClear={() => setSearchTerm("")}
          className="flex-1"
        />
        
        <FilterSelect
          options={statusOptions}
          placeholder="Filter by status"
          onFilter={setStatusFilter}
          className="w-full md:w-48"
        />
        
        <FilterSelect
          options={repOptions}
          placeholder="Filter by rep"
          onFilter={setRepFilter}
          className="w-full md:w-48"
        />
      </motion.div>

      {/* Contacts Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {filteredContacts.length === 0 ? (
          <Empty
            title="No contacts found"
            description="No contacts match your current filters. Try adjusting your search or add a new contact."
            icon="Users"
            action={{
              text: "Add Contact",
              icon: "UserPlus",
              onClick: () => toast.info("Add contact functionality coming soon!")
            }}
          />
        ) : (
          <ContactsTable
            contacts={filteredContacts}
            onUpdateContact={handleUpdateContact}
            onDeleteContact={handleDeleteContact}
          />
        )}
      </motion.div>
    </div>
  );
};

export default Contacts;