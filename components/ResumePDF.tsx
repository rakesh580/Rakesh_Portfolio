
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Font,
} from '@react-pdf/renderer';
import { PROJECTS, TIMELINE } from '../constants';

// Register JetBrains Mono so the PDF matches the site's terminal aesthetic.
// Using the public Google Fonts static CDN — @react-pdf fetches at render time.
Font.register({
  family: 'JetBrainsMono',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOU.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnTMRj8yKxTOlOU.ttf', fontWeight: 700 },
  ],
});

Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v19/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v19/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7W0Q5n-wU.ttf', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v19/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7W0Q5nuwU.ttf', fontWeight: 700 },
  ],
});

const C = {
  void: '#08080C',
  mint: '#00C878',
  text: '#15151C',
  muted: '#5A5A68',
  faint: '#B4B4BE',
  border: '#E4E4EC',
};

const s = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    color: C.text,
    fontFamily: 'Inter',
    fontSize: 9.5,
    padding: 36,
    lineHeight: 1.45,
  },
  header: {
    borderBottom: `1.5pt solid ${C.mint}`,
    paddingBottom: 10,
    marginBottom: 14,
  },
  name: {
    fontFamily: 'JetBrainsMono',
    fontSize: 22,
    fontWeight: 700,
    color: C.text,
    letterSpacing: -0.5,
  },
  role: {
    fontSize: 10,
    color: C.muted,
    marginTop: 2,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 6,
    fontSize: 8.5,
    color: C.muted,
  },
  link: { color: C.mint, textDecoration: 'none' },
  sectionTitle: {
    fontFamily: 'JetBrainsMono',
    fontSize: 9,
    fontWeight: 700,
    color: C.mint,
    letterSpacing: 2,
    marginTop: 14,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  summary: {
    fontSize: 9.5,
    lineHeight: 1.55,
    color: C.text,
  },
  twoCol: {
    flexDirection: 'row',
    gap: 16,
  },
  colLeft: { flex: 2 },
  colRight: { flex: 1 },
  jobBlock: { marginBottom: 8 },
  jobHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  jobRole: { fontSize: 10.5, fontWeight: 700, color: C.text },
  jobCompany: { fontSize: 9.5, color: C.mint, fontWeight: 600 },
  jobPeriod: { fontSize: 8.5, color: C.muted, fontFamily: 'JetBrainsMono' },
  jobLocation: { fontSize: 8.5, color: C.muted, marginBottom: 2 },
  jobDesc: { fontSize: 9, color: C.text, marginTop: 2 },
  bulletRow: { flexDirection: 'row', marginTop: 1.5 },
  bullet: { color: C.mint, width: 8, fontFamily: 'JetBrainsMono', fontSize: 9 },
  bulletText: { flex: 1, fontSize: 9 },
  stackLine: { fontSize: 8.5, color: C.muted, marginTop: 3, fontFamily: 'JetBrainsMono' },

  projectBlock: { marginBottom: 8 },
  projectTitle: { fontSize: 10, fontWeight: 700, color: C.text },
  projectMission: { fontSize: 8.5, color: C.muted, marginTop: 1, fontStyle: 'italic' },
  projectTech: { fontSize: 8, color: C.mint, marginTop: 2, fontFamily: 'JetBrainsMono' },

  skillRow: { flexDirection: 'row', marginBottom: 3 },
  skillLabel: {
    width: 70,
    fontSize: 8.5,
    color: C.muted,
    fontFamily: 'JetBrainsMono',
    fontWeight: 700,
  },
  skillText: { flex: 1, fontSize: 9, color: C.text },
});

const Divider: React.FC = () => (
  <View style={{ height: 1, backgroundColor: C.border, marginVertical: 4 }} />
);

const ResumePDF: React.FC = () => {
  const topProjects = PROJECTS.slice(0, 5);
  return (
    <Document title="Rakesh Chintanippu — Resume" author="Rakesh Chintanippu">
      <Page size="LETTER" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <Text style={s.name}>RAKESH CHINTANIPPU</Text>
          <Text style={s.role}>
            Full-Stack Engineer  ·  AI Platforms  ·  Cloud-Native Microservices
          </Text>
          <View style={s.contactRow}>
            <Link src="mailto:rakeshswe2026@gmail.com" style={s.link}>rakeshswe2026@gmail.com</Link>
            <Text>(980) 666-8179</Text>
            <Link src="https://github.com/rakesh580" style={s.link}>github.com/rakesh580</Link>
            <Link src="https://www.linkedin.com/in/rakesh-c-231334329/" style={s.link}>linkedin.com/in/rakesh-c</Link>
            <Link src="https://rakesh580.github.io/Rakesh_Portfolio/" style={s.link}>portfolio</Link>
          </View>
        </View>

        {/* Summary */}
        <Text style={s.sectionTitle}>// Summary</Text>
        <Text style={s.summary}>
          Software engineer building production-grade AI platforms, real-time systems, and
          cloud-native microservices. 4+ years of shipping end-to-end products across LLM
          orchestration (RAG, LangGraph, multi-provider routing), full-stack engineering
          (FastAPI, React 19, TypeScript), and cloud infrastructure (AWS EKS, GCP Cloud Run,
          Docker CI/CD). MS Computer Science, NC A&amp;T (3.9/4.0). Outstanding Graduate
          Research Award (2023).
        </Text>

        <View style={s.twoCol}>
          <View style={s.colLeft}>
            {/* Experience */}
            <Text style={s.sectionTitle}>// Experience</Text>
            {TIMELINE.map((t, i) => (
              <View key={i} style={s.jobBlock}>
                <View style={s.jobHeader}>
                  <View>
                    <Text style={s.jobRole}>{t.role}</Text>
                    <Text style={s.jobCompany}>{t.company}</Text>
                  </View>
                  <Text style={s.jobPeriod}>{t.period}</Text>
                </View>
                {t.location && <Text style={s.jobLocation}>{t.location}</Text>}
                <Text style={s.jobDesc}>{t.description}</Text>
                {t.impact?.map((imp, j) => (
                  <View key={j} style={s.bulletRow}>
                    <Text style={s.bullet}>&gt;</Text>
                    <Text style={s.bulletText}>{imp}</Text>
                  </View>
                ))}
                <Text style={s.stackLine}>{t.stack.join('  ·  ')}</Text>
              </View>
            ))}

            {/* Selected Projects */}
            <Text style={s.sectionTitle}>// Selected Projects</Text>
            {topProjects.map((p) => (
              <View key={p.id} style={s.projectBlock}>
                <Text style={s.projectTitle}>{p.title}</Text>
                <Text style={s.projectMission}>{p.mission}</Text>
                {p.metrics && p.metrics.slice(0, 3).map((m, j) => (
                  <View key={j} style={s.bulletRow}>
                    <Text style={s.bullet}>&gt;</Text>
                    <Text style={s.bulletText}>{m}</Text>
                  </View>
                ))}
                <Text style={s.projectTech}>{p.tech.slice(0, 8).join('  ·  ')}</Text>
              </View>
            ))}
          </View>

          <View style={s.colRight}>
            {/* Skills */}
            <Text style={s.sectionTitle}>// Skills</Text>
            <View style={s.skillRow}>
              <Text style={s.skillLabel}>LANGS</Text>
              <Text style={s.skillText}>Python, TypeScript, JavaScript, Java, SQL</Text>
            </View>
            <View style={s.skillRow}>
              <Text style={s.skillLabel}>FRONTEND</Text>
              <Text style={s.skillText}>React 19, Vite, Tailwind, Framer Motion, Next.js</Text>
            </View>
            <View style={s.skillRow}>
              <Text style={s.skillLabel}>BACKEND</Text>
              <Text style={s.skillText}>FastAPI, Flask, Django, Spring Boot, Express, Node</Text>
            </View>
            <View style={s.skillRow}>
              <Text style={s.skillLabel}>AI/ML</Text>
              <Text style={s.skillText}>LangGraph, RAG, ChromaDB, LLaMA, Mistral, Gemma 4, Groq, OpenAI, Anthropic, TensorFlow.js</Text>
            </View>
            <View style={s.skillRow}>
              <Text style={s.skillLabel}>DATA</Text>
              <Text style={s.skillText}>PostgreSQL, Redis, ChromaDB, SQLAlchemy, Prisma</Text>
            </View>
            <View style={s.skillRow}>
              <Text style={s.skillLabel}>CLOUD</Text>
              <Text style={s.skillText}>AWS (EKS, Lambda, EC2), GCP Cloud Run, Docker, K8s, GitHub Actions</Text>
            </View>
            <View style={s.skillRow}>
              <Text style={s.skillLabel}>AUTH</Text>
              <Text style={s.skillText}>JWT, OAuth2, SSO/SAML, Google OAuth</Text>
            </View>

            <Divider />

            {/* Education */}
            <Text style={s.sectionTitle}>// Education</Text>
            <Text style={{ fontSize: 9.5, fontWeight: 700 }}>MS, Computer Science</Text>
            <Text style={{ fontSize: 9, color: C.mint }}>North Carolina A&amp;T State University</Text>
            <Text style={{ fontSize: 8.5, color: C.muted }}>GPA 3.9 / 4.0  ·  2022 – 2024</Text>
            <View style={{ height: 6 }} />
            <Text style={{ fontSize: 9.5, fontWeight: 700 }}>BS, Computer Science</Text>
            <Text style={{ fontSize: 9, color: C.mint }}>VJIT, India</Text>
            <Text style={{ fontSize: 8.5, color: C.muted }}>GPA 3.8 / 4.0</Text>

            <Divider />

            {/* Awards */}
            <Text style={s.sectionTitle}>// Awards</Text>
            <View style={s.bulletRow}>
              <Text style={s.bullet}>&gt;</Text>
              <Text style={s.bulletText}>Outstanding Graduate Research Award (2023)</Text>
            </View>
            <View style={s.bulletRow}>
              <Text style={s.bullet}>&gt;</Text>
              <Text style={s.bulletText}>Published research on federated learning & IoT data aggregation</Text>
            </View>
            <View style={s.bulletRow}>
              <Text style={s.bullet}>&gt;</Text>
              <Text style={s.bulletText}>1st place hackathon — real-time collaboration platform</Text>
            </View>

            <Divider />

            {/* Certifications */}
            <Text style={s.sectionTitle}>// Certifications</Text>
            <View style={s.bulletRow}>
              <Text style={s.bullet}>&gt;</Text>
              <Text style={s.bulletText}>Google — Bits &amp; Bytes of Computer Networking (Coursera)</Text>
            </View>
            <View style={s.bulletRow}>
              <Text style={s.bullet}>&gt;</Text>
              <Text style={s.bulletText}>University of Michigan — Programming for Everybody</Text>
            </View>
            <View style={s.bulletRow}>
              <Text style={s.bullet}>&gt;</Text>
              <Text style={s.bulletText}>Cisco — Programming Essentials in Python (PCAP)</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDF;
