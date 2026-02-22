import YusrBusBackground from '@/app/core/components/Background/YusrBusBackground';
import Lightbox from '@/app/core/components/Images/Lightbox';
import useLightBox from '@/app/core/Hooks/useLightBox';
import { Separator } from '@/components/ui/separator';
import {
  Bus,
  Clock,
  Layers,
  LayoutDashboard,
  LayoutDashboardIcon,
  Lock,
  Map,
  Settings,
  ShieldCheck,
  Users
} from 'lucide-react';
import LandingFeatures from './LandingFeatures';
import LandingFooter from './LandingFooter';
import LandingHeader from './LandingHeader';
import LandingHero from './LandingHero';
import LandingSystemPreview from './LandingSystemPreview';
import LandingWhyUs from './LandingWhyUs';

// ─── Data ─────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Bus,
    title: 'إدارة الرحلات',
    desc: 'أنشئ رحلات جديدة، حدد مواعيد الانطلاق والوصول، وتابع حالة كل رحلة في الوقت الفعلي.',
    details: ['جدولة الرحلات المتكررة', 'تتبع الحالة لحظياً', 'ربط الرحلة بالمسار والحافلة'],
    cta: 'استعراض الرحلات',
    to: '/trips',
    screenshotDark: 'src/assets/System/YusrBus_Trips_Dark.webp',
    screenshotLight: 'src/assets/System/YusrBus_Trips_Light.webp',
    changeScreenshotDark: 'src/assets/System/YusrBus_ChangeTrip_Dark.webp',
    changeScreenshotLight: 'src/assets/System/YusrBus_ChangeTrip_Light.webp',
  },
  {
    icon: Users,
    title: 'إدارة الركاب',
    desc: 'سجل شامل لبيانات الركاب، سجل الرحلات السابقة، والتذاكر المرتبطة بكل راكب.',
    details: ['ملفات شخصية كاملة', 'سجل رحلات مفصّل', 'بحث وتصفية متقدمة'],
    cta: 'استعراض الركاب',
    to: '/passengers',
    screenshotDark: 'src/assets/System/YusrBus_Passengers_Dark.webp',
    screenshotLight: 'src/assets/System/YusrBus_Passengers_Light.webp',
    changeScreenshotDark: 'src/assets/System/YusrBus_ChangePassenger_Dark.webp',
    changeScreenshotLight: 'src/assets/System/YusrBus_ChangePassenger_Light.webp',
  },
  {
    icon: Map,
    title: 'إدارة المسارات',
    desc: 'صمّم مسارات الحافلات بين المحطات، حدد التسلسل والمسافات، وعدّل المسارات بمرونة.',
    details: ['إضافة محطات متعددة', 'ترتيب التسلسل', 'مسارات قابلة لإعادة الاستخدام'],
    cta: 'استعراض المسارات',
    to: '/routes',
    screenshotDark: 'src/assets/System/YusrBus_Routes_Dark.webp',
    screenshotLight: 'src/assets/System/YusrBus_Routes_Light.webp',
    changeScreenshotDark: 'src/assets/System/YusrBus_ChangeRoute_Dark.webp',
    changeScreenshotLight: 'src/assets/System/YusrBus_ChangeRoute_Light.webp',
  },
  {
    icon: Settings,
    title: 'إدارة الإعدادات',
    desc: 'إدارة بيانات الشركة ومعلومات الاشتراك.',
    details: ['تغيير الشعار', 'تغيير معلومات الشركة', 'متابعة معلومات الاشتراك'],
    cta: 'استعراض الإعدادات',
    to: '/settings',
    screenshotDark: 'src/assets/System/YusrBus_Setting_Dark.webp',
    screenshotLight: 'src/assets/System/YusrBus_Setting_Light.webp',
    changeScreenshotDark: 'src/assets/System/YusrBus_Setting_Dark.webp',
    changeScreenshotLight: 'src/assets/System/YusrBus_Setting_Light.webp',
  },
  {
    icon: ShieldCheck,
    title: 'إدارة المستخدمين',
    desc: 'تحكم كامل في فريق العمل — أنشئ حسابات، وزّع الأدوار، وراقب الصلاحيات.',
    details: ['أدوار وصلاحيات مرنة', 'تسجيل نشاط المستخدمين', 'إدارة كلمات المرور'],
    cta: 'استعراض المستخدمين',
    to: '/users',
    screenshotDark: 'src/assets/System/YusrBus_Users_Dark.webp',
    screenshotLight: 'src/assets/System/YusrBus_Users_Light.webp',
    changeScreenshotDark: 'src/assets/System/YusrBus_ChangeUser_Dark.webp',
    changeScreenshotLight: 'src/assets/System/YusrBus_ChangeUser_Light.webp',
  },
  {
    icon: LayoutDashboardIcon,
    title: 'لوحة المعلومات',
    desc: 'نظرة شمولية على أداء النظام — تتبع الإحصائيات الحية، ومراقبة سير الرحلات والعمليات اليومية.',
    details: [
      'إحصائيات فورية للمبيعات والرحلات',
      'رسوم بيانية لتحليل البيانات',
      'تنبيهات مباشرة للحالات الطارئة',
    ],
    cta: 'عرض الإحصائيات',
    to: '/dashboard',
    screenshotDark: 'src/assets/System/YusrBus_Dashboard_Dark.webp',
    screenshotLight: 'src/assets/System/YusrBus_Users_Light.webp',
    changeScreenshotDark: 'src/assets/System/YusrBus_Trips_Dark.webp',
    changeScreenshotLight: 'src/assets/System/YusrBus_Trips_Light.webp',
  },
];

const whyUs = [
  {
    icon: LayoutDashboard,
    title: 'واجهة بسيطة وسهلة',
    desc: 'صُممت المنصة لتكون في متناول الجميع، بدون تعقيد أو تدريب مطوّل.',
  },
  {
    icon: Layers,
    title: 'نظام متكامل في مكان واحد',
    desc: 'الرحلات، التذاكر، الركاب، المسارات، والمستخدمين — كل شيء تحت سقف واحد.',
  },
  {
    icon: Clock,
    title: 'توفير الوقت والجهد',
    desc: 'أتمتة المهام المتكررة وتقليص الأخطاء اليدوية يمنحك وقتاً للتركيز على ما يهم.',
  },
  {
    icon: Lock,
    title: 'أمان وموثوقية',
    desc: 'صلاحيات دقيقة وسجل نشاط كامل يضمن حماية بياناتك وتتبع كل تغيير.',
  },
];

const Landing = () => {
  
  const {lightbox, openLightbox, closeLightbox} = useLightBox();

  return (
    <div dir="rtl" className="relative min-h-svh text-foreground">
      
      <YusrBusBackground />

      {lightbox && (
        <Lightbox
          srcLight={lightbox.srcLight}
          srcDark={lightbox.srcDark}
          alt={lightbox.alt}
          onClose={closeLightbox}
        />
      )}

      <LandingHeader/>

      <LandingHero/>

      <Separator className="mx-auto max-w-6xl" />

      <LandingFeatures openLightbox={openLightbox} features={features}/>

      <Separator className="mx-auto max-w-6xl" />

      <LandingSystemPreview openLightbox={openLightbox} features={features}/>

      <Separator className="mx-auto max-w-6xl" />

      <LandingWhyUs whyUs={whyUs}/>

      <LandingFooter/>
    </div>
  );
};

export default Landing;