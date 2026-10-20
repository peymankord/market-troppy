import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import SectionHeading from '@/components/shared/SectionHeading';
import { Stagger, StaggerItem } from '@/components/shared/MotionFadeIn';
import ServiceIcon from '@/components/shared/ServiceIcon';

// سکشن ۶ خدمت اصلی — Stagger Animation یکی‌یکی
export default function ServicesSection() {
  return (
    <section className="section-pad" aria-labelledby="services-heading">
      <div className="container">
        <div id="services-heading">
          <SectionHeading
            overline="خدمات ما"
            title="۶ ستون رشد کسب‌وکار شما"
            description="هر خدمت، یک قطعه از پازل رشد است؛ از استراتژی و برند تا اتوماسیون هوش مصنوعی."
          />
        </div>

        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {SERVICES.map((service) => (
            <StaggerItem key={service.slug}>
              <Link
                href={`/services/${encodeURIComponent(service.slug)}`}
                className="card card-hover group block p-7 h-full"
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="w-14 h-14 rounded-2xl bg-teal-50 text-teal flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-colors duration-300">
                    <ServiceIcon name={service.icon} className="w-7 h-7" />
                  </span>
                  <span className="w-9 h-9 rounded-full border border-navy-100 flex items-center justify-center text-navy-300 group-hover:bg-teal group-hover:border-teal group-hover:text-white transition-all duration-300 group-hover:-rotate-45">
                    <ArrowLeft className="w-4 h-4" />
                  </span>
                </div>
                <h3 className="text-lg font-bold text-navy mb-3 group-hover:text-teal transition-colors">
                  {service.title}
                </h3>
                <p className="text-navy-400 text-sm leading-7">{service.summary}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
