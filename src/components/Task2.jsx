// src/Task2.jsx
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const wordsData = [
  { id: 1, en: 'animals',  ua: 'тварини' },
  { id: 2, en: 'rain',     ua: 'дощ' },
  { id: 3, en: 'weather',  ua: 'погода' },
  { id: 4, en: 'exercise', ua: 'завдання' },
  { id: 5, en: 'spider',   ua: 'павук' },
  { id: 6, en: 'language', ua: 'мова' },
  { id: 7, en: 'apple',    ua: 'яблуко' },
  { id: 8, en: 'computer', ua: "комп'ютер" },
  { id: 9, en: 'food',     ua: 'їжа' },
];

// простий shuffle через sort
const shuffle = arr => arr.slice().sort(() => Math.random() - 0.5);

function Task2() {
  // словник
  const [wordsList, setWords] = useState([...wordsData]);
  // разове випадкове сортування колонок
  const [enList, setEnList] = useState(() => shuffle(wordsData));
  const [uaList, setUaList] = useState(() => shuffle(wordsData));

  // вибрані id
  const [answerEn, setAnswerEn] = useState(0);
  const [answerUa, setAnswerUa] = useState(0);
  // ознака помилки
  const [hasError, setHasError] = useState(false);

  // перевірка пари
  useEffect(() => {
    if (answerEn !== 0 && answerUa !== 0) {
      if (answerEn === answerUa) {
        // правильна: через 1с видалити зі списків
        setTimeout(() => {
          setWords(prev => prev.filter(w => w.id !== answerEn));
          setEnList(prev => prev.filter(w => w.id !== answerEn));
          setUaList(prev => prev.filter(w => w.id !== answerEn));
          resetAnswers();
        }, 1000);
      } else {
        // неправильно: червона рамка, через 1с скинути
        setHasError(true);
        setTimeout(resetAnswers, 1000);
      }
    }
  }, [answerEn, answerUa]);

  const resetAnswers = () => {
    setAnswerEn(0);
    setAnswerUa(0);
    setHasError(false);
  };

  const selectWord = (id, lang) => {
    if (lang === 'en') setAnswerEn(id);
    else setAnswerUa(id);
  };

  const getClass = (id, lang) => {
    const chosen = (lang === 'en' ? answerEn : answerUa) === id;

    if (!chosen) return 'word-not-selected';
    return hasError ? 'word-selected-with-error' : 'word-selected';
  };

  // якщо пусто
  if (wordsList.length === 0) {
    return <div className="empty-box">Список слів пустий.</div>;
  }

  return (
    <div className="task-2">
      <div className="d-flex justify-content-center text-black mb-3">
        <h3 className="text-center mb-3">Задача 2</h3>
      </div>

      <p>
        Перекладач. Користувачу виводять змішані картки з словами на англійській і українській мові. Користувач поступово клікає на картки <i>(виділяємо <span class="text-primary">синьою</span> рамкою)</i>. Якщо знайдено правильні пари карток, що відповідають одному слову, то видаляємо ці картки. Інакше — виділяємо <span class="text-danger">червоною</span> рамкою і через секунду забираємо рамку.
      </p>

      <hr />

      <div className="row">
        {/* Англійські слова */}
        <div className="col-6">
          <div className="card border-secondary h-100">
            <div className="card-body">
              {enList.map(w => (
                <div
                  key={w.id}
                  className={`word ${getClass(w.id, 'en')}`}
                  onClick={() => selectWord(w.id, 'en')}
                >
                  {w.en}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Українські слова */}
        <div className="col-6">
          <div className="card border-secondary h-100">
            <div className="card-body">
              {uaList.map(w => (
                <div
                  key={w.id}
                  className={`word ${getClass(w.id, 'ua')}`}
                  onClick={() => selectWord(w.id, 'ua')}
                >
                  {w.ua}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task2;
