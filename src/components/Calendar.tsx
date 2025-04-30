import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon } from 'lucide-react';

interface CalendarProps {
  mode?: 'single' | 'range' | 'multiple';
  selected?: Date | Date[] | { from: Date; to: Date };
  onSelect?: (date: Date | Date[] | { from: Date; to: Date } | undefined) => void;
  className?: string;
  disabled?: boolean;
  disabledDates?: Date[];
  footer?: React.ReactNode;
  showOutsideDays?: boolean;
}

export default function Calendar({
  mode = 'single',
  selected,
  onSelect,
  className,
  disabled = false,
  disabledDates = [],
  footer,
  showOutsideDays = true,
}: CalendarProps) {
  return (
    <div className={cn('p-4', className)}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-xl">
          <CalendarIcon className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          {selected instanceof Date
            ? format(selected, "d 'de' MMMM 'de' yyyy", { locale: ptBR })
            : 'Selecione uma data'}
        </h2>
      </div>

      <DayPicker
        mode={mode}
        selected={selected}
        onSelect={onSelect}
        disabled={disabled || disabledDates}
        showOutsideDays={showOutsideDays}
        locale={ptBR}
        className={cn(
          'p-4 bg-white rounded-xl border border-gray-100 shadow-sm',
          'rdp-day_selected:bg-primary rdp-day_selected:text-primary-foreground',
          'rdp-day_today:bg-accent rdp-day_today:text-accent-foreground',
          'rdp-day_disabled:opacity-50 rdp-day_disabled:cursor-not-allowed',
          'rdp-day:hover:bg-primary/10 rdp-day:hover:text-primary',
          'rdp-day:focus:bg-primary/10 rdp-day:focus:text-primary',
          'rdp-button:hover:bg-primary/10 rdp-button:hover:text-primary',
          'rdp-nav_button:hover:bg-primary/10 rdp-nav_button:hover:text-primary'
        )}
      />

      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}