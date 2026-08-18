import ParallaxImg from "./motion/ParallaxImg";
import Counter from "./motion/Counter";
import RingFill from "./motion/RingFill";

const STATS = [
  { pct: 82, icon: "fa-swatchbook", count: 65, suffix: "+", label: "Product Designs" },
  { pct: 92, icon: "fa-user-group", count: 500, suffix: "+", label: "Happy Clients" },
  { pct: 60, icon: "fa-map-location-dot", count: 20, suffix: "+", label: "Cities Served" },
];

export default function StatsBand({ bgImage, bgAlt, tag }) {
  return (
    <section className="stats-band">
      <ParallaxImg src={bgImage} alt={bgAlt} />
      <div className="container">
        <span className="tag" style={{ color: "var(--champagne)" }}>{tag}</span>
        <div className="stats-row" style={{ marginTop: "20px" }}>
          {STATS.map((s) => (
            <div className="stat-ring-item" key={s.label}>
              <div className="stat-ring">
                <svg viewBox="0 0 110 110">
                  <circle className="ring-track" cx="55" cy="55" r="52" />
                  <RingFill pct={s.pct} />
                </svg>
                <div className="stat-ring-center">
                  <i className={`fa-solid ${s.icon}`}></i>
                  <Counter to={s.count} suffix={s.suffix} />
                </div>
              </div>
              <div className="lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
