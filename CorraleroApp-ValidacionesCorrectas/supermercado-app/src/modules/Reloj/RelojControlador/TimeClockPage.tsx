import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, ScanBarcode as BarcodeScan, LogIn, LogOut, Building2 } from 'lucide-react';

type EmployeeState = {
  name: string;
  rut: string;
  checkInTime?: string;
  checkOutTime?: string;
  afternoonCheckIn?: string;
  afternoonCheckOut?: string;
  extraHours?: string;
};

function TimeClockPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [barcodeInput, setBarcodeInput] = useState('');
  const [employeeData, setEmployeeData] = useState<EmployeeState | null>(null);

  // Actualiza la hora cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // SUBMIT del código de barras
  const handleBarcodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeInput) return;

    try {
      // Llamada al endpoint: POST /api/marcajes
      const response = await axios.post('/api/marcajes', {
        codigoBarras: barcodeInput
      });

      /*
        Estructura esperada de la respuesta:
        {
          message: "...",
          empleado: { id, nombre_completo, rut, ... },
          marcaje: {
            id, fecha, entrada_manana, salida_manana, entrada_tarde, salida_tarde, ...
          }
        }
       */

      const data = response.data;
      if (data.error) {
        // Manejar error devuelto desde el servidor
        console.error(data.error);
      } else {
        // Extraer datos
        const { empleado, marcaje } = data;
        // Ajustar tu estado al front:
        // Mapear las columnas de "marcaje" a checkInTime, checkOutTime, etc. a tu gusto.
        // Por ejemplo:
        const newEmployeeData: EmployeeState = {
          name: empleado.nombre_completo,
          rut: empleado.rut,
          checkInTime: marcaje.entrada_manana || '--:--',
          checkOutTime: marcaje.salida_manana || '--:--',
          afternoonCheckIn: marcaje.entrada_tarde || '--:--',
          afternoonCheckOut: marcaje.salida_tarde || '--:--',
          extraHours: marcaje.total_horas ? `${marcaje.total_horas} Hrs` : undefined,
        };
        setEmployeeData(newEmployeeData);
      }
    } catch (error) {
      console.error('Error al registrar marcaje:', error);
    }

    // Limpia el campo de texto
    setBarcodeInput('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">Corralero</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Time Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Time Display */}
          <div className="bg-blue-600 p-8 text-center">
            <Clock className="h-12 w-12 text-white mx-auto mb-4" />
            <time className="text-5xl font-bold text-white">
              {currentTime.toLocaleTimeString()}
            </time>
            <p className="text-blue-100 mt-2">{currentTime.toLocaleDateString()}</p>
          </div>

          {/* Barcode Input */}
          <form onSubmit={handleBarcodeSubmit} className="p-6 border-b">
            <div className="flex items-center space-x-4">
              <BarcodeScan className="h-6 w-6 text-gray-400" />
              <input
                type="text"
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                placeholder="Escanee su código de barras"
                className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                autoFocus
              />
            </div>
          </form>

          {/* Employee Info Display */}
          <div className="p-6 text-center border-b bg-gray-50">
            <h2 className="text-sm uppercase text-gray-500 mb-1">Trabajador</h2>
            {employeeData ? (
              <>
                <p className="text-2xl font-semibold text-gray-800">
                  {employeeData.name}
                </p>
                <p className="text-gray-600 mt-1">RUT: {employeeData.rut}</p>
              </>
            ) : (
              <p className="text-2xl font-semibold text-gray-800">
                -- Sin registrar --
              </p>
            )}
          </div>

          {/* Check-in/out Grid */}
          <div className="grid grid-cols-2 gap-4 p-6">
            {/* Morning Check-in */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <LogIn className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-gray-700">Entrada Mañana</h3>
              </div>
              <p className="text-lg font-mono">
                {employeeData?.checkInTime ?? '--:--'}
              </p>
            </div>

            {/* Morning Check-out */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <LogOut className="h-5 w-5 text-red-600" />
                <h3 className="font-semibold text-gray-700">Salida Mañana</h3>
              </div>
              <p className="text-lg font-mono">
                {employeeData?.checkOutTime ?? '--:--'}
              </p>
            </div>

            {/* Afternoon Check-in */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <LogIn className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-gray-700">Entrada Tarde</h3>
              </div>
              <p className="text-lg font-mono">
                {employeeData?.afternoonCheckIn ?? '--:--'}
              </p>
            </div>

            {/* Afternoon Check-out */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <LogOut className="h-5 w-5 text-red-600" />
                <h3 className="font-semibold text-gray-700">Salida Tarde</h3>
              </div>
              <p className="text-lg font-mono">
                {employeeData?.afternoonCheckOut ?? '--:--'}
              </p>
              {employeeData?.extraHours && (
                <p className="text-sm text-green-600 mt-2">
                  Horas extra: {employeeData.extraHours}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TimeClockPage;
