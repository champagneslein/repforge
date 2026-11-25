// A company's public website, shown full-screen inside RepForge so trainees
// can research an account: home, about and leadership, products, careers,
// news and blog. Content comes from ./content.js.
import React, { useState } from 'react';
import { companySite } from './content';

const PAGES = [['home', 'Home'], ['about', 'About'], ['products', 'Products'], ['careers', 'Careers'], ['news', 'News'], ['blog', 'Blog']];

export default function CompanySite({ company, people, onClose, onOpenPerson }) {
  const [page, setPage] = useState('home');
  const [article, setArticle] = useState(null);
  const [job, setJob] = useState(null);
  const s = companySite(company, people);
  const c = s.color;
  const go = p => { setPage(p); setArticle(null); setJob(null); };
  const ink = '#14161c', mute = '#5b6270', line = '#e6e8ee';
  const btn = { border: 'none', background: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit', padding: 0 };
  const card = { border: '1px solid ' + line, borderRadius: 12, padding: 20, background: '#fff' };
  const h2 = { fontSize: 28, lineHeight: 1.15, margin: '0 0 8px', fontWeight: 800, letterSpacing: '-0.02em' };
  const person = p => p && <button style={{ ...btn, color: c, fontWeight: 600 }} onClick={() => onOpenPerson && onOpenPerson(p.id)}>{p.name}</button>;
  const wrap = { maxWidth: 1040, margin: '0 auto', padding: '40px 24px' };

  let body;
  if (article) {
    body = (
      <div style={{ ...wrap, maxWidth: 720 }}>
        <button style={{ ...btn, color: c, marginBottom: 16 }} onClick={() => setArticle(null)}>← All articles</button>
        <h1 style={{ ...h2, fontSize: 34 }}>{article.title}</h1>
        <p style={{ color: mute, margin: '0 0 28px' }}>{article.author ? <>By {person(article.author)}, {article.author.title} · </> : null}{article.date} · {article.readMins} min read</p>
        {article.body.map((p, i) => <p key={i} style={{ fontSize: 17, lineHeight: 1.7, margin: '0 0 18px' }}>{p}</p>)}
      </div>
    );
  } else if (job) {
    body = (
      <div style={{ ...wrap, maxWidth: 720 }}>
        <button style={{ ...btn, color: c, marginBottom: 16 }} onClick={() => setJob(null)}>← All jobs</button>
        <h1 style={{ ...h2, fontSize: 34 }}>{job.title}</h1>
        <p style={{ color: mute, margin: '0 0 24px' }}>{job.location} · {job.type} · Posted {job.posted} ago{job.hiringManager ? <> · Hiring manager: {person(job.hiringManager)}, {job.hiringManager.title}</> : null}</p>
        <p style={{ fontSize: 17, lineHeight: 1.7 }}>{job.summary}</p>
        <h3 style={{ margin: '24px 0 8px' }}>What you'll do</h3>
        <ul style={{ fontSize: 16, lineHeight: 1.8, paddingLeft: 20 }}>{job.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
        <h3 style={{ margin: '24px 0 8px' }}>About {company.name}</h3>
        <p style={{ lineHeight: 1.7, color: mute }}>{s.about}</p>
      </div>
    );
  } else if (page === 'home') {
    body = (
      <>
        <section style={{ background: c, color: '#fff' }}>
          <div style={{ ...wrap, padding: '72px 24px' }}>
            <h1 style={{ fontSize: 'clamp(32px,5vw,52px)', lineHeight: 1.05, margin: '0 0 16px', fontWeight: 800, letterSpacing: '-0.03em', maxWidth: 760 }}>{s.tagline}</h1>
            <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 620, margin: '0 0 28px' }}>{company.description}. Based in {company.location}.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={() => go('products')} style={{ ...btn, background: '#fff', color: c, padding: '12px 20px', borderRadius: 999, fontWeight: 700 }}>See what we do</button>
              <button onClick={() => go('careers')} style={{ ...btn, border: '2px solid #fff', padding: '10px 18px', borderRadius: 999, fontWeight: 700 }}>We're hiring · {s.careers.length} roles</button>
            </div>
          </div>
        </section>
        <div style={wrap}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 40 }}>
            {s.stats.map(([v, l], i) => <div key={i} style={card}><div style={{ fontSize: 30, fontWeight: 800, color: c }}>{v}</div><div style={{ color: mute }}>{l}</div></div>)}
          </div>
          <p style={{ color: mute, fontWeight: 600, marginBottom: 10 }}>{s.customersLabel}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 28px', marginBottom: 44, fontWeight: 700, color: '#8a90a0', fontSize: 18 }}>{s.customers.map(x => <span key={x}>{x}</span>)}</div>
          <h2 style={h2}>Latest from {company.name}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16, marginTop: 16 }}>
            {s.news.slice(0, 3).map((n, i) => <div key={i} style={card}><div style={{ color: mute, fontSize: 13 }}>{n.date}</div><div style={{ fontWeight: 700, margin: '6px 0' }}>{n.title}</div><button style={{ ...btn, color: c }} onClick={() => go('news')}>Read more →</button></div>)}
          </div>
        </div>
      </>
    );
  } else if (page === 'about') {
    body = (
      <div style={wrap}>
        <h1 style={h2}>About {company.name}</h1>
        <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 760 }}>{s.about}</p>
        <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 760 }}><strong>Our mission:</strong> {s.mission}</p>
        {s.priorities.length > 0 && <><h3 style={{ marginTop: 28 }}>Our priorities this year</h3><ul style={{ fontSize: 17, lineHeight: 1.8 }}>{s.priorities.map(p => <li key={p}>{p}</li>)}</ul></>}
        <h3 style={{ marginTop: 28 }}>Our values</h3>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>{s.values.map(v => <span key={v} style={{ border: '1px solid ' + line, borderRadius: 999, padding: '6px 14px' }}>{v}</span>)}</div>
        <h2 style={{ ...h2, marginTop: 40 }}>Leadership</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16, marginTop: 16 }}>
          {s.leadership.map(p => <div key={p.id} style={card}><div style={{ width: 48, height: 48, borderRadius: '50%', background: c, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, marginBottom: 10 }}>{p.name.split(' ').map(w => w[0]).join('')}</div>{person(p)}<div style={{ color: mute }}>{p.title}</div></div>)}
        </div>
      </div>
    );
  } else if (page === 'products') {
    body = (
      <div style={wrap}>
        <h1 style={h2}>{TECHY(company) ? 'Products' : 'What we do'}</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16, marginTop: 20 }}>
          {s.offerings.map(o => <div key={o.name} style={card}><div style={{ width: 36, height: 6, background: c, borderRadius: 3, marginBottom: 14 }} /><div style={{ fontWeight: 800, fontSize: 20, marginBottom: 8 }}>{o.name}</div><p style={{ color: mute, lineHeight: 1.6, margin: 0 }}>{o.text}</p></div>)}
        </div>
      </div>
    );
  } else if (page === 'careers') {
    body = (
      <div style={wrap}>
        <h1 style={h2}>Careers at {company.name}</h1>
        <p style={{ fontSize: 18, color: mute, maxWidth: 680 }}>We're {company.employees.toLocaleString()} people and growing. Here's where we're hiring right now.</p>
        <div style={{ marginTop: 24, borderTop: '1px solid ' + line }}>
          {s.careers.map(j => (
            <button key={j.id} onClick={() => setJob(j)} style={{ ...btn, display: 'flex', width: '100%', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', padding: '18px 4px', borderBottom: '1px solid ' + line, textAlign: 'left' }}>
              <span><span style={{ fontWeight: 700, fontSize: 18, display: 'block' }}>{j.title}</span><span style={{ color: mute }}>{j.location} · {j.type}</span></span>
              <span style={{ color: mute, whiteSpace: 'nowrap' }}>Posted {j.posted} ago →</span>
            </button>
          ))}
        </div>
      </div>
    );
  } else if (page === 'news') {
    body = (
      <div style={{ ...wrap, maxWidth: 760 }}>
        <h1 style={h2}>News & press</h1>
        {s.news.map((n, i) => <article key={i} style={{ padding: '22px 0', borderBottom: '1px solid ' + line }}><div style={{ color: mute, fontSize: 14 }}>{n.date}</div><h3 style={{ margin: '6px 0 8px', fontSize: 21 }}>{n.title}</h3><p style={{ margin: 0, lineHeight: 1.7 }}>{n.text}</p></article>)}
      </div>
    );
  } else {
    body = (
      <div style={wrap}>
        <h1 style={h2}>The {company.name} blog</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16, marginTop: 20 }}>
          {s.blog.map(b => <button key={b.id} onClick={() => setArticle(b)} style={{ ...btn, ...card, textAlign: 'left' }}><div style={{ color: mute, fontSize: 13 }}>{b.date} · {b.readMins} min read</div><div style={{ fontWeight: 800, fontSize: 19, margin: '8px 0' }}>{b.title}</div><div style={{ color: mute }}>{b.author ? b.author.name + ', ' + b.author.title : company.name}</div></button>)}
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(5,10,20,0.6)', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: '#1d2230', color: '#cfd5e2', fontSize: 13 }}>
        <span style={{ flex: 1, background: '#2a3142', borderRadius: 999, padding: '6px 14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>https://www.{s.domain}/{article ? 'blog/' + article.id : job ? 'careers/' + job.id : page === 'home' ? '' : page}</span>
        <button onClick={onClose} style={{ ...btn, background: '#2a3142', borderRadius: 8, padding: '6px 12px', color: '#fff' }}>Close website ✕</button>
      </div>
      <div style={{ flex: 1, overflow: 'auto', background: '#fff', color: ink }}>
        <header style={{ position: 'sticky', top: 0, background: '#fff', borderBottom: '1px solid ' + line, zIndex: 1 }}>
          <div style={{ ...wrap, padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <button onClick={() => go('home')} style={{ ...btn, display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, fontSize: 20, marginRight: 'auto' }}>
              <span style={{ width: 30, height: 30, borderRadius: 8, background: c, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 14 }}>{company.name.slice(0, 1)}</span>{company.name}
            </button>
            <nav style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
              {PAGES.slice(1).map(([k, l]) => <button key={k} onClick={() => go(k)} style={{ ...btn, fontWeight: page === k && !article && !job ? 700 : 500, color: page === k && !article && !job ? c : ink, minHeight: 32 }}>{l}</button>)}
            </nav>
          </div>
        </header>
        {body}
        <footer style={{ borderTop: '1px solid ' + line, color: mute, fontSize: 14 }}>
          <div style={{ ...wrap, padding: '24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <span>© {new Date().getFullYear()} {company.name} · {company.location}</span>
            <span>Fictional company for RepForge sales training</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

const TECHY = c => ['SaaS', 'AI', 'Cyber Security', 'FinTech'].includes(c.industry);
