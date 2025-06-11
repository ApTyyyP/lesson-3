import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import PageFade from './components/PageFade'; // для плавної анімації
import Task1 from './components/Task1';
import Task2 from './components/Task2';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();

  // Показувати таблицю лише якщо на головній сторінці
  const isHome = location.pathname === '/';

  return (
    <div className="container px-3 py-5">
      <div
        className={`mb-3 fade-${isHome ? 'exit' : 'enter'} ${
          !isHome ? 'fade-enter-active' : 'fade-exit-active'
        }`}
      >
        {!isHome && (
          <Link className="btn btn-primary" to="/">
            ← Назад до задач
          </Link>
        )}
      </div>

      <div
        className={`d-flex justify-content-center fade-${
          isHome ? 'enter' : 'exit'
        } ${isHome ? 'fade-enter-active' : 'fade-exit-active'}`}
      >
        {isHome && <h3>Домашнє завдання №3</h3>}
      </div>

      <div
        className={`fade-${isHome ? 'enter' : 'exit'} ${
          isHome ? 'fade-enter-active' : 'fade-exit-active'
        }`}
      >
        {isHome && (
          <table className="table table-responsive table-striped table-hover mx-auto mt-5">
            <thead>
              <tr className="table-dark">
                <th scope="col" className="number-column">№</th>
                <th scope="col">Опис</th>
                <th scope="col" className="action-column">Дія</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="number-column">1</th>
                <td>Пари для танців</td>
                <td className="action-column">
                  <Link className="btn btn-secondary" to="/task1">
                    Рішення
                  </Link>
                </td>
              </tr>
              <tr>
                <th scope="row" className="number-column">2</th>
                <td>Перекладач на англійській і українській мові</td>
                <td className="action-column">
                  <Link className="btn btn-secondary" to="/task2">
                    Рішення
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      {/* Роути */}
      <Routes location={location}>
        <Route
          path="/task1"
          element={
            <PageFade>
              <Task1 />
            </PageFade>
          }
        />
        <Route
          path="/task2"
          element={
            <PageFade>
              <Task2 />
            </PageFade>
          }
        />

        {/* Головна */}
        <Route path="/" element={null} />

        {/* Редірект з головної сторінки */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
