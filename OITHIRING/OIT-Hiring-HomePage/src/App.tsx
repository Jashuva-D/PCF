
import HeroBanner from "./components/HeroBanner/HeroBanner";
import KpiTiles from "./components/KpiTiles/KpiTiles";
import HiringActions from "./components/HiringActions/HiringActions";
import NeedsAttention from "./components/NeedsAttention/NeedsAttention";

function App() {
  return (
    <main className="app-container">
      <HeroBanner />
      <KpiTiles />

      <div className="homepage-main-content">
        <HiringActions />
        <NeedsAttention />
      </div>
    </main>
  );
}

export default App;
