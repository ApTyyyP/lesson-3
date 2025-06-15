import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const boysData = [
  { boyId: 1, name: 'Іван' },
  { boyId: 2, name: 'Петро' },
  { boyId: 3, name: 'Степан' },
  { boyId: 4, name: 'Олег' },
];

const girlsData = [
  { girlId: 1, name: 'Оксана' },
  { girlId: 2, name: 'Наталія' },
  { girlId: 3, name: 'Тетяна' },
  { girlId: 4, name: 'Аліна' },
  { girlId: 5, name: 'Олеся' },
];

const MESSAGE_STATUS = {
  BOYS: 'Хлопців поки ще нема.',
  GIRLS: 'Дівчат поки ще нема.',
  PAIRS: 'Пари для танців не можуть бути сформовані.',
};

function Task1() {
  const [boysList, setBoysList] = useState([...boysData]);
  const [girlsList, setGirlsList] = useState([...girlsData]);
  const [pairsList, setPairsList] = useState([]);
  const [selectedBoyIndex, setBoySel] = useState(null);
  const [selectedGirlIndex, setGirlSel] = useState(null);
  const [selectedPairIndex, setPairSel] = useState(null);

  const onSelectItem = (index, type) => {
    if (type === 'boy') setBoySel((prev) => (prev === index ? null : index));
    if (type === 'girl') setGirlSel((prev) => (prev === index ? null : index));
    if (type === 'pair') setPairSel((prev) => (prev === index ? null : index));
  };

  // додавання пари
  const onAddPair = () => {
    if (selectedBoyIndex === null || selectedGirlIndex === null) return;

    const boy = boysList[selectedBoyIndex];
    const girl = girlsList[selectedGirlIndex];

    // додаємо пару до списку
    setPairsList((prev) => [...prev, { boyName: boy.name, girlName: girl.name }]);

    // видаляємо вибрані з доступних списків
    setBoysList((prev) => prev.filter((_, i) => i !== selectedBoyIndex));
    setGirlsList((prev) => prev.filter((_, i) => i !== selectedGirlIndex));

    // скидаємо вибір
    setBoySel(null);
    setGirlSel(null);
  };

  // видалення пари
  const onDeletePair = () => {
    if (selectedPairIndex === null) return;

    setPairsList((prev) => prev.filter((_, i) => i !== selectedPairIndex));
    setPairSel(null);
  };

  // блокування кнопок
  const btnAddDisabled = selectedBoyIndex === null || selectedGirlIndex === null;
  const btnDeleteDisabled = selectedPairIndex === null;

  return (
    <div className="task-1">
      <div className="d-flex justify-content-center text-black mb-3">
        <h3>Задача 1</h3>
      </div>

      <p>
        Пари для танців. Поступово вибираємо хлопця, дівчину і додаємо у обрані пари. Пару можна видалити. Поки не
        вибрано хлопця і дівчину кнопка «Додати» заблокована. Якщо не вистачає хлопців або дівчат — вибір також
        блокується.
      </p>

      <hr />

      <div className="row">
        <div className="col-6">
          <div className="card border-secondary h-100">
            <h2 className="card-header text-center">Хлопці</h2>
            <div className="card-body">
              {boysList.length > 0 ? (
                <ol className="boys__list">
                  {boysList.map((boy, index) => (
                    <li
                      key={boy.boyId}
                      className={`boys__item ${selectedBoyIndex === index ? 'chosen' : ''}`}
                      onClick={() => onSelectItem(index, 'boy')}
                    >
                      {boy.name}
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="empty-box">{MESSAGE_STATUS.BOYS}</div>
              )}
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="card border-secondary h-100">
            <h2 className="card-header text-center">Дівчата</h2>
            <div className="card-body">
              {girlsList.length > 0 ? (
                <ol className="girls__list">
                  {girlsList.map((girl, index) => (
                    <li
                      key={girl.girlId}
                      className={`girls__item ${selectedGirlIndex === index ? 'chosen' : ''}`}
                      onClick={() => onSelectItem(index, 'girl')}
                    >
                      {girl.name}
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="empty-box">{MESSAGE_STATUS.GIRLS}</div>
              )}
            </div>
          </div>
        </div>

        <button className="btn btn-primary my-3 mx-auto" disabled={btnAddDisabled} onClick={onAddPair}>
          Додати
        </button>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="col-sm-8 col-12 m-auto">
            <div className="card border-secondary">
              <h2 className="card-header text-center">Обрані пари</h2>
              <div className="card-body">
                {pairsList.length > 0 ? (
                  <ol className="pair__list">
                    {pairsList.map((pair, index) => (
                      <li
                        key={index}
                        className={`pair__item ${selectedPairIndex === index ? 'chosen' : ''}`}
                        onClick={() => onSelectItem(index, 'pair')}
                      >
                        {pair.boyName} — {pair.girlName}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <div className="empty-box">{MESSAGE_STATUS.PAIRS}</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-danger my-3 w-100" disabled={btnDeleteDisabled} onClick={onDeletePair}>
          Видалити пару
        </button>
      </div>
    </div>
  );
}

export default Task1;
