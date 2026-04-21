#!/usr/bin/env python3
"""Generate Rakesh's universal, ATS-friendly resume as a static PDF.

Design goals (ATS first, visual polish second):
  - Single-column primary flow so parsers read top-to-bottom predictably.
  - Standard section names ("PROFESSIONAL SUMMARY", "TECHNICAL SKILLS",
    "PROFESSIONAL EXPERIENCE", "PROJECTS", "EDUCATION", "AWARDS &
    PUBLICATIONS") — no prefixes or decorative characters that confuse parsers.
  - Standard '•' bullets (U+2022) which every ATS recognises.
  - Standard separators: '|' in the contact line, em-dashes for ranges.
  - No running headers/footers — ATS tools often strip or duplicate them.
  - Embedded core fonts (Helvetica) — no web-font dependencies.
  - Plain text links (visible URLs) alongside hyperlinks so text-extraction
    tools that ignore link annotations still get the URL.

Output: public/Rakesh_Chintanippu_Resume.pdf
Usage:  python3 scripts/generate-resume.py
"""
import os
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.colors import HexColor, black
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate, Paragraph, Spacer, Frame, PageTemplate,
    HRFlowable, Table, TableStyle,
)
from reportlab.lib.enums import TA_LEFT, TA_RIGHT, TA_CENTER, TA_JUSTIFY


# Print-optimised palette. Mint accent is used sparingly for visual hierarchy
# on section rules and company names. Body text stays black for max contrast
# and parseability.
TEXT = HexColor('#111111')
MUTED = HexColor('#555555')
MINT = HexColor('#007A4A')          # darker mint for print legibility
RULE = HexColor('#C8C8D0')


OUT = os.path.abspath(os.path.join(
    os.path.dirname(__file__), '..', 'public', 'Rakesh_Chintanippu_Resume.pdf'
))


_base = getSampleStyleSheet()


def _style(name, **kw):
    return ParagraphStyle(name, parent=_base['Normal'], **kw)


NAME = _style(
    'Name', fontName='Helvetica-Bold', fontSize=20, leading=24,
    alignment=TA_CENTER, textColor=TEXT, spaceAfter=2,
)
TITLE_LINE = _style(
    'TitleLine', fontName='Helvetica', fontSize=10.5, leading=13,
    alignment=TA_CENTER, textColor=TEXT, spaceAfter=3,
)
CONTACT = _style(
    'Contact', fontName='Helvetica', fontSize=9, leading=12,
    alignment=TA_CENTER, textColor=TEXT, spaceAfter=4,
)
SECTION = _style(
    'Section', fontName='Helvetica-Bold', fontSize=11, leading=14,
    textColor=TEXT, spaceBefore=9, spaceAfter=2,
)
BODY = _style(
    'Body', fontName='Helvetica', fontSize=9.5, leading=13,
    textColor=TEXT, spaceAfter=2, alignment=TA_JUSTIFY,
)
ROLE_L = _style(
    'RoleL', fontName='Helvetica-Bold', fontSize=10, leading=12.5,
    textColor=TEXT,
)
ROLE_R = _style(
    'RoleR', fontName='Helvetica', fontSize=9.5, leading=12.5,
    textColor=TEXT, alignment=TA_RIGHT,
)
SKILL_LABEL = _style(
    'SkillLabel', fontName='Helvetica-Bold', fontSize=9.3, leading=12.4,
    textColor=TEXT,
)
SKILL_VAL = _style(
    'SkillVal', fontName='Helvetica', fontSize=9.3, leading=12.4,
    textColor=TEXT,
)
BULLET = _style(
    'Bullet', fontName='Helvetica', fontSize=9.3, leading=12.5,
    textColor=TEXT, leftIndent=12, bulletIndent=0, spaceAfter=1,
    alignment=TA_JUSTIFY,
)
PROJECT_TITLE = _style(
    'ProjectTitle', fontName='Helvetica-Bold', fontSize=9.8, leading=12.5,
    textColor=TEXT, spaceBefore=2, spaceAfter=1,
)


def rule():
    return HRFlowable(
        width='100%', thickness=0.5, color=RULE, spaceBefore=0, spaceAfter=4,
    )


def bullet(text):
    # Standard U+2022 bullet — universal ATS support.
    return Paragraph(f'• {text}', BULLET)


def role_header(left_html, right_html):
    tbl = Table(
        [[Paragraph(left_html, ROLE_L), Paragraph(right_html, ROLE_R)]],
        colWidths=[4.9 * inch, 2.3 * inch],
        hAlign='LEFT',
    )
    tbl.setStyle(TableStyle([
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 1),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    return tbl


def skill_row(label, value):
    # Rendered as one paragraph so ATS reads it as a single "Label: values" line.
    return Paragraph(f'<b>{label}:</b> {value}', SKILL_VAL)


def section(title):
    return [Paragraph(title, SECTION), rule()]


def build():
    doc = BaseDocTemplate(
        OUT,
        pagesize=LETTER,
        leftMargin=0.6 * inch,
        rightMargin=0.6 * inch,
        topMargin=0.5 * inch,
        bottomMargin=0.5 * inch,
        title='Rakesh Chintanippu — Resume',
        author='Rakesh Chintanippu',
        subject='Full-Stack Engineer, AI Platforms, Cloud-Native Microservices',
        keywords='Full-Stack Engineer, AI Engineer, Python, FastAPI, React, TypeScript, LLM, RAG, LangGraph, AWS, GCP, Docker, Kubernetes, Microservices',
    )
    frame = Frame(
        doc.leftMargin, doc.bottomMargin,
        doc.width, doc.height, id='frame',
        leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
    )
    # No running header / footer — ATS parsers sometimes duplicate or garble those.
    doc.addPageTemplates([PageTemplate(id='main', frames=[frame])])

    story = []

    # ---- Header: name + contact ----
    story.append(Paragraph('RAKESH CHINTANIPPU', NAME))
    story.append(Paragraph(
        'Full-Stack Engineer | AI Platforms | Cloud-Native Microservices',
        TITLE_LINE,
    ))
    story.append(Paragraph(
        'rakeshswe2026@gmail.com | (980) 666-8179 | '
        '<link href="https://github.com/rakesh580">github.com/rakesh580</link> | '
        '<link href="https://www.linkedin.com/in/rakesh-c-231334329/">linkedin.com/in/rakesh-c</link> | '
        '<link href="https://rakesh580.github.io/Rakesh_Portfolio/">rakesh580.github.io/Rakesh_Portfolio</link>',
        CONTACT,
    ))

    # ---- Professional Summary ----
    story.extend(section('PROFESSIONAL SUMMARY'))
    story.append(Paragraph(
        'Software Engineer with 4+ years of experience building production-grade '
        'AI platforms, real-time systems, and cloud-native microservices. Hands-on with '
        'LLM APIs (Groq, Gemma, OpenAI, Anthropic), retrieval-augmented generation (RAG), '
        'agentic workflows (LangGraph), vector search (ChromaDB), and full-stack engineering '
        'across FastAPI, React 19, TypeScript, Spring Boot, and Node.js/Express. Proven '
        'track record shipping to AWS (EKS, Lambda), GCP Cloud Run, and Docker-based CI/CD '
        'at scale, sustaining 10M+ daily requests at 99.9% uptime. Master of Science in '
        'Computer Science, North Carolina A&amp;T State University (GPA 3.9/4.0). '
        'Outstanding Graduate Research Award, 2023.',
        BODY,
    ))

    # ---- Technical Skills ----
    story.extend(section('TECHNICAL SKILLS'))
    story.append(skill_row('Languages', 'Python, TypeScript, JavaScript, Java, Go, SQL, Bash, C#'))
    story.append(skill_row('AI and Machine Learning',
        'LLM APIs (Groq, OpenAI, Anthropic, Gemma 4), Prompt Engineering, Retrieval-Augmented '
        'Generation (RAG), LangGraph, LangChain, ChromaDB, Vector Search, TensorFlow.js, '
        'PyTorch, scikit-learn, Hugging Face'))
    story.append(skill_row('Frontend',
        'React 19, Next.js, Vite, TypeScript, Tailwind CSS, Framer Motion, Redux, Chart.js, Leaflet'))
    story.append(skill_row('Backend',
        'FastAPI, Flask, Django, Node.js, Express, Spring Boot, Microservices, REST APIs, '
        'WebSockets, Server-Sent Events, gRPC'))
    story.append(skill_row('Databases',
        'PostgreSQL, MySQL, MongoDB, Redis, ChromaDB, SQLAlchemy, Prisma, SQL Query Optimization'))
    story.append(skill_row('Cloud and DevOps',
        'AWS (EKS, EC2, Lambda, S3), GCP Cloud Run, Microsoft Azure, Docker, Kubernetes, '
        'GitHub Actions, Jenkins, GitLab CI/CD, Terraform'))
    story.append(skill_row('Security and Authentication',
        'JWT, OAuth2, SSO, SAML, Google OAuth, Responsible AI, Data Privacy, HIPAA-aligned encryption'))
    story.append(skill_row('Practices',
        'Agile, Scrum, Code Review, System Design, Cross-Functional Collaboration, Mentorship'))

    # ---- Professional Experience ----
    story.extend(section('PROFESSIONAL EXPERIENCE'))

    story.append(role_header(
        'Cruxito Tech Solutions LLC &nbsp;&nbsp; <font color="#007A4A">Software Engineer</font>',
        'May 2024 – Present<br/>USA',
    ))
    story.append(bullet(
        'Built LLM-powered application features using Azure OpenAI, Groq, and Anthropic APIs '
        'with advanced prompt engineering and multi-provider routing, enabling intelligent '
        'processing across enterprise workflows.'))
    story.append(bullet(
        'Developed and deployed FastAPI microservices exposing AI capabilities to frontend '
        'clients, sustaining 10M+ daily requests at 99.9% uptime in production.'))
    story.append(bullet(
        'Implemented retrieval-augmented generation (RAG) pipelines integrating vector stores '
        '(ChromaDB) with PostgreSQL and MongoDB to surface contextually relevant data for '
        'AI-driven responses.'))
    story.append(bullet(
        'Engineered low-latency backend services via distributed Redis caching, reducing '
        'end-to-end API response times by 35%.'))
    story.append(bullet(
        'Architected real-time systems with WebSockets and Server-Sent Events streaming for '
        'collaborative platforms, supporting concurrent user sessions with sub-second message delivery.'))
    story.append(bullet(
        'Enforced enterprise CI/CD practices using Git, GitLab, and GitHub Actions, integrating '
        'data privacy, security, and responsible AI deployment guidelines.'))

    story.append(Spacer(1, 4))
    story.append(role_header(
        'North Carolina A&amp;T State University &nbsp;&nbsp; <font color="#007A4A">Graduate Research Assistant</font>',
        'Aug 2022 – May 2024<br/>Greensboro, NC',
    ))
    story.append(bullet(
        'Built automated machine learning data-preparation pipelines using Python, scikit-learn, '
        'and PyTorch, reducing feature engineering time by 50% for an NSF-funded federated '
        'learning project.'))
    story.append(bullet(
        'Processed and validated 100GB+ datasets for model training and evaluation, ensuring '
        'data quality and compliance with research governance standards.'))
    story.append(bullet(
        'Engineered a federated learning model leveraging Federated Averaging and edge computing '
        'for privacy-preserving IoT health data aggregation.'))
    story.append(bullet(
        'Designed a clustering framework integrating LSTM and GRU networks, improving anomaly '
        'detection accuracy in IoT healthcare data.'))
    story.append(bullet(
        'Built Streamlit and React dashboards backed by FastAPI and PostgreSQL, surfacing model '
        'outputs to cross-disciplinary research teams.'))
    story.append(bullet(
        'Led Agile sprint planning, mentored peers on code quality, and owned core processing '
        'modules end-to-end.'))

    story.append(Spacer(1, 4))
    story.append(role_header(
        'Capgemini Technology Services &nbsp;&nbsp; <font color="#007A4A">Software Engineer</font>',
        'Jun 2020 – Jul 2022<br/>Hyderabad, India',
    ))
    story.append(bullet(
        'Developed enterprise web applications and RESTful APIs in Python and Java, reducing '
        'internal data-request turnaround by 60%.'))
    story.append(bullet(
        'Shipped a responsive digital banking platform serving 200,000+ customers, enabling '
        'seamless account management and transactions.'))
    story.append(bullet(
        'Implemented multi-factor authentication and security hardening, reducing fraudulent '
        'login attempts by 70%.'))
    story.append(bullet(
        'Optimized SQL schemas and queries in MySQL and PostgreSQL, improving application '
        'response times by 30%.'))
    story.append(bullet(
        'Integrated financial planning tools that increased user engagement with savings and '
        'investment products by 30%.'))
    story.append(bullet(
        'Maintained CI/CD pipelines via Jenkins, Docker, and Git, supporting reliable and '
        'repeatable service delivery.'))

    # ---- Projects ----
    story.extend(section('PROJECTS'))

    story.append(Paragraph(
        'Wellby, AI Health Companion '
        '(React 19, Express, Prisma, Gemma 4, TensorFlow.js, GCP Cloud Run)', PROJECT_TITLE))
    story.append(bullet(
        'Built an enterprise AI health platform with 110+ API endpoints, 120+ React components, '
        '21 database models, and a unified multi-provider AI router across Groq, Gemma 4, '
        'OpenAI, and Anthropic, with admin-configurable per-category routing.'))
    story.append(bullet(
        'Shipped AI symptom triage, a 200-drug interaction checker, Medical RAG, multi-modal '
        'vision meal scanning, TensorFlow.js anomaly detection, and gamified wellness with '
        'HIPAA-aligned encryption.'))

    story.append(Paragraph(
        'Collective Brain, Team Knowledge Platform '
        '(React 19, FastAPI, ChromaDB, LangGraph, Redis, PostgreSQL)', PROJECT_TITLE))
    story.append(bullet(
        'Developed a full-stack knowledge management platform with 7 source connectors '
        '(Git, Markdown, PDF, DOCX, Slack, Discord, web), dual AI modes (RAG and LangGraph '
        'agents), and real-time WebSocket chat rooms backed by Redis pub/sub.'))
    story.append(bullet(
        'Shipped auto-generated knowledge graph, team expertise scoring, and weekly AI insights '
        'with Google OAuth authentication; deployed via Docker Compose.'))

    story.append(Paragraph(
        'SkyPulse, AI Weather Intelligence '
        '(React 19, FastAPI, LLaMA 3.3 70B, Docker, AWS EC2)', PROJECT_TITLE))
    story.append(bullet(
        'Built a 1,800-line FastAPI backend with 20+ endpoints, rate limiting, TTL caching, '
        'and parallel data fetching; LLaMA 3.3 70B chat with weather, route, and health context '
        'injection.'))
    story.append(bullet(
        'Shipped Activity Optimizer, Health Journal (pressure-symptom correlation), Journey '
        'Corridor (route weather), Logistics Optimizer, and Microclimate Analysis modules.'))

    story.append(Paragraph(
        'EdgeTicker, Stock Intelligence Platform '
        '(React 19, FastAPI, Mistral-7B, Server-Sent Events)', PROJECT_TITLE))
    story.append(bullet(
        'Built a full-stack trading platform with backtested BUY/HOLD/AVOID signals '
        '(SMA-200 and RSI-14), signal-confidence scoring over 3-year windows, multi-timeframe '
        'conflict alerts, and a streaming Market Copilot (Mistral-7B via Server-Sent Events).'))

    # ---- Education ----
    story.extend(section('EDUCATION'))
    story.append(role_header(
        'North Carolina A&amp;T State University &nbsp;&nbsp; <font color="#007A4A">Master of Science, Computer Science</font>',
        'May 2024<br/>GPA 3.9 / 4.0',
    ))
    story.append(Spacer(1, 2))
    story.append(role_header(
        'Vidya Jyothi Institute of Technology (VJIT), India &nbsp;&nbsp; <font color="#007A4A">Bachelor of Technology, Computer Science</font>',
        'May 2022<br/>GPA 3.8 / 4.0',
    ))

    # ---- Awards & Publications ----
    story.extend(section('AWARDS AND PUBLICATIONS'))
    story.append(bullet(
        '<b>Outstanding Graduate Research Award</b>, North Carolina A&amp;T State University '
        '(2023) for Federated Learning and privacy-preserving AI analytics.'))
    story.append(bullet(
        '<b>Published Research:</b> "Exploring Secure and Private Data Aggregation Techniques '
        'for the Internet of Things: A Comprehensive Review," <i>Discover Internet of Things</i>.'))
    story.append(bullet(
        '<b>Innovator of the Year Award</b> (2024) for CMS backend development boosting SME '
        'engagement by 30%.'))

    doc.build(story)
    size_kb = os.path.getsize(OUT) // 1024
    print(f'Wrote {OUT}  ({size_kb} KB)')


if __name__ == '__main__':
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    build()
