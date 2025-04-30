import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

export default function HeroDashboard() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative h-[450px] w-full max-w-[500px]">
      <div
        className={`absolute left-0 top-0 rounded-xl bg-white p-6 shadow-lg transition-all duration-700 ${
          isVisible ? "opacity-100" : "translate-y-8 opacity-0"
        }`}
        style={{ width: "340px", height: "300px" }}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="text-lg font-medium">Agenda</div>
          <div className="flex space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-400"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
            <div className="h-3 w-3 rounded-full bg-green-400"></div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-7 gap-1">
          {["D", "S", "T", "Q", "Q", "S", "S"].map((day, i) => (
            <div
              key={`day-${i}`}
              className="text-center text-xs font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
          {[...Array(31)].map((_, i) => (
            <div
              key={`date-${i}`}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs ${
                i === 14
                  ? "bg-moss text-white"
                  : i === 21 || i === 22 || i === 28
                  ? "bg-moss/10 text-moss"
                  : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="rounded-lg bg-moss/5 p-2">
            <div className="text-xs font-medium text-moss">
              14:00 - Check-in Confirmado
            </div>
            <div className="text-xs text-gray-500">Quarto 101 - Maria Silva</div>
          </div>
          <div className="rounded-lg bg-sage/20 p-2">
            <div className="text-xs font-medium text-moss">
              16:30 - Check-out Agendado
            </div>
            <div className="text-xs text-gray-500">Quarto 203 - João Santos</div>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-20 right-0 rounded-xl bg-white p-4 shadow-lg transition-all duration-700 delay-300 ${
          isVisible ? "opacity-100" : "translate-x-8 opacity-0"
        }`}
        style={{ width: "190px", height: "210px" }}
      >
        <div className="mb-3 text-sm font-medium">Estatísticas do Mês</div>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">Reservas</div>
              <div className="text-sm font-bold">42</div>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
              <div className="h-2 w-3/4 rounded-full bg-moss"></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">Taxa de Ocupação</div>
              <div className="text-sm font-bold">78%</div>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
              <div className="h-2 w-4/5 rounded-full bg-sage"></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">Novos Hóspedes</div>
              <div className="text-sm font-bold">12</div>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
              <div className="h-2 w-1/3 rounded-full bg-cedar"></div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-0 left-40 rounded-xl bg-white p-4 shadow-lg transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "translate-y-8 opacity-0"
        }`}
        style={{ width: "200px" }}
      >
        <div className="mb-2 flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-moss/10 flex items-center justify-center">
            <Bell className="h-4 w-4 text-moss" />
          </div>
          <div className="text-sm font-medium">Lembrete</div>
        </div>
        <div className="text-xs text-gray-700">
          Você tem 3 novos check-ins para confirmar hoje
        </div>
      </div>

      <div
        className={`absolute left-20 top-40 h-16 w-16 rounded-full bg-moss/20 transition-all duration-700 delay-700 ${
          isVisible ? "opacity-30" : "opacity-0"
        }`}
      ></div>

      <div
        className={`absolute right-20 top-20 h-24 w-24 rounded-lg bg-moss/10 transition-all duration-700 delay-900 ${
          isVisible ? "opacity-20" : "opacity-0"
        }`}
      ></div>
    </div>
  );
}