import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

type Role = 'Administrador' | 'Operador';
type Person = {
  id: string;
  name: string;
  cpf: string;
  email: string;
  status: 'Ativa' | 'Inativa';
  createdAt: string;
};

type Session = { username: string; role: Role };

const PEOPLE_KEY = 'accesscontrol-demo-people';
const SESSION_KEY = 'accesscontrol-demo-session';

const demoUsers: Record<string, { password: string; role: Role }> = {
  admin: { password: 'Admin123!', role: 'Administrador' },
  operador: { password: 'Operador123!', role: 'Operador' },
};

function readPeople(): Person[] {
  try {
    return JSON.parse(localStorage.getItem(PEOPLE_KEY) || '[]') as Person[];
  } catch {
    return [];
  }
}

function readSession(): Session | null {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') as Session | null;
  } catch {
    return null;
  }
}

function LoginPage({ onLogin }: { onLogin: (session: Session) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const account = demoUsers[username.trim().toLowerCase()];
    if (!account || account.password !== password) {
      setError('Usuário ou senha inválidos.');
      return;
    }
    onLogin({ username: username.trim(), role: account.role });
  }

  return (
    <main className="login-shell">
      <section className="login-card">
        <div className="brand-mark">AC</div>
        <p className="eyebrow">AMBIENTE DE DEMONSTRAÇÃO</p>
        <h1>AccessControl</h1>
        <p className="muted">Entre para gerenciar pessoas e permissões de acesso.</p>
        <form onSubmit={submit} className="form-stack">
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            data-testid="login-username"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Informe seu usuário"
            required
          />
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            data-testid="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Informe sua senha"
            required
          />
          {error && <p role="alert" className="form-error">{error}</p>}
          <button data-testid="login-submit" className="button button-primary" type="submit">Entrar</button>
        </form>
        <div className="demo-accounts">
          <strong>Contas para teste local</strong>
          <span>Administrador: admin / Admin123!</span>
          <span>Operador: operador / Operador123!</span>
        </div>
        <p className="disclaimer">Protótipo fictício. Não utilize dados pessoais reais.</p>
      </section>
    </main>
  );
}

function PeoplePage({ session, onLogout }: { session: Session; onLogout: () => void }) {
  const [people, setPeople] = useState<Person[]>(readPeople);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'Ativa' | 'Inativa'>('Ativa');
  const [query, setQuery] = useState('');
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem(PEOPLE_KEY, JSON.stringify(people));
  }, [people]);

  const filteredPeople = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('pt-BR');
    if (!normalized) return people;
    return people.filter((person) =>
      person.name.toLocaleLowerCase('pt-BR').includes(normalized) ||
      person.cpf.includes(normalized.replace(/\D/g, '')),
    );
  }, [people, query]);

  function resetForm() {
    setName('');
    setCpf('');
    setEmail('');
    setStatus('Ativa');
    setEditingId(null);
    setIsFormOpen(false);
    setError('');
  }

  function startNewPerson() {
    resetForm();
    setIsFormOpen(true);
    setFeedback('');
  }

  function startEdit(person: Person) {
    setEditingId(person.id);
    setName(person.name);
    setCpf(person.cpf);
    setEmail(person.email);
    setStatus(person.status);
    setIsFormOpen(true);
    setFeedback('');
    setError('');
  }

  function savePerson(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const normalizedCpf = cpf.replace(/\D/g, '');
    if (normalizedCpf.length !== 11) {
      setError('Informe um CPF com 11 dígitos.');
      return;
    }
    const duplicate = people.some((person) =>
      person.cpf === normalizedCpf && person.id !== editingId && person.status === 'Ativa',
    );
    if (duplicate) {
      setError('Já existe uma pessoa ativa cadastrada com este CPF.');
      return;
    }

    if (editingId) {
      setPeople((current) => current.map((person) => person.id === editingId
        ? { ...person, name: name.trim(), cpf: normalizedCpf, email: email.trim(), status }
        : person));
      setFeedback('Dados da pessoa atualizados com sucesso.');
    } else {
      const person: Person = {
        id: crypto.randomUUID(),
        name: name.trim(),
        cpf: normalizedCpf,
        email: email.trim(),
        status: 'Ativa',
        createdAt: new Date().toISOString(),
      };
      setPeople((current) => [person, ...current]);
      setFeedback('Pessoa cadastrada com sucesso.');
    }
    resetForm();
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="sidebar-brand" to="/pessoas"><span className="brand-mark small">AC</span><span>AccessControl</span></Link>
        <p className="sidebar-label">MENU PRINCIPAL</p>
        <Link className="nav-link active" to="/pessoas">Pessoas</Link>
        <span className="nav-link disabled" title="Módulo planejado para próxima etapa">Credenciais <small>Em breve</small></span>
        <span className="nav-link disabled" title="Módulo planejado para próxima etapa">Eventos <small>Em breve</small></span>
        <div className="sidebar-bottom">
          <span className="avatar">{session.username.slice(0, 1).toUpperCase()}</span>
          <div className="user-info"><strong>{session.username}</strong><span>{session.role}</span></div>
          <button className="icon-button" onClick={onLogout} aria-label="Sair" title="Sair">↪</button>
        </div>
      </aside>

      <main className="content">
        <header className="topbar">
          <div><span className="breadcrumb">Gestão / Pessoas</span><h1>Pessoas cadastradas</h1></div>
          <div className="topbar-user"><span className="status-dot" />{session.role}</div>
        </header>

        <section className="page-body">
          <div className="page-intro">
            <div><h2>Gerencie as pessoas</h2><p>Cadastre, consulte e mantenha os dados das pessoas.</p></div>
            <button data-testid="person-new" className="button button-primary" onClick={startNewPerson}>+ Nova pessoa</button>
          </div>

          {feedback && <div data-testid="person-success-message" className="notice success" role="status">{feedback}</div>}

          <section className="panel">
            <div className="panel-toolbar">
              <div><h3>Lista de pessoas</h3><span className="muted">{filteredPeople.length} registro(s)</span></div>
              <input
                className="search-input"
                aria-label="Pesquisar por nome ou CPF"
                placeholder="Pesquisar por nome ou CPF"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Nome</th><th>CPF</th><th>E-mail</th><th>Status</th><th>Ações</th></tr></thead>
                <tbody>
                  {filteredPeople.map((person) => (
                    <tr key={person.id} data-testid={`person-row-${person.cpf}`}>
                      <td><strong>{person.name}</strong></td>
                      <td>{person.cpf}</td>
                      <td>{person.email}</td>
                      <td><span className={person.status === 'Ativa' ? 'pill active' : 'pill inactive'}>{person.status}</span></td>
                      <td><button className="text-button" onClick={() => startEdit(person)}>Editar</button></td>
                    </tr>
                  ))}
                  {filteredPeople.length === 0 && <tr><td colSpan={5} className="empty-state">Nenhuma pessoa encontrada.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>

          {isFormOpen && (
            <div className="modal-backdrop">
              <section className="modal" role="dialog" aria-modal="true" aria-labelledby="person-form-title">
                <div className="modal-heading"><div><span className="eyebrow">DADOS CADASTRAIS</span><h2 id="person-form-title">{editingId ? 'Editar pessoa' : 'Nova pessoa'}</h2></div><button className="icon-button" onClick={resetForm} aria-label="Fechar">×</button></div>
                <form onSubmit={savePerson} className="form-stack">
                  <label htmlFor="person-name">Nome completo</label>
                  <input id="person-name" data-testid="person-name" value={name} onChange={(event) => setName(event.target.value)} required minLength={3} />
                  <label htmlFor="person-cpf">CPF</label>
                  <input id="person-cpf" data-testid="person-cpf" value={cpf} onChange={(event) => setCpf(event.target.value.replace(/\D/g, '').slice(0, 11))} inputMode="numeric" maxLength={11} required />
                  <label htmlFor="person-email">E-mail</label>
                  <input id="person-email" data-testid="person-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                  {editingId && <><label htmlFor="person-status">Status</label><select id="person-status" value={status} onChange={(event) => setStatus(event.target.value as 'Ativa' | 'Inativa')}><option>Ativa</option><option>Inativa</option></select></>}
                  {error && <p data-testid="person-validation-message" role="alert" className="form-error">{error}</p>}
                  <div className="modal-actions"><button type="button" className="button button-secondary" onClick={resetForm}>Cancelar</button><button data-testid="person-save" type="submit" className="button button-primary">Salvar</button></div>
                </form>
              </section>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState<Session | null>(readSession);
  const navigate = useNavigate();

  function login(nextSession: Session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
    setSession(nextSession);
    navigate('/pessoas');
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
    navigate('/');
  }

  return (
    <Routes>
      <Route path="/" element={session ? <Navigate to="/pessoas" replace /> : <LoginPage onLogin={login} />} />
      <Route path="/pessoas" element={session ? <PeoplePage session={session} onLogout={logout} /> : <Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to={session ? '/pessoas' : '/'} replace />} />
    </Routes>
  );
}
