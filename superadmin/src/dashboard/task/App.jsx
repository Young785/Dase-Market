import React, { useState } from 'react';
import TaskConfirmation from '../../components/dashboard/task/TaskConfirmation';
import DashboardHeader from '../../components/dashboard/header';
import Sidebar from '../../components/dashboard/sidebar';

export default function TaskApp() {
  const [title, setTitle] = useState('Welcome, Lawal Wahab');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(v => !v);

  return (
    <div id="layout-wrapper">
      <DashboardHeader title={title} onToggleSidebar={toggleSidebar} />
      <Sidebar setTitle={setTitle} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <TaskConfirmation />
    </div>
  );
}
