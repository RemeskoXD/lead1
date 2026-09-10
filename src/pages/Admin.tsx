import React, { useEffect, useState, useRef } from 'react';
import { Search, Lock, LogOut, Download, Upload, Database, RefreshCw, AlertCircle, CheckCircle2, X } from 'lucide-react';

interface Lead {
  id: number;
  name: string;
  phone: string;
  email?: string;
  service: string;
  current_price: string;
  status: string;
  notes: string;
  created_at: string;
}

export default function Admin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Database Backup & Restore state
  const [exporting, setExporting] = useState(false);
  const [restoreModalOpen, setRestoreModalOpen] = useState(false);
  const [parsedRestoreData, setParsedRestoreData] = useState<any[] | null>(null);
  const [restoreFileName, setRestoreFileName] = useState('');
  const [restoreMode, setRestoreMode] = useState<'merge' | 'replace'>('merge');
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      fetchLeads(token);
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        fetchLeads(data.token);
      } else {
        setLoginError('Špatné jméno nebo heslo.');
      }
    } catch (err) {
      setLoginError('Chyba připojení k serveru.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setLeads([]);
  };

  const fetchLeads = async (tokenOverride?: string) => {
    setLoading(true);
    const token = tokenOverride || localStorage.getItem('adminToken');
    try {
      const res = await fetch('/api/leads', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setLeads(data);
    } catch (err) {
      setError('Nepodařilo se načíst data.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/leads/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (res.status === 401) {
        handleLogout();
        return;
      }
      if (res.ok) {
        setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
      } else {
        alert('Nepodařilo se změnit status.');
      }
    } catch (err) {
      alert('Chyba připojení k serveru.');
    }
  };

  const handleNoteChange = async (id: number, newNote: string) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/leads/${id}/notes`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ notes: newNote }),
      });
      
      if (res.status === 401) {
        handleLogout();
        return;
      }
      if (res.ok) {
        setLeads(leads.map(lead => lead.id === id ? { ...lead, notes: newNote } : lead));
      } else {
        alert('Nepodařilo se uložit poznámku.');
      }
    } catch (err) {
      alert('Chyba připojení k serveru.');
    }
  };

  // Stažení zálohy databáze ve formátu JSON
  const handleExportBackup = async () => {
    setExporting(true);
    setNotification(null);
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch('/api/database/backup', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      if (!res.ok) throw new Error('Nepodařilo se vygenerovat zálohu databáze.');
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const dateStr = new Date().toISOString().split('T')[0];
      a.download = `optiva-databaze-${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setNotification({ type: 'success', message: 'Záloha databáze byla úspěšně stažena do vašeho počítače.' });
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Chyba při stahování zálohy.' });
    } finally {
      setExporting(false);
    }
  };

  // Načtení souboru ze souborového systému
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setNotification(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        
        let records: any[] = [];
        if (Array.isArray(parsed)) {
          records = parsed;
        } else if (parsed && Array.isArray(parsed.leads)) {
          records = parsed.leads;
        } else {
          throw new Error('Neznámý formát souboru. Soubor musí obsahovat pole záznamů kontaktů.');
        }

        if (records.length === 0) {
          throw new Error('Vybraný soubor neobsahuje žádné kontakty k obnovení.');
        }

        setParsedRestoreData(records);
        setRestoreFileName(file.name);
        setRestoreModalOpen(true);
      } catch (err: any) {
        setNotification({ type: 'error', message: `Chyba při čtení souboru: ${err.message}` });
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  // Potvrzení a odeslání obnovy na server
  const confirmRestore = async () => {
    if (!parsedRestoreData) return;
    setRestoreLoading(true);
    setNotification(null);
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch('/api/database/restore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          leads: parsedRestoreData,
          mode: restoreMode
        })
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      const result = await res.json();
      if (res.ok && result.success) {
        setNotification({ 
          type: 'success', 
          message: `✅ Databáze byla úspěšně obnovena! Bylo nahráno celkem ${result.restoredCount} kontaktů.` 
        });
        setRestoreModalOpen(false);
        setParsedRestoreData(null);
        fetchLeads();
      } else {
        throw new Error(result.error || 'Obnova databáze selhala.');
      }
    } catch (err: any) {
      setNotification({ type: 'error', message: `Chyba při obnově: ${err.message}` });
    } finally {
      setRestoreLoading(false);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const query = searchQuery.toLowerCase();
    return (
      lead.name.toLowerCase().includes(query) ||
      lead.phone.includes(query) ||
      (lead.email && lead.email.toLowerCase().includes(query)) ||
      lead.service.toLowerCase().includes(query)
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hotovo': return 'bg-green-100 text-green-800 border-green-200';
      case 'Nezvedá': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Storno': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">Přihlášení do administrace</h1>
          
          {loginError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm border border-red-100 text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Heslo administrátora
              </label>
              <input
                type="password"
                placeholder="Zadejte heslo ze Secrets..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm shadow-xs"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Uživatelské jméno (volitelné, výchozí: admin)
              </label>
              <input
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors cursor-pointer shadow-xs text-sm"
            >
              Vstoupit do administrace
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10 font-sans">
      {/* Hidden file input for database restore */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelected}
        accept=".json,application/json"
        className="hidden"
      />

      <div className="max-w-7xl mx-auto">
        {/* Header and Toolbar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Administrace Leadů</h1>
              <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                {leads.length} {leads.length === 1 ? 'kontakt' : (leads.length >= 2 && leads.length <= 4 ? 'kontakty' : 'kontaktů')}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Správa poptávek, stavu vyřízení a bezpečná záloha/obnova databáze.
            </p>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            {/* Database Backup & Restore buttons */}
            <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-200 shadow-xs">
              <button
                onClick={handleExportBackup}
                disabled={exporting}
                title="Stáhnout kompletní kopii databáze ve formátu JSON"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer border border-emerald-200 disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{exporting ? 'Stahuji...' : 'Zálohovat databázi'}</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                title="Obnovit nebo importovat kontakty ze záložního JSON souboru"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer border border-blue-200"
              >
                <Upload className="w-4 h-4" />
                <span>Obnovit ze zálohy</span>
              </button>
            </div>

            {/* Refresh table */}
            <button 
              onClick={() => fetchLeads()}
              title="Znovu načíst data ze serveru"
              className="p-2 bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors text-sm font-medium cursor-pointer shadow-xs"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Logout */}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors text-xs sm:text-sm font-medium cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Odhlásit</span>
            </button>
          </div>
        </div>

        {/* Global Notification Banner */}
        {notification && (
          <div className={`p-4 rounded-2xl mb-6 flex items-center justify-between border shadow-xs animate-in fade-in duration-200 ${
            notification.type === 'success' 
              ? 'bg-emerald-50 text-emerald-900 border-emerald-200' 
              : 'bg-red-50 text-red-900 border-red-200'
          }`}>
            <div className="flex items-center gap-3">
              {notification.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="font-medium text-sm">{notification.message}</span>
            </div>
            <button 
              onClick={() => setNotification(null)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-black/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Hledat podle jména, telefonu, e-mailu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-xs"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100">
            {error}
          </div>
        )}

        {/* Leads Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 text-xs font-bold uppercase tracking-wider">
                  <th className="p-4">ID</th>
                  <th className="p-4">Datum</th>
                  <th className="p-4">Jméno</th>
                  <th className="p-4">Kontakt</th>
                  <th className="p-4">Služby</th>
                  <th className="p-4">Platí</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 min-w-[220px]">Poznámka</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="p-10 text-center text-gray-500">
                      Načítám data...
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-10 text-center text-gray-500">
                      {searchQuery ? 'Žádné leady neodpovídají hledání.' : 'Zatím nemáte v databázi žádné kontakty.'}
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="p-4 text-gray-400 font-mono text-xs">#{lead.id}</td>
                      <td className="p-4 text-xs text-gray-600 whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleString('cs-CZ')}
                      </td>
                      <td className="p-4 font-bold text-gray-900">{lead.name}</td>
                      <td className="p-4">
                        <div className="font-mono text-xs font-bold text-blue-950">
                          {lead.phone}
                        </div>
                        {lead.email ? (
                          <div className="text-xs text-gray-500 mt-0.5">
                            {lead.email}
                          </div>
                        ) : null}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {lead.service.split(', ').map((s, idx) => (
                            <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-gray-900 font-semibold text-xs whitespace-nowrap">
                        {lead.current_price && lead.current_price !== 'Nezadáno' ? lead.current_price : '-'}
                      </td>
                      <td className="p-4">
                        <select
                          value={lead.status || 'Nové'}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border outline-none cursor-pointer ${getStatusColor(lead.status || 'Nové')}`}
                        >
                          <option value="Nové">Nové</option>
                          <option value="Hotovo">Hotovo</option>
                          <option value="Nezvedá">Nezvedá</option>
                          <option value="Storno">Storno</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <textarea
                          defaultValue={lead.notes || ''}
                          onBlur={(e) => handleNoteChange(lead.id, e.target.value)}
                          placeholder="Zde můžete připsat poznámku k zákazníkovi..."
                          className="w-full text-xs p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y min-h-[42px] bg-gray-50/60 focus:bg-white transition-colors placeholder:text-gray-400"
                          rows={2}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Restore Confirmation Modal */}
      {restoreModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-lg w-full p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900 font-display">Obnova databáze ze souboru</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Import kontaktů ze záložního JSON souboru</p>
                </div>
              </div>
              <button
                onClick={() => { setRestoreModalOpen(false); setParsedRestoreData(null); }}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-neutral-50 rounded-2xl p-4 border border-gray-200 space-y-2.5 text-sm">
              <div className="flex justify-between items-center text-gray-600">
                <span>Vybraný soubor:</span>
                <span className="font-semibold text-gray-900 font-mono text-xs bg-white px-2 py-1 rounded-md border border-gray-200 max-w-[200px] truncate">
                  {restoreFileName}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Nalezeno kontaktů v souboru:</span>
                <span className="font-extrabold text-blue-600 text-base">{parsedRestoreData?.length || 0}</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-800">Zvolte způsob obnovy:</label>
              
              <label className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                restoreMode === 'merge' ? 'border-blue-500 bg-blue-50/60 shadow-xs ring-1 ring-blue-500' : 'border-gray-200 hover:bg-gray-50'
              }`}>
                <input
                  type="radio"
                  name="restoreMode"
                  checked={restoreMode === 'merge'}
                  onChange={() => setRestoreMode('merge')}
                  className="mt-1 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <div className="text-sm font-bold text-gray-900">Sloučit s existujícími kontakty (Doporučeno)</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    Zachová stávající kontakty v databázi. Přidá nové a aktualizuje shodné záznamy, takže nepřijdete o novější poptávky.
                  </div>
                </div>
              </label>

              <label className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                restoreMode === 'replace' ? 'border-red-500 bg-red-50/60 shadow-xs ring-1 ring-red-500' : 'border-gray-200 hover:bg-gray-50'
              }`}>
                <input
                  type="radio"
                  name="restoreMode"
                  checked={restoreMode === 'replace'}
                  onChange={() => setRestoreMode('replace')}
                  className="mt-1 text-red-600 focus:ring-red-500"
                />
                <div>
                  <div className="text-sm font-bold text-red-950">Úplně přepsat stávající databázi</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    Vymaže všechny stávající kontakty a nahradí je přesně obsahem z tohoto souboru.
                  </div>
                </div>
              </label>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => { setRestoreModalOpen(false); setParsedRestoreData(null); }}
                disabled={restoreLoading}
                className="w-full sm:w-1/2 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-colors cursor-pointer"
              >
                Zrušit
              </button>
              <button
                type="button"
                onClick={confirmRestore}
                disabled={restoreLoading}
                className={`w-full sm:w-1/2 py-2.5 px-4 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                  restoreMode === 'replace' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {restoreLoading ? (
                  <span>Obnovuji databázi...</span>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Potvrdit obnovení</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
