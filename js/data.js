/* ==========================================================================
   Resume Data - Single Source of Truth
   Clean, structured data for the entire application
   ========================================================================== */

const resumeData = {
  // Personal Information
  personal: {
    name: "Aseem Mehrotra",
    title: "Senior Instrumentation Engineer & Data Scientist",
    tagline: "Bridging Industrial Excellence with Data Science Innovation",
    email: "aseem.mehrotra1984@outlook.com",
    phone: "+971 50 821 2454",
    location: "Abu Dhabi, UAE",
    profileImage: "./assets/images/profile.jpg",

    // Social Media Links
    social: {
      linkedin: "https://www.linkedin.com/in/aseem-mehrotra",
      github: "https://github.com/aseemm84",
      streamlit: "https://share.streamlit.io/user/aseemm84"
    },

    // Typing animation text
    typingTexts: [
      "Senior Instrumentation Engineer",
      "Data Science Specialist", 
      "AI & Machine Learning Expert",
      "Industrial Innovation Leader",
      "Digital Transformation Pioneer"
    ],

    // Professional Summary
    summary: "Results-driven professional with over 17 years of industrial excellence in oil and gas sector, now pioneering the intersection of instrumentation engineering and data science. Proven track record of delivering $300K+ project value, leading 15+ member teams, and reducing operational costs by 75%."
  },

  // Professional Experience Timeline
  experience: [
    {
      id: 1,
      title: "Senior Instrumentation Construction Engineer",
      company: "KBR Inc., Abu Dhabi (ADNOC Gas)",
      period: "February 2025 - Present",
      type: "current",
      description: "Leading next-generation engineering solutions while developing AI-powered applications for industrial optimization.",
      achievements: [
        "Validated design integrity for 500+ control and safety valves",
        "Optimized fire & gas system design for ethane recovery projects", 
        "Strengthened operational technology security with Purdue Model implementation",
        "Elevated engineering standards through technical specifications and guidelines",
        "Developed 4+ production Streamlit applications showcasing AI/ML capabilities"
      ]
    },
    {
      id: 2, 
      title: "MSc Data Science for Business",
      company: "University of Stirling, Scotland", 
      period: "2023 - 2024",
      type: "education",
      description: "Achieved Distinction (Top 5% of 150 students) while developing practical AI applications and business analytics solutions.",
      achievements: [
        "MSc Data Science with Distinction - Top 5% of 150 students",
        "Best Scorer in Business Consulting (80%) and Statistics with R (100%)",
        "Led winning team for 'Lego Business Game of Supply Chain Optimization'",
        "Selected for exclusive industrial project with WBM Ltd (1 of 16 students)",
        "Developed comprehensive Power BI performance management system"
      ]
    },
    {
      id: 3,
      title: "Instrumentation & Control Engineer",
      company: "ADNOC GAS, Abu Dhabi",
      period: "April 2015 - August 2023", 
      type: "professional",
      description: "8 years driving operational excellence at UAE's premier gas processing facility. Led teams of 15+ engineers while managing $300K+ budgets.",
      achievements: [
        "Awarded 'Exceeded Expectations' for 100% safety compliance during pandemic",
        "Reduced operational downtime by 75% in critical air preheater systems",
        "Minimized energy consumption by 8-12% in combustion air blowers",
        "Achieved 1,319 tons CO₂ emission reduction through optimization initiatives", 
        "Managed $300K annual OPEX budget with strategic project allocation",
        "Generated $50K recurring annual savings through reliability improvements"
      ]
    },
    {
      id: 4,
      title: "Senior Instrumentation Reliability Engineer", 
      company: "Reliance Industries Limited",
      period: "November 2006 - April 2015",
      type: "professional", 
      description: "9 transformative years mastering industrial systems at India's largest petrochemical complex. Achieved 'Significantly Exceeded Expectations' for 3 consecutive years.",
      achievements: [
        "Revamped critical Emergency Shutdown Systems to IEC 61511 compliance",
        "Led successful commissioning of SBR/PBR plant at RIL Hazira",
        "Reduced polyethylene storage area downtime by 20%",
        "Spearheaded digital transformation of pneumatic measurement systems",
        "'Significantly Exceeded Expectations' performance rating for 3 successive years"
      ]
    },
    {
      id: 5,
      title: "BTech Instrumentation Engineering",
      company: "Uttar Pradesh Technical University", 
      period: "2002 - 2006",
      type: "education",
      description: "Foundation in engineering excellence with Institute Gold Medal achievement.",
      achievements: [
        "Institute Gold Medalist (Top of class 2006)",
        "74% academic performance with distinction",
        "Strong foundation in control systems and instrumentation",
        "Early passion for process optimization and automation"
      ]
    }
  ],

  // Technical Skills
  skills: [
    {
      id: 1,
      category: "Industrial Engineering",
      icon: "⚙️",
      description: "Deep expertise in oil & gas operations and control systems",
      skills: [
        { name: "Instrumentation & Control", level: 95 },
        { name: "Process Safety Systems", level: 92 },
        { name: "HAZOP Analysis", level: 88 },
        { name: "Asset Reliability Engineering", level: 90 },
        { name: "Risk Management", level: 87 },
        { name: "Emergency Shutdown Systems", level: 93 }
      ]
    },
    {
      id: 2,
      category: "Data Science & AI",
      icon: "🤖", 
      description: "Cutting-edge AI/ML applications and data analytics",
      skills: [
        { name: "Python Programming", level: 90 },
        { name: "Machine Learning", level: 85 },
        { name: "Generative AI & LLMs", level: 88 },
        { name: "Natural Language Processing", level: 82 },
        { name: "Statistical Analysis", level: 87 },
        { name: "Deep Learning", level: 80 }
      ]
    },
    {
      id: 3,
      category: "Analytics & Visualization", 
      icon: "📊",
      description: "Business intelligence and data visualization expertise",
      skills: [
        { name: "Power BI & DAX", level: 95 },
        { name: "Streamlit Development", level: 92 },
        { name: "Data Visualization", level: 88 },
        { name: "SQL & Databases", level: 85 },
        { name: "Business Intelligence", level: 90 },
        { name: "ETL Processes", level: 83 }
      ]
    },
    {
      id: 4,
      category: "Leadership & Management",
      icon: "👨‍💼", 
      description: "Proven leadership in technical teams and project management",
      skills: [
        { name: "Team Leadership", level: 95 },
        { name: "Project Management", level: 90 },
        { name: "Budget Management", level: 92 },
        { name: "Strategic Planning", level: 88 },
        { name: "Change Management", level: 85 },
        { name: "Stakeholder Management", level: 87 }
      ]
    }
  ],

  // Featured Projects
  projects: [
    {
      id: 1,
      title: "ScienceGPT",
      category: "GenAI", 
      icon: "🧬",
      description: "Advanced AI-powered scientific research assistant leveraging large language models for academic and research applications. Features intelligent paper analysis, hypothesis generation, and research methodology recommendations.",
      technologies: ["Python", "Streamlit", "OpenAI API", "LangChain", "Scientific Computing"],
      features: [
        "AI-powered research paper analysis and summarization",
        "Intelligent hypothesis generation from research data", 
        "Scientific methodology recommendations",
        "Interactive research planning and organization tools",
        "Academic writing assistance with citation management"
      ],
      links: {
        github: "https://github.com/aseemm84/ScienceGPT",
        demo: "https://science-gpt.streamlit.app"
      },
      status: "Production"
    },
    {
      id: 2,
      title: "Resume-Checker", 
      category: "AI Tools",
      icon: "📄", 
      description: "GenAI-powered resume evaluation platform providing comprehensive analysis, strengths assessment, and personalized improvement recommendations using advanced NLP and machine learning algorithms.",
      technologies: ["Python", "Streamlit", "NLP", "OpenAI", "Machine Learning"],
      features: [
        "AI-powered resume scoring and analysis",
        "Industry-specific optimization recommendations",
        "ATS compatibility assessment and improvements", 
        "Skill gap analysis with learning path suggestions",
        "Real-time feedback with actionable insights"
      ],
      links: {
        github: "https://github.com/aseemm84/Resume-Checker",
        demo: "https://genai-resume-checker.streamlit.app"
      },
      status: "Production"
    },
    {
      id: 3,
      title: "Business Intelligence App",
      category: "Analytics",
      icon: "📊",
      description: "Comprehensive BI dashboard with advanced analytics, KPI monitoring, and interactive data visualizations designed for strategic business decision-making and performance tracking.",
      technologies: ["Python", "Streamlit", "Plotly", "Pandas", "SQL"],
      features: [
        "Interactive executive dashboards with real-time KPIs",
        "Advanced data visualization with drill-down capabilities",
        "Predictive analytics for business forecasting",
        "Automated reporting and alert systems", 
        "Multi-source data integration and ETL pipelines"
      ],
      links: {
        github: "https://github.com/aseemm84/Business-Intelligence-App",
        demo: "https://data-bi-tool.streamlit.app"
      },
      status: "Production"
    },
    {
      id: 4,
      title: "LoShuGrid", 
      category: "Data Visualization",
      icon: "🔢",
      description: "Innovative implementation of the ancient Chinese Lo Shu Grid mathematical system with modern data visualization, pattern analysis, and interactive exploration capabilities.",
      technologies: ["Python", "Streamlit", "NumPy", "Mathematical Modeling"],
      features: [
        "Interactive Lo Shu Grid generator and analyzer",
        "Pattern recognition and mathematical relationship mapping",
        "Historical and cultural context integration",
        "Educational tools for mathematical learning",
        "Customizable visualization and export options"
      ],
      links: {
        github: "https://github.com/aseemm84/LoShuGrid", 
        demo: "https://loshugrid.streamlit.app"
      },
      status: "Production"
    },
    {
      id: 5,
      title: "Machine Learning Portfolio",
      category: "Research",
      icon: "🤖",
      description: "Comprehensive collection of machine learning algorithms, implementations, and research projects showcasing various ML techniques from supervised learning to deep neural networks.",
      technologies: ["Python", "Scikit-learn", "TensorFlow", "PyTorch", "Jupyter"],
      features: [
        "Implementation of core ML algorithms from scratch",
        "Comparative analysis of different modeling approaches",
        "Real-world dataset applications and case studies",
        "Model optimization and hyperparameter tuning examples", 
        "Comprehensive documentation and learning resources"
      ],
      links: {
        github: "https://github.com/aseemm84/MachineLearning"
      },
      status: "Active Development"
    },
    {
      id: 6,
      title: "NLP Research Projects",
      category: "Research", 
      icon: "🗣️",
      description: "Natural Language Processing projects including sentiment analysis, text classification, and advanced language model implementations for various business applications.",
      technologies: ["Python", "NLTK", "spaCy", "Transformers", "Hugging Face"],
      features: [
        "Sentiment analysis for customer feedback processing",
        "Text classification for document management systems",
        "Named entity recognition for information extraction",
        "Language model fine-tuning for domain-specific applications",
        "Multilingual NLP solutions and cross-language analysis"
      ],
      links: {
        github: "https://github.com/aseemm84/NLP"
      },
      status: "Active Development"
    }
  ],

  // Professional Certifications
  certifications: [
    {
      id: 1,
      title: "Generative AI for Business with Microsoft Azure OpenAI",
      issuer: "Great Learning & Microsoft Azure",
      date: "May 2024 – Oct 2024", 
      category: "AI/ML",
      icon: "🤖",
      description: "Advanced certification in Generative AI applications for business transformation and automation using Microsoft Azure OpenAI services.",
      verificationLink: "https://www.mygreatlearning.com/certificate/SGNACEDJ",
      skills: ["GenAI", "Azure OpenAI", "Business Applications", "AI Strategy"]
    },
    {
      id: 2,
      title: "Microsoft Certified: Power BI Data Analyst Associate",
      issuer: "Microsoft",
      date: "July 2024",
      category: "Analytics", 
      icon: "📊",
      description: "Official Microsoft certification for Power BI data analysis, visualization, and advanced DAX programming for business intelligence solutions.",
      verificationLink: "https://learn.microsoft.com/en-us/users/aseemmehrotra-4429/credentials/e170783fa75ca2f1",
      skills: ["Power BI", "DAX", "Data Modeling", "Business Intelligence"]
    },
    {
      id: 3,
      title: "Advanced Data Science Specialization", 
      issuer: "Great Learning",
      date: "2024",
      category: "Data Science",
      icon: "🔬",
      description: "Comprehensive data science certification covering advanced analytics, machine learning, and statistical modeling techniques for business applications.",
      verificationLink: "https://olympus1.mygreatlearning.com/certificate/MSDGMXNJ",
      skills: ["Data Science", "Machine Learning", "Statistical Modeling", "Analytics"]
    },
    {
      id: 4,
      title: "CTL.CFX Supply Chain Certification",
      issuer: "MIT Center for Transportation & Logistics",
      date: "May 2023", 
      category: "Supply Chain",
      icon: "🚛",
      description: "MIT certification in supply chain optimization, logistics management, and operational excellence methodologies for industrial applications.",
      verificationLink: "https://credentials.edx.org/credentials/7ab177ff4fe14e858168c2fd8c2de69d/",
      skills: ["Supply Chain Management", "Logistics Optimization", "Operations Research"]
    },
    {
      id: 5,
      title: "Credential of Readiness (CORe)",
      issuer: "Harvard Business School Online", 
      date: "Jan 2022 – Apr 2022",
      category: "Business",
      icon: "🎓",
      grade: "High Honors",
      description: "Harvard Business School foundation program in business analytics, economics, and financial accounting with strategic thinking focus.",
      skills: ["Business Analytics", "Financial Accounting", "Economics", "Strategic Thinking"]
    },
    {
      id: 6,
      title: "NEBOSH International General Certificate",
      issuer: "NEBOSH",
      date: "Feb 2018",
      category: "Safety", 
      icon: "🛡️",
      description: "International certification in occupational health and safety management systems, risk assessment, and compliance for industrial operations.",
      skills: ["Occupational Safety", "Risk Assessment", "Safety Management Systems", "Compliance"]
    }
  ],

  // Key Statistics
  stats: [
    { label: "Years Experience", value: 17, suffix: "+" },
    { label: "Live Applications", value: 4, suffix: "+" },
    { label: "Budget Managed", value: 300, suffix: "K" },
    { label: "Efficiency Improvement", value: 75, suffix: "%" }
  ]
};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = resumeData;
} else {
  window.resumeData = resumeData;
}