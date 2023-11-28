import MainPage from "./pages/MainPage/MainPage";
import PlayBar from "./components/PlayBar/PlayBar";
import s from "./global.module.scss";

function App() {
  return (
    <div className={s.wrapper}>
      <MainPage />
      {/* <PlayBar /> */}
    </div>
  );
}

export default App;
