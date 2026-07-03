function Badges({ solved }) {

  const badges = [
    { title: "Beginner", limit: 10, icon: "🥉" },
    { title: "Intermediate", limit: 50, icon: "🥈" },
    { title: "Advanced", limit: 100, icon: "🥇" },
    { title: "Master Coder", limit: 200, icon: "👑" },
  ];

  return (
    <div className="card shadow p-4 mt-4">

      <h3 className="mb-4">
        🏅 Achievements
      </h3>

      {badges.map((badge) => (

        <div
          key={badge.title}
          className="d-flex justify-content-between align-items-center border rounded p-3 mb-3"
        >

          <h5>
            {badge.icon} {badge.title}
          </h5>

          {solved >= badge.limit ? (
            <span className="badge bg-success">
              Unlocked
            </span>
          ) : (
            <span className="badge bg-secondary">
              Locked
            </span>
          )}

        </div>

      ))}

    </div>
  );
}

export default Badges;