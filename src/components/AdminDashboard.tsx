import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, CheckCircle, XCircle, Utensils, Download, Trash2, Key } from 'lucide-react';

interface RsvpData {
  id: string;
  name: string;
  attending: 'yes' | 'no';
  plusOne: 'yes' | 'no';
  meal: 'beef' | 'fish' | 'vegan';
  dietary: string;
  message: string;
  submittedAt: string;
}

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rsvps, setRsvps] = useState<RsvpData[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      const stored = localStorage.getItem('wedding_rsvps');
      if (stored) {
        setRsvps(JSON.parse(stored));
      }
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Highly readable romantic passcode
    if (passcode.toLowerCase() === 'love2026') {
      setIsAuthenticated(true);
    } else {
      setError('Invalid passcode. Hint: "love2026"');
    }
  };

  const handleDelete = (id: string) => {
    const updated = rsvps.filter(item => item.id !== id);
    setRsvps(updated);
    localStorage.setItem('wedding_rsvps', JSON.stringify(updated));
  };

  const handleExport = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(rsvps, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'wedding-rsvps-export.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Calculate Metrics
  const attendingCount = rsvps.filter(r => r.attending === 'yes').length;
  const decliningCount = rsvps.filter(r => r.attending === 'no').length;
  const plusOnes = rsvps.filter(r => r.attending === 'yes' && r.plusOne === 'yes').length;
  const totalGuestsAttending = attendingCount + plusOnes;

  const mealCounts = {
    beef: rsvps.filter(r => r.attending === 'yes' && r.meal === 'beef').length,
    fish: rsvps.filter(r => r.attending === 'yes' && r.meal === 'fish').length,
    vegan: rsvps.filter(r => r.attending === 'yes' && r.meal === 'vegan').length,
  };

  return (
    <div className="relative z-40">
      {/* Absolute Admin Access button placed unobtrusively in footer or side */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 p-4 bg-brand-dark/10 backdrop-blur-md border border-brand-accent/20 text-brand-accent hover:text-brand-dark hover:bg-brand-accent rounded-full shadow-md hover:scale-105 transition-all duration-300 flex items-center justify-center"
        aria-label="Admin Registry Access"
      >
        <Key className="w-5 h-5 stroke-[1.5]" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-dark/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#fdfbf7] border border-brand-accent/20 rounded-3xl w-full max-w-5xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col text-brand-dark"
            >
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-brand-accent/10 flex justify-between items-center bg-white">
                <div>
                  <span className="font-sans text-[9px] uppercase tracking-widest text-brand-accent font-semibold block mb-1">Registry Management</span>
                  <h2 className="font-serif text-2xl text-brand-dark font-light">Sarah & John's Guest List</h2>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsAuthenticated(false);
                    setPasscode('');
                    setError('');
                  }}
                  className="px-4 py-2 border border-brand-accent/15 hover:bg-brand-dark hover:text-white rounded-full font-sans text-[10px] uppercase tracking-widest transition-colors"
                >
                  Close
                </button>
              </div>

              {/* View Content */}
              {!isAuthenticated ? (
                <div className="p-12 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/5 flex items-center justify-center border border-brand-accent/10">
                    <Key className="w-5 h-5 text-brand-accent stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif text-xl font-light">Secure Registry Access</h3>
                  <p className="font-sans text-xs text-brand-dark/50 max-w-xs leading-relaxed font-light">
                    Enter the celebration passcode to unlock guest analytics and dietary registries.
                  </p>
                  
                  <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
                    {error && <p className="text-xs text-red-600 font-sans">{error}</p>}
                    <input
                      type="password"
                      placeholder="Passcode: love2026"
                      className="w-full px-5 py-3 border border-brand-accent/25 rounded-full font-sans text-sm text-center bg-white focus:outline-none focus:border-brand-accent transition-colors text-brand-dark"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="w-full py-3 bg-brand-dark hover:bg-brand-accent text-white hover:text-brand-dark rounded-full font-sans text-xs uppercase tracking-widest transition-colors duration-300"
                    >
                      Authenticate Access
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <div className="bg-white border border-brand-accent/10 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
                      <div className="p-3 bg-brand-accent/5 border border-brand-accent/10 rounded-xl text-brand-accent">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-sans text-[9px] uppercase tracking-wider text-brand-dark/50 block">Total Guests</span>
                        <span className="font-serif text-2xl font-light">{totalGuestsAttending}</span>
                      </div>
                    </div>

                    <div className="bg-white border border-brand-accent/10 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
                      <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-sans text-[9px] uppercase tracking-wider text-brand-dark/50 block">Attending</span>
                        <span className="font-serif text-2xl font-light">{attendingCount}</span>
                      </div>
                    </div>

                    <div className="bg-white border border-brand-accent/10 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
                      <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600">
                        <XCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-sans text-[9px] uppercase tracking-wider text-brand-dark/50 block">Declined</span>
                        <span className="font-serif text-2xl font-light">{decliningCount}</span>
                      </div>
                    </div>

                    <div className="bg-white border border-brand-accent/10 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
                      <div className="p-3 bg-brand-accent/5 border border-brand-accent/10 rounded-xl text-brand-accent">
                        <Utensils className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-sans text-[9px] uppercase tracking-wider text-brand-dark/50 block">Beef / Fish / Vegan</span>
                        <span className="font-serif text-lg font-light">
                          {mealCounts.beef} / {mealCounts.fish} / {mealCounts.vegan}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={handleExport}
                      className="px-5 py-2.5 bg-white border border-brand-accent/15 hover:bg-brand-dark hover:text-white rounded-full font-sans text-[10px] uppercase tracking-widest flex items-center gap-2 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Export Guest List (JSON)
                    </button>
                  </div>

                  {/* Guests Table */}
                  <div className="bg-white border border-brand-accent/10 rounded-2xl overflow-hidden shadow-sm">
                    {rsvps.length === 0 ? (
                      <div className="p-12 text-center text-brand-dark/40 font-sans text-sm">
                        No guest RSVPs submitted yet.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left font-sans text-sm">
                          <thead>
                            <tr className="bg-brand-accent/5 border-b border-brand-accent/10 font-sans text-[10px] uppercase tracking-wider text-brand-dark/50">
                              <th className="py-4 px-6 font-semibold">Guest Name</th>
                              <th className="py-4 px-6 font-semibold">Attending</th>
                              <th className="py-4 px-6 font-semibold">Plus One</th>
                              <th className="py-4 px-6 font-semibold">Meal Course</th>
                              <th className="py-4 px-6 font-semibold">Dietary Notes</th>
                              <th className="py-4 px-6 font-semibold text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-brand-accent/5">
                            {rsvps.map((guest) => (
                              <tr key={guest.id} className="hover:bg-brand-accent/2 transition-colors">
                                <td className="py-4 px-6 font-serif text-base">{guest.name}</td>
                                <td className="py-4 px-6">
                                  {guest.attending === 'yes' ? (
                                    <span className="inline-flex items-center gap-1 text-emerald-700 text-xs font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                                      Attending
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 text-rose-700 text-xs font-semibold bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                                      Declined
                                    </span>
                                  )}
                                </td>
                                <td className="py-4 px-6 font-light">{guest.plusOne === 'yes' ? 'Yes' : 'No'}</td>
                                <td className="py-4 px-6 capitalize font-light">{guest.attending === 'yes' ? guest.meal : '—'}</td>
                                <td className="py-4 px-6 font-light text-brand-dark/70 text-xs truncate max-w-[150px]" title={guest.dietary}>
                                  {guest.dietary || '—'}
                                </td>
                                <td className="py-4 px-6 text-right">
                                  <button
                                    onClick={() => handleDelete(guest.id)}
                                    className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                    aria-label="Delete Guest RSVP"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
