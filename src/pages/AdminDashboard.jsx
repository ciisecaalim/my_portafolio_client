import React, { useState } from 'react';
import Topbar from '../components/dashboard/Topbar';
import Sidebar from '../components/dashboard/Sidebar';
import StatCard from '../components/dashboard/StatCard';
import ProjectCard from '../components/dashboard/ProjectCard';
import SkillsPanel from '../components/dashboard/SkillsPanel';
import NetworkPanel from '../components/dashboard/NetworkPanel';
import MultimediaPanel from '../components/dashboard/MultimediaPanel';
import SettingsPanel from '../components/dashboard/SettingsPanel';
import Modal from '../components/dashboard/Modal';

const AdminDashboard = () => {
  const [active, setActive] = useState('overview');
  const [settingsOpen, setSettingsOpen] = useState(false);

  const stats = [
    { title: 'Uptime', value: '99.98%', color: 'from-green-400 to-green-600' },
    { title: 'Active Users', value: '1,248', color: 'from-indigo-400 to-indigo-600' },
    { title: 'Projects', value: '32', color: 'from-yellow-400 to-yellow-600' },
    { title: 'Errors', value: '3', color: 'from-red-400 to-red-600' },
  ];

  const projects = new Array(6).fill(0).map((_, i) => ({
    id: i + 1,
    title: `Project ${i + 1}`,
    status: i % 3 === 0 ? 'Staging' : i % 3 === 1 ? 'Live' : 'Paused',
    tech: ['React', 'Node.js', 'MongoDB']
  }));

  return (
    <div className="min-h-screen flex bg-gray-900 text-gray-100">
      <Sidebar active={active} setActive={setActive} />
      <div className="flex-1 flex flex-col">
        <Topbar onOpenSettings={() => setSettingsOpen(true)} />

        {/* Settings modal */}
        {typeof window !== 'undefined' && (
          <>
            {settingsOpen && (
              <Modal open={settingsOpen} onClose={() => setSettingsOpen(false)} title="Settings">
                <SettingsPanel />
              </Modal>
            )}
          </>
        )}

        <main className="p-8 space-y-8">
          {active === 'settings' ? (
            <section>
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <div className="glass-dark p-6 rounded-xl">
                <SettingsPanel />
              </div>
            </section>
          ) : (
            <>
              {/* Overview */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((s) => (
                    <StatCard key={s.title} title={s.title} value={s.value} color={s.color} />
                  ))}
                </div>
              </section>

              <section className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Projects Status</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {projects.map(p => (
                        <ProjectCard key={p.id} project={p} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Technology Usage</h3>
                    <div className="glass-dark p-4 rounded-xl">
                      <SkillsPanel />
                    </div>
                  </div>
                </div>

                <aside className="space-y-6">
                  <div className="glass-dark p-4 rounded-xl">
                    <h3 className="text-lg font-semibold mb-3">Network Settings</h3>
                    <NetworkPanel />
                  </div>

                  <div className="glass-dark p-4 rounded-xl">
                    <h3 className="text-lg font-semibold mb-3">Multimedia</h3>
                    <MultimediaPanel />
                  </div>

                  <div className="glass-dark p-4 rounded-xl">
                    <h3 className="text-lg font-semibold mb-3">Settings</h3>
                    <SettingsPanel />
                  </div>
                </aside>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
