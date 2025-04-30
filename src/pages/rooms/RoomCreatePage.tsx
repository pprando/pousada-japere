import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Navigation from '../../components/Navigation';

export default function RoomCreatePage() {
  const navigate = useNavigate();
  const [number, setNumber] = useState('');
  const [roomType, setRoomType] = useState('');
  const [dailyRate, setDailyRate] = useState('');
  const [features, setFeatures] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase
        .from('rooms')
        .insert([{
          number,
          room_type: roomType,
          daily_rate: parseFloat(dailyRate),
          features: features.split(',').map(f => f.trim()).filter(f => f),
          notes,
        }]);

      if (error) throw error;
      navigate('/rooms/list');
    } catch (error) {
      setError('Erro ao criar quarto');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-6">
            <Navigation title="Criar Quarto" />
            <button
              onClick={() => navigate('/rooms/list')}
              className="text-blue-600 hover:text-blue-800"
            >
              Voltar para Quartos
            </button>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                  Número do Quarto
                </label>
                <input
                  type="text"
                  id="number"
                  required
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">
                  Tipo de Quarto
                </label>
                <input
                  type="text"
                  id="roomType"
                  required
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  placeholder="Ex: Chalé, Quarto com Ar Condicionado, Suite Master..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="dailyRate" className="block text-sm font-medium text-gray-700">
                  Diária
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">R$</span>
                  </div>
                  <input
                    type="number"
                    id="dailyRate"
                    required
                    min="0"
                    step="0.01"
                    value={dailyRate}
                    onChange={(e) => setDailyRate(e.target.value)}
                    className="mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="features" className="block text-sm font-medium text-gray-700">
                  Comodidades (separadas por vírgula)
                </label>
                <input
                  type="text"
                  id="features"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="Wi-Fi, TV, Ar Condicionado"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Observações
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {loading ? 'Criando...' : 'Criar Quarto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
