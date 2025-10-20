import React, { useState } from 'react';
import TaskList from '../../../components/dashboard/task/TaskList';
import DashboardHeader from '../../../components/dashboard/header';
import Sidebar from '../../../components/dashboard/sidebar';

export default function PendingConfirmationTasksApp() {
  const [title, setTitle] = useState('Welcome, Lawal Wahab');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(v => !v);

  return (
    <div id="layout-wrapper">
      <DashboardHeader title={title} onToggleSidebar={toggleSidebar} />
      <Sidebar setTitle={setTitle} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <TaskList type="pending-confirmation" />
    </div>
  );
}
