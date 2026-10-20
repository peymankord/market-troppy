import Image from 'next/image';
import { Heart, Lightbulb, ShieldCheck, Target } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SectionHeading from '@/components/shared/SectionHeading';
import { FadeIn, Stagger, StaggerItem } from '@/components/shared/MotionFadeIn';
import FinalCTA from '@/components/home/FinalCTA';

export const metadata = buildMetadata({
  title: 'درباره ما — تیم، ماموریت و ارزش‌ها',
  description:
    'با تیم مارکت تروپی آشنا شوید؛ مشاوران بازاریابی که از استراتژی تا اتوماسیون هوشمند فروش در کنار کسب‌وکارها هستند.',
  path: '/about',
});

const VALUES = [
  { icon: Target, title: 'نتيجه‌محوری', text: 'موفقیت ما با اعداد فروش و رشد مشتریان سنجیده می‌شود، نه با اسلایدهای زیبا.' },
  { icon: ShieldCheck, title: 'شفافیت', text: 'گزارش‌دهی منظم، قیمت‌گذاری روشن و بدون وعده‌های غیرواقعی.' },
  { icon: Lightbulb, title: 'نوآوری', text: 'همیشه لبه‌ی فناوری هستیم — از تحلیل داده تا ایجنت‌های هوش مصنوعی.' },
  { icon: Heart, title: 'همراهی', text: 'مشاور بیرونی نیستیم؛ عضوی از تیم شما می‌شویم تا نتیجه محقق شود.' },
];

const TEAM = [
  { name: 'دکتر آرمان فرهادی', role: 'هم‌بنیان‌گذار و استراتژیست ارشد', initials: 'AF' },
  { name: 'مهندس نیما صدر', role: 'مدیر فناوری و اتوماسیون AI', initials: 'NS' },
  { name: 'دکتر مریم توکلی', role: 'مدیر برند و محتوا', initials: 'MT' },
  { name: 'کیان شریفی', role: 'مشاور رشد فروش', initials: 'KS' },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-36 pb-16 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-50" aria-hidden />
        <div className="container relative">
          <FadeIn className="max-w-3xl">
            <h1 className="h-display text-white">ما رشد را مهندسی می‌کنیم</h1>
            <p className="text-lead text-white/70 mt-6">
              مارکت تروپی با ترکیب تجربه عمیق بازاریابی و قدرت هوش مصنوعی، موتور رشد
              کسب‌وکارها را می‌سازد.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="container pt-8">
        <Breadcrumb items={[{ name: 'درباره ما' }]} />
      </div>

      {/* ماموریت و چشم‌انداز */}
      <section className="pb-10">
        <div className="container grid lg:grid-cols-2 gap-10 items-center">
          <FadeIn>
            <h2 className="h-title text-navy mb-5">ماموریت ما</h2>
            <p className="text-navy-500 leading-9 mb-5">
              ما باور داریم هر کسب‌وکار ایرانی لیاقت یک سیستم فروش مدرن، قابل پیش‌بینی و
              مقیاس‌پذیر را دارد. ماموریت ما این است که رشد را از شانس جدا و به مهندسی وصل کنیم:
              استراتژی‌ای روشن، اجرای منظم، و در نهایت اتوماسیون هوشمندی که رشد را مستمر کند.
            </p>
            <p className="text-navy-500 leading-9">
              در ۱۲ سال گذشته با بیش از ۲۰۰ کسب‌وکار — از استارتاپ‌های نوپا تا هلدینگ‌های بزرگ —
              همکاری کرده‌ایم و میانگین ۴۵٪ رشد فروش برای مشتریان‌مان ثبت شده است.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="card p-2 overflow-hidden">
              <Image
                src="/images/about-team.jpg"
                alt="تیم مشاوران مارکت تروپی در جلسه استراتژی"
                width={800}
                height={520}
                className="rounded-xl object-cover w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ارزش‌ها */}
      <section className="section-pad bg-white" aria-labelledby="values-heading">
        <div className="container">
          <div id="values-heading">
            <SectionHeading overline="ارزش‌های ما" title="چهار چراغ راه ما" />
          </div>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {VALUES.map((v) => (
              <StaggerItem key={v.title}>
                <div className="card card-hover p-6 text-center h-full">
                  <span className="w-14 h-14 mx-auto rounded-2xl bg-teal-50 text-teal flex items-center justify-center mb-4">
                    <v.icon className="w-7 h-7" />
                  </span>
                  <h3 className="font-bold text-navy mb-2">{v.title}</h3>
                  <p className="text-navy-400 text-sm leading-7">{v.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* تیم */}
      <section className="section-pad" aria-labelledby="team-heading">
        <div className="container">
          <div id="team-heading">
            <SectionHeading
              overline="تیم ما"
              title="متخصصانی که کسب‌وکار شما را مثل خودشان دوست دارند"
            />
          </div>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {TEAM.map((member) => (
              <StaggerItem key={member.name}>
                <div className="card card-hover p-6 text-center group">
                  <span className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-teal to-navy text-white flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-105 transition-transform">
                    {member.initials}
                  </span>
                  <h3 className="font-bold text-navy">{member.name}</h3>
                  <p className="text-sm text-navy-300 mt-1">{member.role}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
