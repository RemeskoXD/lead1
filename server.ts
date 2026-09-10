import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json({ limit: '15mb' }));

// Inicializace SQLite databáze
const db = new Database('leads.db');
db.pragma('journal_mode = WAL');

// Vytvoření tabulky pro leady
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Přidání sloupce current_price, pokud ještě neexistuje
try {
  db.exec('ALTER TABLE leads ADD COLUMN current_price TEXT');
} catch (e) {
  // Sloupec už pravděpodobně existuje
}

// Přidání sloupce status, pokud ještě neexistuje
try {
  db.exec("ALTER TABLE leads ADD COLUMN status TEXT DEFAULT 'Nové'");
} catch (e) {
  // Sloupec už pravděpodobně existuje
}

// Přidání sloupce notes, pokud ještě neexistuje
try {
  db.exec("ALTER TABLE leads ADD COLUMN notes TEXT DEFAULT ''");
} catch (e) {
  // Sloupec už pravděpodobně existuje
}

// Přidání sloupce email, pokud ještě neexistuje
try {
  db.exec("ALTER TABLE leads ADD COLUMN email TEXT DEFAULT ''");
} catch (e) {
  // Sloupec už pravděpodobně existuje
}

// Nastavení e-mailového klienta (Nodemailer)
// Pro produkci doplňte SMTP údaje do .env souboru
const isSecurePort = process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465';
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: isSecurePort,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Ověření SMTP připojení při startu (log do konzole pro diagnostiku)
if (process.env.SMTP_HOST && process.env.SMTP_USER) {
  transporter.verify((error) => {
    if (error) {
      console.warn('⚠️ SMTP ověření selhalo (zkontrolujte heslo/host):', error.message);
    } else {
      console.log('✅ SMTP server je úspěšně připojen a připraven k odesílání e-mailů.');
    }
  });
}

// API endpoint pro uložení leadu
app.post('/api/leads', async (req, res) => {
  const { name, phone, email, services, currentPrice } = req.body;
  
  if (!name || !phone) {
    return res.status(400).json({ error: 'Jméno a telefon jsou povinné.' });
  }

  try {
    // Uložení do databáze
    const stmt = db.prepare('INSERT INTO leads (name, phone, email, service, current_price) VALUES (?, ?, ?, ?, ?)');
    const info = stmt.run(name, phone, email || '', services || 'Nezadáno', currentPrice || 'Nezadáno');

    // Cílový e-mail pro notifikaci o novém leadu (SMTP_TO, nebo přihlašovací SMTP_USER, nebo fallback)
    const adminRecipient = process.env.SMTP_TO || process.env.SMTP_USER || 'info@optiva.cz';
    const senderFrom = process.env.SMTP_FROM || (process.env.SMTP_USER ? `"Optiva Lead" <${process.env.SMTP_USER}>` : '"Optiva Lead" <info@optiva.cz>');

    // Odeslání e-mailu administrátorovi
    try {
      await transporter.sendMail({
        from: senderFrom,
        to: adminRecipient,
        subject: `Nový lead z webu Optiva: ${name} (${phone})`,
        text: `Nová poptávka z webu Optiva:\n\nJméno: ${name}\nTelefon: ${phone}\nE-mail: ${email || 'Nezadáno'}\nSlužby: ${services}\nAktuálně platí: ${currentPrice || 'Nezadáno'}\nČas: ${new Date().toLocaleString('cs-CZ')}`,
      });
      console.log(`E-mail adminovi (${adminRecipient}) úspěšně odeslán.`);
    } catch (emailErr) {
      console.error('Chyba při odesílání e-mailu adminovi:', emailErr);
    }

    // Odeslání potvrzovacího e-mailu zákazníkovi
    if (email && email.includes('@')) {
      try {
        await transporter.sendMail({
          from: senderFrom,
          to: email,
          subject: 'Potvrzení přijetí poptávky - Optiva',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
              <div style="background-color: #1e3a8a; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Optiva</h1>
              </div>
              <div style="padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
                <h2 style="color: #1e3a8a; margin-top: 0;">Dobrý den, ${name},</h2>
                <p>děkujeme za Vaši poptávku. Úspěšně jsme ji přijali a brzy se Vám ozveme s návrhem řešení, jak ušetřit na telekomunikačních službách.</p>
                
                <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #4b5563; font-size: 16px;">Shrnutí Vaší poptávky:</h3>
                  <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
                    <li><strong>Služby:</strong> ${services || 'Nezadáno'}</li>
                    <li><strong>Aktuální měsíční útrata:</strong> ${currentPrice || 'Nezadáno'}</li>
                    <li><strong>Telefon:</strong> ${phone}</li>
                  </ul>
                </div>
                
                <p>Naši specialisté nyní analyzují aktuální nabídky na trhu, aby pro Vás našli to nejlepší řešení.</p>
                <p>S pozdravem,<br><strong>Tým Optiva</strong></p>
              </div>
              <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
                Toto je automaticky generovaný e-mail, prosím neodpovídejte na něj.
              </div>
            </div>
          `
        });
        console.log('Potvrzovací e-mail zákazníkovi úspěšně odeslán.');
      } catch (customerEmailErr) {
        console.error('Chyba při odesílání e-mailu zákazníkovi:', customerEmailErr);
      }
    }

    res.json({ success: true, id: info.lastInsertRowid });
  } catch (err) {
    console.error('Chyba databáze:', err);
    res.status(500).json({ error: 'Chyba při ukládání do databáze.' });
  }
});

const SECRET_TOKEN = 'super-secret-admin-token-987654321';

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const expectedPass = process.env.ADMIN_PASSWORD;
  const expectedUser = process.env.ADMIN_USERNAME || 'admin';
  
  // Pokud není ADMIN_PASSWORD definováno v Secrets, je nastaveno výchozí bezpečné heslo
  const validPassword = expectedPass || 'VelmiDlouheAHodnetajneHesloProAdmina2026!!!';

  // Umožňuje přihlášení buď pouhým heslem (pokud username není zadán), nebo kombinací username + password
  const isUsernameMatch = !username || username.trim() === '' || username === expectedUser;
  const isPasswordMatch = password === validPassword;

  if (isUsernameMatch && isPasswordMatch) {
    res.json({ success: true, token: SECRET_TOKEN });
  } else {
    res.status(401).json({ error: 'Neplatné heslo nebo přihlašovací údaje.' });
  }
});

const requireAuth = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (authHeader === `Bearer ${SECRET_TOKEN}`) {
    next();
  } else {
    res.status(401).json({ error: 'Neautorizovaný přístup.' });
  }
};

// API endpoint pro získání všech leadů (pro Admin panel)
app.get('/api/leads', requireAuth, (req, res) => {
  try {
    const leads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
    res.json(leads);
  } catch (err) {
    console.error('Chyba databáze:', err);
    res.status(500).json({ error: 'Chyba při načítání dat z databáze.' });
  }
});

// API endpoint pro aktualizaci statusu
app.put('/api/leads/:id/status', requireAuth, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  try {
    const stmt = db.prepare('UPDATE leads SET status = ? WHERE id = ?');
    stmt.run(status, id);
    res.json({ success: true });
  } catch (err) {
    console.error('Chyba databáze:', err);
    res.status(500).json({ error: 'Chyba při aktualizaci statusu.' });
  }
});

// API endpoint pro aktualizaci poznámky
app.put('/api/leads/:id/notes', requireAuth, (req, res) => {
  const { id } = req.params;
  const { notes } = req.body;
  
  try {
    const stmt = db.prepare('UPDATE leads SET notes = ? WHERE id = ?');
    stmt.run(notes, id);
    res.json({ success: true });
  } catch (err) {
    console.error('Chyba databáze:', err);
    res.status(500).json({ error: 'Chyba při aktualizaci poznámky.' });
  }
});

// API endpoint pro zálohu / uložení celé databáze (Export do JSON)
app.get('/api/database/backup', requireAuth, (req, res) => {
  try {
    const leads = db.prepare('SELECT * FROM leads ORDER BY id ASC').all();
    const backupData = {
      app: 'Optiva Lead Manager',
      version: '1.0',
      exported_at: new Date().toISOString(),
      total_records: leads.length,
      leads: leads
    };
    
    const dateStr = new Date().toISOString().split('T')[0];
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="optiva-databaze-${dateStr}.json"`);
    res.send(JSON.stringify(backupData, null, 2));
  } catch (err: any) {
    console.error('Chyba při exportu databáze:', err);
    res.status(500).json({ error: 'Chyba při exportu databáze: ' + err.message });
  }
});

// API endpoint pro obnovení databáze ze souboru zálohy
app.post('/api/database/restore', requireAuth, (req, res) => {
  try {
    const { leads, mode = 'merge' } = req.body;
    
    if (!Array.isArray(leads)) {
      return res.status(400).json({ error: 'Neplatný formát souboru. V datech chybí seznam leadů.' });
    }

    if (leads.length === 0) {
      return res.status(400).json({ error: 'Soubor neobsahuje žádné záznamy k obnovení.' });
    }

    const restoreTransaction = db.transaction((records: any[]) => {
      // Pokud je zvolen režim úplného přepsání, promažeme tabulku
      if (mode === 'replace') {
        db.prepare('DELETE FROM leads').run();
      }

      const insertStmt = db.prepare(`
        INSERT OR REPLACE INTO leads (id, name, phone, email, service, current_price, status, notes, created_at)
        VALUES (@id, @name, @phone, @email, @service, @current_price, @status, @notes, @created_at)
      `);

      let count = 0;
      for (const item of records) {
        if (!item.name || !item.phone) continue;
        insertStmt.run({
          id: item.id || null,
          name: String(item.name || '').trim(),
          phone: String(item.phone || '').trim(),
          email: String(item.email || '').trim(),
          service: String(item.service || 'Nezadáno'),
          current_price: String(item.current_price || 'Nezadáno'),
          status: String(item.status || 'Nové'),
          notes: String(item.notes || ''),
          created_at: item.created_at || new Date().toISOString()
        });
        count++;
      }
      return count;
    });

    const restoredCount = restoreTransaction(leads);

    console.log(`Úspěšně obnoveno ${restoredCount} záznamů v databázi (režim: ${mode}).`);
    res.json({
      success: true,
      restoredCount,
      message: `Úspěšně obnoveno ${restoredCount} kontaktů v databázi.`
    });
  } catch (err: any) {
    console.error('Chyba při obnově databáze:', err);
    res.status(500).json({ error: 'Chyba při obnovení databáze: ' + err.message });
  }
});

// Explicitní SEO endpointy pro vyhledávače (Google, Seznam.cz, Bing)
app.get('/robots.txt', (req, res) => {
  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
  res.type('text/plain').sendFile(robotsPath);
});

app.get('/sitemap.xml', (req, res) => {
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  res.type('application/xml').sendFile(sitemapPath);
});

async function startServer() {
  // Integrace Vite pro vývojové prostředí
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Statické soubory pro produkci
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server běží na portu ${PORT}`);
  });
}

startServer();
