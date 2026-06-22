import {
  FiBarChart2,
  FiArrowUpRight,
  FiBookOpen,
  FiCode,
  FiCompass,
  FiCpu,
  FiDatabase,
  FiGrid,
  FiMapPin,
  FiSettings,
  FiUsers
} from 'react-icons/fi';
import { GiWeightLiftingUp } from 'react-icons/gi';
import DecryptedText from './reactbits/DecryptedText/DecryptedText';

const railIcons = [FiGrid, FiCode, FiDatabase, FiBarChart2, FiBookOpen, FiSettings];

const dashboardCards = [
  {
    title: 'Cash Compass',
    text: 'Finance tracker with imports, analytics, auth, exports, and tests.',
    Icon: FiCompass,
    tone: 'cyan'
  },
  {
    title: 'MatchIQ',
    text: 'AI matching assistant for discovery, scoring, and calibration.',
    Icon: FiUsers,
    tone: 'violet'
  },
  {
    title: 'Fitness Central',
    text: 'PHP/MySQL app for workouts, goals, tracking, and 3NF design.',
    Icon: GiWeightLiftingUp,
    tone: 'magenta'
  },
  {
    title: 'Database Systems',
    text: 'ER modeling, normalization, SQL, Prisma, and tuning.',
    Icon: FiDatabase,
    tone: 'blue'
  },
  {
    title: 'AI Coursework',
    text: 'Supervised learning, NLP, computer vision, and evaluation.',
    Icon: FiCpu,
    tone: 'violet'
  },
  {
    title: 'Web Apps',
    text: 'Full-stack applications built with modern web technologies.',
    Icon: FiGrid,
    tone: 'cyan'
  },
  {
    title: 'Reporting',
    text: 'Dashboards and visualizations for data-driven decisions.',
    Icon: FiBarChart2,
    tone: 'cyan'
  },
  {
    title: 'Documentation',
    text: 'System analysis, project docs, and API references.',
    Icon: FiBookOpen,
    tone: 'violet wide'
  }
];

export default function HeroCommandCenter() {
  return (
    <aside className="command-center" aria-label="Portfolio command center preview">
      <div className="command-topbar">
        <div className="terminal-path">
          <DecryptedText
            text="rr@dev-hub:~"
            animateOn="view"
            sequential
            speed={22}
            className="decrypt-live"
            encryptedClassName="decrypt-scramble"
          />
          <span>/overview</span>
        </div>
        <div className="system-status">
          <span>System Status</span>
          <i />
          <span>Online</span>
        </div>
        <div className="window-grip" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="command-body">
        <nav className="command-rail" aria-label="Command center views">
          {railIcons.map((Icon, index) => (
            <button className={index === 0 ? 'active' : ''} type="button" key={index} aria-label={`View ${index + 1}`}>
              <Icon />
            </button>
          ))}
        </nav>

        <div className="command-content">
          <div className="command-intro">
            <div className="profile-card">
              <div className="avatar-orbit">RR</div>
              <div>
                <h2>Recent Graduate</h2>
                <p>Applied Computer Science</p>
                <span>
                  <FiMapPin /> Trinidad &amp; Tobago
                </span>
              </div>
            </div>

            <div className="code-card" aria-label="Focus code snippet">
              <ol>
                <li>
                  <span className="code-comment">// Always learning. Always building.</span>
                </li>
                <li>
                  <span className="code-keyword">const</span> focus = [<span className="code-string">'code'</span>,{' '}
                  <span className="code-string">'data'</span>, <span className="code-string">'ai'</span>];
                </li>
                <li>
                  <span className="code-keyword">const</span> goal = <span className="code-string">'impactful systems'</span>;
                </li>
                <li>
                  <span className="code-keyword">while</span> (learning) {'{'}
                </li>
                <li>&nbsp;&nbsp;build();</li>
                <li>{'}'}</li>
              </ol>
              <div className="prompt-line">rr@dev-hub:~$</div>
            </div>
          </div>

          <div className="dashboard-grid">
            {dashboardCards.map(({ title, text, Icon, tone }) => (
              <article className={`dashboard-card ${tone}`} key={title}>
                <Icon />
                <div>
                  <div className="dashboard-card-title">{title}</div>
                  <p>{text}</p>
                </div>
                <FiArrowUpRight className="card-arrow" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="command-footer">
        <p>
          <strong>Stack:</strong> JavaScript <span>|</span> TypeScript <span>|</span> Python <span>|</span> SQL{' '}
          <span>|</span> React <span>|</span> Tailwind CSS
        </p>
        <p>
          <strong>Mode:</strong> <em>Developer</em>
        </p>
      </div>
    </aside>
  );
}
