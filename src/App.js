import './App.css';

const osoby = [
  { imie: 'Jan', wiek: 12 },
  { imie: 'Filip', wiek: 2123 },
  { imie: 'Zofia', wiek: 32 },
  { imie: 'Katarzyna' },
];


const Imie = ({ imie, wiek }) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-blue-600">{imie}</h1>
      <p className="text-gray-500 text-sm">{wiek ? `Wiek: ${wiek}` : ''}</p>
    </>
  );

}

function App() {
  return (
    <>
      {
        osoby.map((osoba, index) => (
          <Imie key={index} imie={osoba.imie} wiek={osoba.wiek} />
        ))
      }

    </>
  );
}
export default App;
