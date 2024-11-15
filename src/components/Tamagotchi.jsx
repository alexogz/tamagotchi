import { useState, useEffect } from 'react';

export function Tamagotchi() {
  const [hambre, setHambre] = useState(50);
  const [felicidad, setFelicidad] = useState(50);
  const [salud, setSalud] = useState(100);
  const [energia, setEnergia] = useState(50);
  const [sed, setSed] = useState(50);
  const [monedas, setMonedas] = useState(100);
  const [vivo, setVivo] = useState(true);

  const alimentar = () => {
    if (monedas >= 10) {
      setHambre((prev) => Math.min(prev + 20, 100));
      setSalud((prev) => Math.min(prev + 5, 100));
      setMonedas((prev) => prev - 10);
    } else {
      alert("¡No tienes suficientes monedas!");
    }
  };

  const jugar = () => {
    setFelicidad((prev) => Math.min(prev + 20, 100));
    setHambre((prev) => Math.max(prev - 5, 0));
    setEnergia((prev) => Math.max(prev - 10, 0));
    setSalud((prev) => Math.max(prev - 5, 0));
  };

  const dormir = () => {
    setEnergia((prev) => Math.min(prev + 30, 100));
    setFelicidad((prev) => Math.max(prev - 5, 0));
    setSed((prev) => Math.max(prev - 5, 0));
  };

  const beber = () => {
    if (monedas >= 5) { 
      setSed((prev) => Math.min(prev + 20, 100));
      setSalud((prev) => Math.min(prev + 5, 100));
      setMonedas((prev) => prev - 5); 
    } else {
      alert("¡No tienes suficientes monedas para beber!");
    }
  };

  const visitarMedico = () => {
    if (monedas >= 50) {
      setSalud((prev) => Math.min(prev + 30, 100));
      setMonedas((prev) => prev - 50);
    } else {
      alert("¡No tienes suficientes monedas para visitar al mecánico!");
    }
  };

  const trabajar = () => {
    setMonedas((prev) => prev + 20);
    setEnergia((prev) => Math.max(prev - 10, 0));
    setFelicidad((prev) => Math.max(prev - 5, 0));
  };

  const revivir = () => {
    setHambre(50);
    setFelicidad(50);
    setSalud(100);
    setEnergia(50);
    setSed(50);
    setVivo(true);
  };

  useEffect(() => {
    if (hambre === 0 || felicidad === 0 || salud === 0 || energia === 0 || sed === 0) {
      setVivo(false);
    }
  }, [hambre, felicidad, salud, energia, sed]);

  useEffect(() => {
    if (vivo) {
      const timer = setInterval(() => {
        setHambre((prev) => Math.max(prev - 1, 0));
        setFelicidad((prev) => Math.max(prev - 1, 0));
        setSalud((prev) => Math.max(prev - 1, 0));
        setEnergia((prev) => Math.max(prev - 1, 0));
        setSed((prev) => Math.max(prev - 1, 0));
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [vivo]);

  const getProgressColor = (value) => {
    if (value > 60) return "bg-green-500";
    if (value > 20) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getMensajeEstado = () => {
    if (!vivo) 
      return (
        <div className="flex flex-col items-center">
          <img src="../../public/media/siniestro.png" alt="Siniestro total" className="h-50 w-50 mb-2" />
          <span>Siniestro total ☠️</span>
        </div>
      );

    if (hambre < 20) 
      return (
        <div className="flex flex-col items-center">
          <img src="../../public/media/hambre.png" alt="Necesito chatarra" className="h-40 w-46 mb-2" />
          <span>¡Necesito chatarra! 😟</span>
        </div>
      );

    if (sed < 20) 
      return (
        <div className="flex flex-col items-center">
          <img src="../../public/media/gasolina.png" alt="Quiero gasolina" className="h-40 w-46 mb-2" />
          <span>¡Quiero gasolina! 🥤</span>
        </div>
      );

    if (felicidad < 20) 
      return (
        <div className="flex flex-col items-center">
          <img src="../../public/media/trsite.png" alt="Estoy triste" className="h-36 w-50 mb-2" />
          <span>Estoy triste 😢</span>
        </div>
      );

    if (salud < 20) 
      return (
        <div className="flex flex-col items-center">
          <img src="../../public/media/salud.png" alt="No me siento bien" className="h-16 w-16 mb-2" />
          <span>No me siento bien 😷</span>
        </div>
      );

    if (energia < 20) 
      return (
        <div className="flex flex-col items-center">
          <img src="../../public/media/cansado.png" alt="Estoy cansado" className="h-40 w-46 mb-2" />
          <span>Estoy cansado 😴</span>
        </div>
      );

    return (
      <div className="flex flex-col items-center">
        <img src="../../public/media/fotoprincipal.png" alt="Estoy feliz" className="h-40 w-46 mb-2" />
        <span>¡Estoy feliz! 😊</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen  bg-center p-4">
      <div className="p-8 border-4 border-gray-500  bg-gray-100 rounded-lg shadow-md w-96 mx-auto">
        <img src="/media/LogoMegane.png" alt="Logo" className="mx-auto mb-4" />
        <div className="text-center text-lg font-semibold mb-4">{getMensajeEstado()}</div>

        {vivo ? (
          <>
            <div className="mb-4">
              <label className="block font-medium mb-1">Hambre:</label>
              <div className="bg-gray-300 h-4 rounded overflow-hidden">
                <div className={`${getProgressColor(hambre)} h-full`} style={{ width: `${hambre}%` }} />
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Gasolina :</label>
              <div className="bg-gray-300 h-4 rounded overflow-hidden">
                <div className={`${getProgressColor(sed)} h-full`} style={{ width: `${sed}%` }} />
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Felicidad:</label>
              <div className="bg-gray-300 h-4 rounded overflow-hidden">
                <div className={`${getProgressColor(felicidad)} h-full`} style={{ width: `${felicidad}%` }} />
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Salud:</label>
              <div className="bg-gray-300 h-4 rounded overflow-hidden">
                <div className={`${getProgressColor(salud)} h-full`} style={{ width: `${salud}%` }} />
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Energía:</label>
              <div className="bg-gray-300 h-4 rounded overflow-hidden">
                <div className={`${getProgressColor(energia)} h-full`} style={{ width: `${energia}%` }} />
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Banco: {monedas}</label>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <button onClick={alimentar} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Alimentar</button>
              <button onClick={beber} className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition">Beber</button>
              <button onClick={jugar} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">Tramo</button>
              <button onClick={dormir} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition">Aparcar</button>
              <button onClick={visitarMedico} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">Mecánico</button>
              <button onClick={trabajar} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">Trabajar</button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <button onClick={revivir} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
              Carglass
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tamagotchi;
