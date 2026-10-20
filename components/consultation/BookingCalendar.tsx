'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, CalendarDays } from 'lucide-react';
import { toFaDigits, cn } from '@/lib/utils';

// اسلات‌های زمانی هر روز
const TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

const detailsSchema = z.object({
  name: z.string().min(2, 'نام باید حداقل ۲ حرف باشد'),
  phone: z.string().regex(/^(\+98|0)?9\d{9}$/, 'شماره موبایل معتبر وارد کنید'),
  email: z.string().email('ایمیل معتبر وارد کنید').optional().or(z.literal('')),
});
type Details = z.infer<typeof detailsSchema>;

type DayOption = {
  iso: string; // YYYY-MM-DD برای ارسال به سرور
  faLabel: string; // برچسب فارسی روز
  faDate: string; // تاریخ شمسی
  dayName: string; // نام روز هفته
  isWeekend: boolean; // پنجشنبه/جمعه
};

/** تولید ۱۴ روز آینده با نام روز و تاریخ شمسی — با Intl (بدون کتابخانه زیروصله) */
function buildDays(): DayOption[] {
  const days: DayOption[] = [];
  const fmtWeek = new Intl.DateTimeFormat('fa-IR', { weekday: 'long' });
  const fmtDate = new Intl.DateTimeFormat('fa-IR', { day: 'numeric', month: 'long' });
  for (let i = 1; i <= 14; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dow = d.getDay(); // 0=یکشنبه … 5=جمعه
    const isWeekend = dow === 4 || dow === 5; // پنجشنبه و جمعه
    days.push({
      iso: d.toISOString().slice(0, 10),
      faLabel: fmtDate.format(d),
      faDate: fmtDate.format(d),
      dayName: fmtWeek.format(d),
      isWeekend,
    });
  }
  return days;
}

export default function BookingCalendar() {
  const days = useMemo(buildDays, []);
  const [selectedDay, setSelectedDay] = useState<DayOption | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Details>({ resolver: zodResolver(detailsSchema) });

  const onSubmit = async (data: Details) => {
    if (!selectedDay || !selectedSlot) return;
    setServerError('');
    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'booking', ...data, date: selectedDay.iso, timeSlot: selectedSlot }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setServerError('رزرو ناموفق بود؛ دوباره تلاش کنید.');
    }
  };

  if (done) {
    return (
      <div className="text-center py-12">
        <span className="w-16 h-16 mx-auto rounded-full bg-teal-50 text-teal flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </span>
        <h3 className="text-xl font-bold text-navy mb-2">وقت شما رزرو شد!</h3>
        <p className="text-navy-400">
          {selectedDay && `${selectedDay.dayName}، ${selectedDay.faDate}`} — ساعت{' '}
          {selectedSlot && toFaDigits(selectedSlot)}
          <br />
          لینک جلسه برای شما پیامک می‌شود.
        </p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      {/* انتخاب روز */}
      <div>
        <h3 className="font-bold text-navy mb-4 flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-teal" />
          ۱. روز را انتخاب کنید
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="listbox" aria-label="انتخاب روز">
          {days.map((day) => (
            <button
              key={day.iso}
              type="button"
              disabled={day.isWeekend}
              onClick={() => { setSelectedDay(day); setSelectedSlot(null); }}
              aria-pressed={selectedDay?.iso === day.iso}
              className={cn(
                'rounded-xl border p-3 text-center transition-all',
                day.isWeekend
                  ? 'border-navy-100 bg-mist text-navy-200 cursor-not-allowed'
                  : selectedDay?.iso === day.iso
                    ? 'border-teal bg-teal text-white shadow-glow'
                    : 'border-navy-200 bg-white hover:border-teal hover:text-teal'
              )}
            >
              <span className="block text-xs mb-1 opacity-80">{day.dayName}</span>
              <span className="block font-bold text-sm">{day.faDate}</span>
            </button>
          ))}
        </div>

        {/* انتخاب ساعت */}
        <AnimatePresence>
          {selectedDay && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <h3 className="font-bold text-navy mt-8 mb-4">۲. ساعت را انتخاب کنید</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    aria-pressed={selectedSlot === slot}
                    className={cn(
                      'rounded-full border py-2.5 text-sm font-medium transition-all tabular-nums',
                      selectedSlot === slot
                        ? 'border-teal bg-teal text-white'
                        : 'border-navy-200 bg-white hover:border-teal hover:text-teal'
                    )}
                  >
                    {toFaDigits(slot)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* فرم اطلاعات */}
      <AnimatePresence mode="wait">
        {selectedDay && selectedSlot ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="card !bg-mist p-6 self-start"
            noValidate
          >
            <h3 className="font-bold text-navy mb-1">۳. اطلاعات تماس</h3>
            <p className="text-sm text-teal bg-teal-50 rounded-lg px-3 py-2 mb-5">
              {selectedDay.dayName}، {selectedDay.faDate} — ساعت {toFaDigits(selectedSlot)}
            </p>
            <div className="space-y-4">
              <div>
                <label htmlFor="bk-name" className="label">نام و نام خانوادگی *</label>
                <input id="bk-name" {...register('name')} className="input" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="bk-phone" className="label">شماره موبایل *</label>
                <input id="bk-phone" dir="ltr" inputMode="tel" {...register('phone')} className="input text-left" placeholder="09123456789" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <label htmlFor="bk-email" className="label">ایمیل (اختیاری)</label>
                <input id="bk-email" type="email" dir="ltr" {...register('email')} className="input text-left" />
              </div>
              {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                تایید نهایی رزرو
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hidden lg:flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-navy-200 p-10 text-center self-start min-h-[300px]"
          >
            <CalendarDays className="w-10 h-10 text-navy-200 mb-4" />
            <p className="text-navy-300 text-sm leading-7">
              ابتدا روز و سپس ساعت موردنظر را انتخاب کنید؛
              <br />
              فرم رزرو اینجا نمایش داده می‌شود.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
