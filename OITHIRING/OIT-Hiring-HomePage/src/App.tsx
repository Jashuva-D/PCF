
import HeroBanner from "./components/HeroBanner/HeroBanner";
import KpiTiles from "./components/KpiTiles/KpiTiles";
import HiringActions from "./components/HiringActions/HiringActions";
import NeedsAttention from "./components/NeedsAttention/NeedsAttention";
import NavigationCards from "./components/NavigationCards/NavigationCards";

function App() {
  return (
    <main className="app-container">
      <HeroBanner />
      <KpiTiles />

      <div className="homepage-main-content">
        <HiringActions />
        <NeedsAttention />
      </div>

      <NavigationCards />
    </main>
  );
}

export default App;
